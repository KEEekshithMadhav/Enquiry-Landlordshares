import Link from 'next/link';

export default function PrivacyPage() {
  return <main className="privacy-page">
    <Link href="/property-enquiry">← Back to LandlordShares</Link>
    <h1>Privacy Notice</h1>
    <p><strong>Draft notice — review with your company/legal adviser before publishing.</strong></p>
    <p>LandlordShares collects the information you submit through this property enquiry page to respond to your request and provide details about the property you selected.</p>
    <h2>Information we collect</h2>
    <p>Depending on the fields you complete, this may include your name, phone number, email address, selected property, budget range, buying purpose, message, enquiry timestamp and limited campaign attribution information such as the page or campaign that brought you here.</p>
    <h2>How we use your information</h2>
    <p>We use the submitted details to respond to your enquiry, route it to the relevant property team, maintain enquiry records and understand which property pages generate enquiries. Submitted lead details may be sent to our customer relationship management provider, Wylto CRM, for these purposes.</p>
    <h2>Sharing and retention</h2>
    <p>Access should be limited to staff and service providers who need the information to handle your enquiry. The company should establish a retention period and delete or anonymise information when it is no longer needed, subject to applicable legal requirements.</p>
    <h2>Your choices</h2>
    <p>Submitting the form is voluntary. Do not submit sensitive personal or financial information. For questions, access requests, correction or deletion requests, contact the company using its officially approved contact details.</p>
    <h2>Contact and updates</h2>
    <p>Before launch, add the correct legal entity name, privacy contact email or phone, applicable retention policy, and any additional notices required under applicable law. Update this notice if the data use or service providers change.</p>
  </main>;
}
