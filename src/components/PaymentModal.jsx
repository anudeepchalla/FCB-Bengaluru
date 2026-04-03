import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './PaymentModal.css';

export default function PaymentModal() {
  const { paymentModal, closePaymentModal, showToast } = useApp();
  const { open, itemName, price } = paymentModal;

  const [form, setForm] = useState({ name: '', email: '', phone: '', cardNum: '', expiry: '', cvv: '' });
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handlePay = () => {
    const { name, email, phone, cardNum, expiry, cvv } = form;
    if (!name || !email || !phone || !cardNum || !expiry || !cvv) {
      showToast('⚠️', 'Please fill in all fields.'); return;
    }
    setSuccess(true);
    setTimeout(() => {
      closePaymentModal();
      setSuccess(false);
      setForm({ name: '', email: '', phone: '', cardNum: '', expiry: '', cvv: '' });
      showToast('✅', `Booking confirmed for "${itemName}"!`);
    }, 2500);
  };

  return (
    <div className="modal-overlay open" onClick={closePaymentModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closePaymentModal}>✕</button>

        {!success ? (
          <>
            <div className="modal-title">Complete Booking</div>
            <div className="modal-subtitle">Secure checkout — FCB Bengaluru</div>

            <div className="modal-item-info">
              <span className="modal-item-name">{itemName}</span>
              <span className="modal-item-price">{price}</span>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Your full name" value={form.name} onChange={handleChange('name')} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange('email')} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange('phone')} />
            </div>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input className="form-input" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNum} onChange={handleChange('cardNum')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry</label>
                <input className="form-input" placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={handleChange('expiry')} />
              </div>
              <div className="form-group">
                <label className="form-label">CVV</label>
                <input className="form-input" placeholder="•••" maxLength={3} type="password" value={form.cvv} onChange={handleChange('cvv')} />
              </div>
            </div>

            <button className="btn-pay" onClick={handlePay}>
              Pay {price} →
            </button>
            <div className="payment-note">
              <span>🔒</span> Secured by 256-bit SSL encryption
            </div>
          </>
        ) : (
          <div className="success-screen show">
            <div className="success-icon">✓</div>
            <div className="success-title">Booking Confirmed!</div>
            <div className="success-text">
              You're all set for <strong>{itemName}</strong>.<br />
              A confirmation has been sent to {form.email || 'your email'}.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
