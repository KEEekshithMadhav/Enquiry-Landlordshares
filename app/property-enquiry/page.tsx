import { CheckCircle2, ShieldCheck, Sparkles, MessageCircle, Building2 } from 'lucide-react';
import EnquiryForm from './EnquiryForm';
import SiteHeader from './SiteHeader';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function PropertyEnquiryPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedId = typeof params.property === 'string' ? params.property : '';
  const sourceParam = typeof params.utm_source === 'string' ? params.utm_source : '';
  const campaign = typeof params.utm_campaign === 'string' ? params.utm_campaign : '';
  const content = typeof params.utm_content === 'string' ? params.utm_content : '';
  const initialSource = sourceParam.toLowerCase() === 'instagram' || !sourceParam ? 'Instagram Organic' : 'Website';

  return (
    <main className="enquiry-page">
      <SiteHeader />

      <section className="lead-hero">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="lead-layout">
          <div className="lead-intro">
            <span className="eyebrow"><span className="eyebrow-dot" /> LANDLORDSHARES · PROPERTY ENQUIRIES</span>
            <h1>Let’s find the right <em>Landlord</em> property <em>for you.</em></h1>
            <p className="intro-copy">Looking for your next home or investment in Hyderabad? Share a few details and our property team will help you explore suitable options.</p>

            <div className="intro-points">
              <div className="intro-point"><span className="point-icon"><Building2 size={18} /></span><span><strong>Property options that fit</strong><small>Tell us your preferences and budget.</small></span></div>
              <div className="intro-point"><span className="point-icon"><MessageCircle size={18} /></span><span><strong>Personal Assistance</strong><small>Our team can contact you about your enquiry.</small></span></div>
              <div className="intro-point"><span className="point-icon"><ShieldCheck size={18} /></span><span><strong>Your details stay purposeful</strong><small>Used to respond to your property enquiry.</small></span></div>
            </div>

            <div className="brand-note"><Sparkles size={16} /><span>Thoughtful property guidance, from first enquiry to next steps.</span></div>
          </div>

          <div className="form-card" id="enquiry-form">
            <div className="form-card-head">
              <div className="form-icon"><Building2 size={20} /></div>
              <div><span className="form-kicker">START YOUR ENQUIRY</span><h2>Tell us what you’re looking for</h2><p>Complete the form and our team will get in touch.</p></div>
            </div>
            <div className="form-progress"><span /><span /><span /></div>
            <EnquiryForm selectedPropertyId={selectedId} source={initialSource} campaign={campaign} content={content} />
            <div className="form-secure"><ShieldCheck size={15} /><span>Your information is handled in line with our <a href="/privacy" target="_blank" rel="noreferrer">Privacy Notice</a>.</span></div>
          </div>
        </div>
      </section>

      <section className="reassurance-strip">
        <div><CheckCircle2 size={18} /><span><strong>Simple and straightforward</strong><small>Just a few details to get started</small></span></div>
        <div><CheckCircle2 size={18} /><span><strong>Property-focused support</strong><small>Share your needs with our team</small></span></div>
        <div><CheckCircle2 size={18} /><span><strong>Hyderabad opportunities</strong><small>Explore residential and investment options</small></span></div>
      </section>

      <footer className="site-footer">
        <a className="footer-logo" href="https://landlordshares.com/" aria-label="LandlordShares main website"><img src="/images/logo.png" alt="LandlordShares" /></a>
        <span>© {new Date().getFullYear()} LandlordShares. All rights reserved.</span>
        <nav><a href="https://landlordshares.com/" target="_blank" rel="noreferrer">Main website</a><a href="/privacy">Privacy notice</a></nav>
      </footer>
    </main>
  );
}
