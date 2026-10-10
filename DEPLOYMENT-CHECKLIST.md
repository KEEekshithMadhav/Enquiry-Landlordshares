# Launch checklist — LandlordShares Instagram enquiry page

- [ ] Confirm the official LandlordShares logo and approved branding.
- [ ] Confirm the property options shown in the enquiry dropdown are current; this page does not duplicate the main property catalogue.
- [ ] Confirm the Wylto webhook URL and accepted payload schema for the correct CRM pipeline.
- [ ] Configure `WYLTO_WEBHOOK_URL` as a server-side Vercel environment variable (never expose it in client code).
- [ ] Review the privacy notice with the company and add the correct legal entity and privacy contact details.
- [ ] Add production rate limiting / WAF protection to `/api/enquiry`.
- [ ] Test valid and invalid submissions in a Preview deployment.
- [ ] Submit a test for a specific property and a general enquiry; verify both appear in the correct Wylto CRM pipeline.
- [ ] Confirm property name/ID, Instagram source, campaign parameters, consent and timestamp are mapped correctly.
- [ ] Test mobile layout, accessibility, consent and error states.
- [ ] Add `enquiry.landlordshares.com` to Vercel and configure only the DNS record Vercel instructs; do not change root-domain records.
- [ ] Publish the Instagram auto-reply link only after the CRM test succeeds.
