import { NextRequest, NextResponse } from 'next/server';
import { getProperty } from '@/lib/properties';

export const runtime = 'nodejs';

const phonePattern = /^[+0-9()\s-]{10,16}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedBudgets = new Set([
  '',
  'Below ₹1 Cr',
  '₹1 Cr – ₹2.5 Cr',
  '₹1 Cr - ₹2.5 Cr',
  '₹3 Cr – ₹5 Cr',
  '₹3 Cr - ₹5 Cr',
  'Above ₹5 Cr',
  'Below 1CR',
  '1CR-2.5CR',
  '1CR - 2.5CR',
  '3-5CR',
  '3 - 5CR',
  'ABOVE 5CR',
  'Not decided',
  'Below ₹50 lakh',
  '₹50–75 lakh',
  '₹75 lakh–₹1 crore',
  'Above ₹1 crore',
]);
const allowedPurposes = new Set(['', 'Buying for self', 'Investment', 'NRI property purchase', 'Other']);

export async function POST(request: NextRequest) {
  try {
    // Basic same-origin browser check. This is not a replacement for rate limiting/WAF.
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host && new URL(origin).host !== host) {
      return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
    }

    const body = await request.json();
    if (typeof body.website === 'string' && body.website.trim()) {
      // Quietly accept honeypot submissions without forwarding spam.
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phoneNumber = typeof body.phoneNumber === 'string' ? body.phoneNumber.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const propertyId = typeof body.propertyId === 'string' ? body.propertyId : '';
    const property = getProperty(propertyId);
    const generalEnquiry = !propertyId || propertyId === 'general-enquiry';
    const consent = body.consent === true;

    if (name.length < 2 || name.length > 80) return NextResponse.json({ error: 'Enter a name between 2 and 80 characters.' }, { status: 400 });
    if (!phonePattern.test(phoneNumber) || phoneNumber.replace(/\D/g, '').length < 10) return NextResponse.json({ error: 'Enter a valid phone number, including country code if applicable.' }, { status: 400 });
    if (email && (email.length > 120 || !emailPattern.test(email))) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    if (!property && !generalEnquiry) return NextResponse.json({ error: 'Select a valid property.' }, { status: 400 });
    if (!consent) return NextResponse.json({ error: 'Please provide consent before submitting.' }, { status: 400 });
    if (!allowedBudgets.has(typeof body.budget === 'string' ? body.budget : '')) return NextResponse.json({ error: 'Select a valid budget range.' }, { status: 400 });
    if (!allowedPurposes.has(typeof body.purpose === 'string' ? body.purpose : '')) return NextResponse.json({ error: 'Select a valid enquiry purpose.' }, { status: 400 });

    const webhookUrl = process.env.WYLTO_WEBHOOK_URL || 'https://server.wylto.com/webhook/HzBauo0nx775KCYKnR';
    const sheetWebhookUrl = process.env.GOOGLE_SHEET_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    const parsedWebhook = new URL(webhookUrl);
    if (parsedWebhook.protocol !== 'https:' || parsedWebhook.hostname !== 'server.wylto.com') {
      console.error('WYLTO_WEBHOOK_URL must use HTTPS and the approved Wylto host.');
      return NextResponse.json({ error: 'Enquiries are temporarily unavailable. Please try again later.' }, { status: 503 });
    }

    const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';
    const lead = {
      timestamp: new Date().toISOString(),
      name,
      phoneNumber,
      email,
      city: property?.location || clean(body.city, 100),
      propertyId: property?.id || '',
      propertyName: property?.name || 'General enquiry / help me choose',
      propertyType: property?.type || '',
      budget: clean(body.budget, 60),
      purpose: clean(body.purpose, 60),
      message: clean(body.message, 1000),
      source: clean(body.utmSource, 80).toLowerCase() === 'instagram' ? 'Instagram Organic' : 'Website / Direct',
      utmSource: clean(body.utmSource, 80),
      utmMedium: clean(body.utmMedium, 80) || 'organic_social',
      utmCampaign: clean(body.utmCampaign, 120),
      utmContent: clean(body.utmContent, 120),
      landingPage: clean(body.landingPage, 200) || '/property-enquiry',
      referrer: clean(body.referrer, 500),
      consent: true,
      consentTimestamp: new Date().toISOString(),
    };

    // Forward to Wylto CRM
    const wyltoPromise = fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(lead),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });

    // Forward to Google Sheet Webhook if configured
    const sheetPromise = sheetWebhookUrl
      ? fetch(sheetWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
          cache: 'no-store',
          redirect: 'follow',
          signal: AbortSignal.timeout(10000),
        }).catch((err) => {
          console.error('Google Sheets webhook error:', err instanceof Error ? err.message : err);
          return null;
        })
      : null;

    const [wyltoResult, sheetResult] = await Promise.all([
      wyltoPromise.catch((err) => {
        console.error('Wylto webhook network error:', err instanceof Error ? err.message : err);
        return null;
      }),
      sheetPromise,
    ]);

    const wyltoOk = wyltoResult?.ok;
    const sheetOk = sheetResult?.ok;

    if (!wyltoOk && !sheetOk) {
      console.error(`Both destinations failed. Wylto: ${wyltoResult?.status}, Sheets: ${sheetResult?.status}`);
      return NextResponse.json({ error: 'We could not deliver your enquiry right now. Please try again shortly.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Enquiry submission failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Unable to submit your enquiry. Please try again.' }, { status: 500 });
  }
}
