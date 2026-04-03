import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Admin.css';

// ─── Admin Event Form ───
function AdminEventForm({ onClose, onPublish }) {
  const EVENT_TYPES = ['🎬 Live Screening', '⭐ Special Event', '🤝 Meetup', '⚽ Tournament', '🎉 Other'];
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [form, setForm] = useState({
    title: '', date: '', time: '', venue: '', capacity: '',
    price: '', priceLabel: '', cta: '', desc: ''
  });

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));

  const handlePublish = () => {
    if (!form.title || !form.date || !form.time || !form.venue || !form.price || !form.desc) {
      return alert('Please fill in all required fields.');
    }
    const d = new Date(`${form.date}T${form.time}`);
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dateStr = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    let h = d.getHours(), m = d.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const timeStr = `${h}:${m < 10 ? '0'+m : m} ${ampm} IST`;
    const typeClassMap = { '🎬 Live Screening': 'type-screening', '⭐ Special Event': 'type-special', '🤝 Meetup': 'type-meetup', '⚽ Tournament': 'type-meetup', '🎉 Other': 'type-screening' };
    const bannerMap    = { '🎬 Live Screening': '', '⭐ Special Event': 'gold', '🤝 Meetup': 'red', '⚽ Tournament': 'red', '🎉 Other': '' };

    onPublish({
      id: Date.now(),
      type: eventType,
      typeClass: typeClassMap[eventType] || 'type-screening',
      bannerClass: bannerMap[eventType] || '',
      title: form.title,
      dateStr: `${dateStr} · ${timeStr}`,
      venue: form.venue,
      capacity: form.capacity,
      price: form.price,
      priceLabel: form.priceLabel || 'per person',
      cta: form.cta || 'Book Seat',
      desc: form.desc,
    });
    onClose();
  };

  return (
    <div className="admin-form-overlay" onClick={onClose}>
      <div className="admin-form-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="admin-form-title">Add New Event</div>
        <div className="admin-form-sub">Fill in the details — the event will appear on the Events page.</div>

        <div className="admin-form-grid">
          <div className="form-group full">
            <label className="form-label">Event Type</label>
            <div className="event-type-select">
              {EVENT_TYPES.map(t => (
                <button
                  key={t}
                  className={`event-type-pill${eventType === t ? ' selected' : ''}`}
                  onClick={() => setEventType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group full">
            <label className="form-label">Event Title *</label>
            <input className="form-input" placeholder="e.g. El Clásico Watch Party" value={form.title} onChange={set('title')} />
          </div>
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input type="date" className="form-input" value={form.date} onChange={set('date')} />
          </div>
          <div className="form-group">
            <label className="form-label">Time (IST) *</label>
            <input type="time" className="form-input" value={form.time} onChange={set('time')} />
          </div>
          <div className="form-group full">
            <label className="form-label">Venue / Location *</label>
            <input className="form-input" placeholder="e.g. The Pint Room, Indiranagar" value={form.venue} onChange={set('venue')} />
          </div>
          <div className="form-group">
            <label className="form-label">Capacity</label>
            <input className="form-input" placeholder="e.g. 150 seats" value={form.capacity} onChange={set('capacity')} />
          </div>
          <div className="form-group">
            <label className="form-label">Ticket Price *</label>
            <input className="form-input" placeholder="e.g. ₹499 or FREE" value={form.price} onChange={set('price')} />
          </div>
          <div className="form-group">
            <label className="form-label">Price Label</label>
            <input className="form-input" placeholder="e.g. per person, per couple" value={form.priceLabel} onChange={set('priceLabel')} />
          </div>
          <div className="form-group">
            <label className="form-label">CTA Button Text</label>
            <input className="form-input" placeholder="Book Seat / RSVP Now / Register" value={form.cta} onChange={set('cta')} />
          </div>
          <div className="form-group full">
            <label className="form-label">Event Description *</label>
            <textarea className="form-textarea" placeholder="Describe the event..." value={form.desc} onChange={set('desc')} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="btn-submit" style={{ flex: 1 }} onClick={handlePublish}>Publish Event →</button>
          <button className="btn-logout" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Merch Form ───
function AdminMerchForm({ onClose, onPublish }) {
  const [form, setForm] = useState({ name: '', cat: '', price: '', badge: '', stock: 'In stock', desc: '' });
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => new Promise(res => {
      const r = new FileReader();
      r.onload = ev => res(ev.target.result);
      r.readAsDataURL(file);
    }));
    Promise.all(readers).then(results => {
      setPhotos(results);
      setPreviews(results);
    });
  };

  const handlePublish = () => {
    if (!form.name || !form.cat || !form.price || !form.desc) {
      return alert('Please fill in all required fields.');
    }
    onPublish({
      id: Date.now(),
      name: form.name,
      category: form.cat,
      price: form.price,
      badge: form.badge,
      stock: form.stock,
      desc: form.desc,
      tagline: '',
      photos,
    });
    onClose();
  };

  return (
    <div className="admin-form-overlay" onClick={onClose}>
      <div className="admin-form-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="admin-form-title">Add New Merchandise</div>
        <div className="admin-form-sub">Fill in the product details — it will appear on the Merchandise page.</div>

        <div className="admin-form-grid">
          <div className="form-group full">
            <label className="form-label">Product Name *</label>
            <input className="form-input" placeholder="e.g. FCB Bengaluru Jersey" value={form.name} onChange={set('name')} />
          </div>
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select className="form-select" value={form.cat} onChange={set('cat')}>
              <option value="">Select category</option>
              {['Apparel','Accessories','Bags','Lifestyle','Stationery','Art & Décor','Bundle','Other'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Price (₹) *</label>
            <input type="number" className="form-input" placeholder="e.g. 799" value={form.price} onChange={set('price')} />
          </div>
          <div className="form-group">
            <label className="form-label">Badge Label</label>
            <input className="form-input" placeholder="e.g. New, Limited, Bestseller" value={form.badge} onChange={set('badge')} />
          </div>
          <div className="form-group">
            <label className="form-label">Stock Status</label>
            <select className="form-select" value={form.stock} onChange={set('stock')}>
              {['In stock','Limited stock','Pre-order','Out of stock'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group full">
            <label className="form-label">Description *</label>
            <textarea className="form-textarea" placeholder="Describe the product..." value={form.desc} onChange={set('desc')} />
          </div>
          <div className="form-group full">
            <label className="form-label">Product Photos</label>
            <div className="photo-upload-area" onClick={() => document.getElementById('merch-photos-input').click()}>
              <input type="file" id="merch-photos-input" accept="image/*" multiple onChange={handlePhotos} style={{ display: 'none' }} />
              <div className="upload-icon">📷</div>
              <div className="upload-text">Click to upload photos (JPG, PNG · multiple allowed)</div>
            </div>
            {previews.length > 0 && (
              <div className="photo-preview">
                {previews.map((p, i) => <img key={i} src={p} alt={`preview ${i}`} />)}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="btn-submit" style={{ flex: 1 }} onClick={handlePublish}>Publish Item →</button>
          <button className="btn-logout" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ───
export default function Admin() {
  const { setIsAdminLoggedIn, showPage, showToast, adminEvents, setAdminEvents, adminMerchItems, setAdminMerchItems } = useApp();
  const [activeTab, setActiveTab] = useState('events');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showMerchForm, setShowMerchForm] = useState(false);

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    showPage('home');
    showToast('👋', 'Logged out successfully.');
  };

  const publishEvent = (ev) => {
    setAdminEvents(prev => [...prev, ev]);
    showToast('✅', `Event "${ev.title}" published!`);
  };

  const deleteEvent = (id) => {
    setAdminEvents(prev => prev.filter(e => e.id !== id));
    showToast('🗑', 'Event removed.');
  };

  const publishMerch = (item) => {
    setAdminMerchItems(prev => [...prev, item]);
    showToast('✅', `"${item.name}" listed on merchandise page!`);
  };

  const deleteMerch = (id) => {
    setAdminMerchItems(prev => prev.filter(m => m.id !== id));
    showToast('🗑', 'Item removed.');
  };

  return (
    <div className="page-admin">
      <div className="admin-dash">
        <div className="admin-topbar">
          <div>
            <div className="admin-topbar-title">⚙️ Admin Dashboard</div>
            <div className="admin-topbar-sub">FCB Bengaluru · Manage Events &amp; Merchandise</div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>← Log Out</button>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab${activeTab === 'events' ? ' active' : ''}`} onClick={() => setActiveTab('events')}>🎬 Events</button>
          <button className={`admin-tab${activeTab === 'merch'  ? ' active' : ''}`} onClick={() => setActiveTab('merch')}>🛍️ Merchandise</button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="admin-tab-content active">
            <div className="admin-section-header">
              <div>
                <div className="admin-section-title">Manage Events</div>
                <div className="admin-section-sub">Add, view or remove events. Published events appear on the Events page.</div>
              </div>
              <button className="btn-add-new" onClick={() => setShowEventForm(true)}>+ Add New Event</button>
            </div>
            <div className="admin-items-grid">
              {adminEvents.length === 0 ? (
                <div className="admin-empty">
                  <span className="admin-empty-icon">📅</span>
                  No events added yet.<br />Click "Add New Event" to get started.
                </div>
              ) : adminEvents.map(ev => (
                <div className="admin-item-card" key={ev.id}>
                  <div className="admin-item-img"><span>{ev.type.split(' ')[0]}</span></div>
                  <div className="admin-item-body">
                    <div className="admin-item-title">{ev.title}</div>
                    <div className="admin-item-meta">{ev.dateStr}<br />{ev.venue}</div>
                    <div className="admin-item-meta" style={{ color: 'rgba(237,187,0,0.7)', marginTop: '4px' }}>{ev.price} · {ev.priceLabel}</div>
                    <div className="admin-item-actions">
                      <button className="btn-admin-delete" onClick={() => deleteEvent(ev.id)}>🗑 Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merch Tab */}
        {activeTab === 'merch' && (
          <div className="admin-tab-content active">
            <div className="admin-section-header">
              <div>
                <div className="admin-section-title">Manage Merchandise</div>
                <div className="admin-section-sub">Add, view or remove products. Published items appear on the Merchandise page.</div>
              </div>
              <button className="btn-add-new" onClick={() => setShowMerchForm(true)}>+ Add New Item</button>
            </div>
            <div className="admin-items-grid">
              {adminMerchItems.length === 0 ? (
                <div className="admin-empty">
                  <span className="admin-empty-icon">🛍️</span>
                  No items added yet.<br />Click "Add New Item" to get started.
                </div>
              ) : adminMerchItems.map(item => (
                <div className="admin-item-card" key={item.id}>
                  <div className="admin-item-img">
                    {item.photos.length > 0
                      ? <img src={item.photos[0]} alt={item.name} />
                      : <span>🛍️</span>}
                  </div>
                  <div className="admin-item-body">
                    <div className="admin-item-title">{item.name}</div>
                    <div className="admin-item-meta">{item.category}{item.badge ? ` · ${item.badge}` : ''}<br />₹{item.price} · {item.stock}</div>
                    <div className="admin-item-actions">
                      <button className="btn-admin-delete" onClick={() => deleteMerch(item.id)}>🗑 Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showEventForm && (
        <AdminEventForm onClose={() => setShowEventForm(false)} onPublish={publishEvent} />
      )}
      {showMerchForm && (
        <AdminMerchForm onClose={() => setShowMerchForm(false)} onPublish={publishMerch} />
      )}
    </div>
  );
}
