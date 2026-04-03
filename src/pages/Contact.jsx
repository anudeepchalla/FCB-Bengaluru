import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';
import { CONTACT_INFO, SOCIAL_LINKS } from '../data/siteData';
import './Contact.css';

export default function Contact() {
  const { showToast } = useApp();
  const [form, setForm] = useState({
    name: '', email: '', type: '', subject: '', message: ''
  });

  const handleChange = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      showToast('⚠️', 'Please fill in Name, Email and Message.');
      return;
    }
    showToast('✅', 'Message sent! We\'ll be in touch within 24–48 hours.');
    setForm({ name: '', email: '', type: '', subject: '', message: '' });
  };

  return (
    <div className="page-contact">
      <div className="page-header contact-header">
        <p className="section-label">Get in Touch</p>
        <h2 className="section-title">
          Contact <span className="accent">Us</span>
        </h2>
        <div className="divider" />
        <p className="header-sub">
          For partnerships, sponsorships, press, or anything else — we'd love to hear from you.
        </p>
      </div>

      <div className="contact-layout">
        {/* Left — Info */}
        <div className="contact-info">
          <h3>Reach Us Directly</h3>
          <p>We're a passionate crew running this on love for the club. Bear with us — we respond to every message.</p>

          <div className="contact-cards">
            {CONTACT_INFO.map((c, i) => (
              <div className="contact-card" key={i}>
                <div className={`contact-icon ${c.color}`}>{c.icon}</div>
                <div>
                  <div className="contact-card-title">{c.label}</div>
                  <div className="contact-card-value">
                    {c.href ? (
                      <a href={c.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {c.value}
                      </a>
                    ) : c.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3>Follow Us</h3>
          <p style={{ marginBottom: '1rem' }}>
            Stay updated on match days, events, and club news across all our social channels.
          </p>
          <div className="social-links">
            {SOCIAL_LINKS.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-btn">
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="contact-form-card">
          <div className="contact-form-title">Send a Message</div>
          <div className="contact-form-sub">
            We typically respond within 24–48 hours on business days.
          </div>

          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" placeholder="Suresh Raina" value={form.name} onChange={handleChange('name')} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange('email')} />
          </div>
          <div className="form-group">
            <label className="form-label">Query Type</label>
            <select className="form-select" value={form.type} onChange={handleChange('type')}>
              <option value="">Select a category</option>
              <option>Commercial Partnership</option>
              <option>Sponsorship Enquiry</option>
              <option>Media &amp; Press</option>
              <option>Venue Collaboration</option>
              <option>Membership Question</option>
              <option>Event Registration</option>
              <option>Merchandise</option>
              <option>General Query</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input className="form-input" placeholder="Brief subject line" value={form.subject} onChange={handleChange('subject')} />
          </div>
          <div className="form-group">
            <label className="form-label">Your Message</label>
            <textarea
              className="form-textarea"
              placeholder="Tell us more about your query or proposal..."
              value={form.message}
              onChange={handleChange('message')}
            />
          </div>
          <button className="btn-submit" onClick={handleSubmit}>Send Message →</button>
          <div className="payment-note" style={{ marginTop: '0.75rem' }}>
            <span>🔒</span> We never share your information with third parties.
          </div>
        </div>
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
