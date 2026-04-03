import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';
import { MEMBERSHIP_TIERS } from '../data/siteData';
import './Membership.css';

function TierCard({ tier }) {
  const { openPaymentModal } = useApp();
  return (
    <div className={`tier-card${tier.featured ? ' featured' : ''}`}>
      {tier.popular && <div className="tier-popular">⭐ Most Popular</div>}
      <div className="tier-header">
        <div className="tier-icon">{tier.icon}</div>
        <div className="tier-name">{tier.name}</div>
        <div className="tier-tagline">{tier.tagline}</div>
        <div className="tier-price-block">
          <span className="tier-currency">₹</span>
          <span className="tier-price">{tier.price}</span>
        </div>
        <div className="tier-period">{tier.period}</div>
        <div className="tier-divider" />
      </div>

      <div className="tier-features">
        {tier.features.map((f, i) => (
          <div key={i} className={`tier-feature${f.subheading ? ' tier-subheading' : ''}`}>
            {!f.subheading && (
              <span className={f.check ? 'check' : 'cross'}>{f.check ? '✓' : '✗'}</span>
            )}
            <span dangerouslySetInnerHTML={{ __html: f.text }} />
          </div>
        ))}
      </div>

      <button
        className={`btn-tier ${tier.btnClass}`}
        onClick={() => openPaymentModal(`${tier.name} Membership`, `₹${tier.price}/yr`)}
      >
        {tier.btnText}
      </button>
    </div>
  );
}

export default function Membership() {
  return (
    <div className="page-membership">
      <div className="page-header membership-header">
        <p className="section-label">Join the Family</p>
        <h2 className="section-title">
          Choose Your <span className="accent">Membership</span>
        </h2>
        <div className="divider" />
        <p className="header-sub">
          From casual fan to die-hard Culer — we have a membership for every shade of Blaugrana.
        </p>
      </div>

      <div className="tiers-grid">
        {MEMBERSHIP_TIERS.map(tier => (
          <TierCard key={tier.id} tier={tier} />
        ))}
      </div>

      <Footer copy={
        <>
          © 2025 FCB Bengaluru. Unofficial fan club. Not affiliated with FC Barcelona.<br />
          FC Barcelona® is a registered trademark of Futbol Club Barcelona.
        </>
      } />
    </div>
  );
}
