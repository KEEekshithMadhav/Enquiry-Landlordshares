# LandlordShares Instagram Enquiry Page

A focused, mobile-first lead capture page for visitors who receive the enquiry link from the LandlordShares Instagram account. This is **not a second property catalogue**: it uses LandlordShares branding and offers a compact property-interest selector in the form.

## Features

- Light, modern layout with the LandlordShares logo and green brand accents.
- One simple enquiry form: name, phone, optional email, property interest, budget, purpose, optional notes and privacy consent.
- Property interest can be selected from the current configured options or left as a general enquiry / help me choose.
- Instagram source and UTM campaign/content attribution.
- Server-side validation, honeypot spam field and secure server-to-server Wylto webhook forwarding.
- Privacy notice page and deployment checklist.

## Local setup

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Set `WYLTO_WEBHOOK_URL` to the **confirmed** Wylto webhook for the correct LandlordShares CRM pipeline.
4. Run `npm install`, then `npm run dev`.
5. Open `http://localhost:3000/property-enquiry`.
6. Submit test leads and verify the fields and source in Wylto before launch.

## Instagram link examples

Bio:
`https://enquiry.landlordshares.com/property-enquiry?utm_source=instagram&utm_medium=organic_social&utm_campaign=profile_bio`

General enquiry from a specific Reel/campaign:
`https://enquiry.landlordshares.com/property-enquiry?utm_source=instagram&utm_medium=organic_social&utm_campaign=property_enquiry&utm_content=october_reel`

If the Instagram automation is replying with the same link to all interested users, use the bio/general enquiry link. The visitor can select a property in the form or choose “General enquiry / help me choose.”

## Subdomain deployment

1. Push this project to a private or approved Git repository and import it into Vercel.
2. Add `enquiry.landlordshares.com` under Vercel Project Settings → Domains.
3. In the DNS provider managing `landlordshares.com`, add the exact DNS record Vercel displays. Do not change root-domain records.
4. Add `WYLTO_WEBHOOK_URL` as a server-side Vercel environment variable (never prefix it with `NEXT_PUBLIC_`) and redeploy.
5. Confirm the privacy notice with the company, add production rate limiting/WAF protection, test on mobile and verify a lead appears in the correct CRM pipeline before sharing the URL.

## CRM field mapping

The API sends `name`, `phoneNumber`, `email`, `city`, `propertyId`, `propertyName`, `propertyType`, `budget`, `purpose`, `message`, `source`, `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `landingPage`, `referrer`, `consent` and `consentTimestamp`. Confirm the accepted fields for the configured Wylto webhook. A successful HTTP status alone does not prove the CRM record was created; verify it in Wylto.
