import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'events', label: 'Events' },
  { id: 'merch', label: 'Merchandise' },
  { id: 'membership', label: 'Membership' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { currentPage, showPage, isAdminLoggedIn } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleNav = (page) => {
    showPage(page);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => handleNav('home')}>
          <div className="nav-crest">
            <img src="/images/logo.jpg" alt="FCB Bengaluru Crest" />
          </div>
          <span className="nav-title">FCB Bengaluru</span>
        </div>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a
                href="#!"
                className={currentPage === item.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNav(item.id); }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            {isAdminLoggedIn ? (
              <a href="#!" className="admin-nav-btn" onClick={(e) => { e.preventDefault(); handleNav('admin'); }}>
                ⚙️ Dashboard
              </a>
            ) : (
              <a href="#!" className="admin-nav-btn" onClick={(e) => { e.preventDefault(); setShowAdminLogin(true); setMenuOpen(false); }}>
                🔒 Admin
              </a>
            )}
          </li>
        </ul>

        <div
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </div>
      </nav>

      {showAdminLogin && (
        <AdminLoginOverlay onClose={() => setShowAdminLogin(false)} />
      )}
    </>
  );
}

function AdminLoginOverlay({ onClose }) {
  const { setIsAdminLoggedIn, showPage, showToast } = useApp();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const doLogin = () => {
    if (user === 'admin' && pass === 'fcbbengaluru2025') {
      setIsAdminLoggedIn(true);
      showPage('admin');
      onClose();
      showToast('✅', 'Welcome back, Admin!');
    } else {
      setError(true);
    }
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-login-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="admin-login-icon">🔐</div>
        <div className="admin-login-title">Admin Access</div>
        <div className="admin-login-sub">FCB Bengaluru — Staff Only</div>
        {error && <div className="admin-error">Incorrect username or password.</div>}
        <div className="form-group" style={{ textAlign: 'left' }}>
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-input"
            placeholder="admin"
            autoComplete="off"
            value={user}
            onChange={e => { setUser(e.target.value); setError(false); }}
          />
        </div>
        <div className="form-group" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••"
            value={pass}
            onChange={e => { setPass(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && doLogin()}
          />
        </div>
        <button className="btn-submit" style={{ width: '100%' }} onClick={doLogin}>
          Login →
        </button>
      </div>
    </div>
  );
}
