'use client';

import { FormEvent, useEffect, useState } from 'react';

type Props = { selectedPropertyId: string; source: string; campaign: string; content: string };

export default function EnquiryForm({ selectedPropertyId, source, campaign, content }: Props) {
  const [propertyId, setPropertyId] = useState(selectedPropertyId);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => { if (selectedPropertyId) setPropertyId(selectedPropertyId); }, [selectedPropertyId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending'); setMessage('');
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      phoneNumber: String(data.get('phoneNumber') || '').trim(),
      email: String(data.get('email') || '').trim(),
      propertyId,
      budget: String(data.get('budget') || ''),
      purpose: String(data.get('purpose') || ''),
      message: String(data.get('message') || '').trim(),
      consent: data.get('consent') === 'on',
      source,
      utmSource: source === 'Instagram Organic' ? 'instagram' : '',
      utmMedium: 'organic_social',
      utmCampaign: campaign,
      utmContent: content,
      landingPage: window.location.pathname,
      pageUrl: window.location.href,
      referrer: document.referrer || '',
      website: String(data.get('website') || ''), // honeypot; should remain empty
    };
    try {
      const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not submit your enquiry. Please try again.');
      setStatus('success'); setMessage('Thank you. Your enquiry has been submitted successfully.'); form.reset(); setPropertyId('');
    } catch (error) {
      setStatus('error'); setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') return <div className="success-panel" role="status"><span className="success-check">✓</span><h4>Thank you for your enquiry.</h4><p>{message}</p><button className="button button-dark" onClick={() => { setStatus('idle'); setMessage(''); }}>Submit another enquiry</button></div>;

  return <form className="enquiry-form" onSubmit={handleSubmit}>
    <div className="field-row"><label>Full name *<input name="name" autoComplete="name" minLength={2} maxLength={80} required placeholder="Enter your full name" /></label></div>
    <div className="field-row"><label>Phone number *<input name="phoneNumber" type="tel" autoComplete="tel" inputMode="tel" minLength={10} maxLength={16} required pattern="[+0-9() -]{10,16}" placeholder="e.g. +91 98765 43210" /><small>Include your country code if outside India.</small></label></div>
    <div className="field-row"><label>Email address <span className="optional">Optional</span><input name="email" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" /></label></div>
    <div className="field-row field-grid"><label>Budget range<select name="budget" defaultValue=""><option value="">Choose Your Budget</option><option>Below ₹1 Cr</option><option>₹1 Cr – ₹2.5 Cr</option><option>₹3 Cr – ₹5 Cr</option><option>Above ₹5 Cr</option><option>Not decided</option></select></label><label>Purpose<select name="purpose" defaultValue=""><option value="">Choose purpose</option><option>Buying for self</option><option>Investment</option><option>NRI property purchase</option><option>Other</option></select></label></div>
    <div className="field-row"><label>Additional details <span className="optional">Optional</span><textarea name="message" maxLength={1000} rows={3} placeholder="Please tell us if you have any specific requirements?" /></label></div>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="consent-row"><input name="consent" type="checkbox" required /><span>I agree that LandlordShares may use my information to respond to this enquiry. I have read the <a href="/privacy" target="_blank" rel="noreferrer">Privacy Notice</a>. *</span></label>
    {message && <p className="form-message error-message" role="alert">{message}</p>}
    <button className="button button-dark submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting…' : 'Submit enquiry'} <span aria-hidden="true">→</span></button>
    <p className="form-footnote">By submitting, you request personal assistance from our team. Please do not include sensitive personal or financial information.</p>
  </form>;
}
