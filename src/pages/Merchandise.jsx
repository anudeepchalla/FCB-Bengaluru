import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';
import { STATIC_MERCH } from '../data/siteData';
import './Merchandise.css';

function MerchCard({ item }) {
  const { openPaymentModal } = useApp();
  const [activePhoto, setActivePhoto] = useState(0);
  const hasPhotos = item.photos && item.photos.length > 0;

  return (
    <div className="merch-product-card">
      {/* Gallery */}
      <div className="merch-gallery">
        <div className="merch-main-img">
          {hasPhotos ? (
            <img src={item.photos[activePhoto]} alt={item.name} />
          ) : (
            <span style={{ fontSize: '3rem' }}>🛍️</span>
          )}
          {item.badge && <div className="merch-badge">{item.badge}</div>}
        </div>
        {hasPhotos && item.photos.length > 1 && (
          <div className="merch-thumbnails">
            {item.photos.map((p, i) => (
              <div
                key={i}
                className={`merch-thumb${activePhoto === i ? ' active' : ''}`}
                onClick={() => setActivePhoto(i)}
              >
                <img src={p} alt={`${item.name} ${i + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="merch-info">
        <div className="merch-category">{item.category}</div>
        <div className="merch-name">{item.name}</div>
        <div className="merch-price-row">
          <div className="merch-price"><span className="currency">₹</span>{item.price}</div>
        </div>
        <div className="merch-desc">
          {item.desc.split('\n').map((line, i) =>
            line ? <p key={i}>{line}</p> : null
          )}
          {item.tagline && <p className="merch-tagline">{item.tagline}</p>}
        </div>
        <button
          className="btn-add"
          onClick={() => openPaymentModal(item.name, `₹${item.price}`)}
        >
          Buy Now
        </button>
        <div className="merch-stock">
          {item.stock} · Ships within Bengaluru in 3–5 days
        </div>
      </div>
    </div>
  );
}

export default function Merchandise({ adminMerchItems = [] }) {
  const allItems = [...STATIC_MERCH, ...adminMerchItems];

  return (
    <div className="page-merch">
      <div className="page-header merch-header">
        <p className="section-label">Official Fan Store</p>
        <h2 className="section-title">
          FCB Bengaluru <span className="accent">Merchandise</span>
        </h2>
        <div className="divider" />
        <p className="header-sub">
          Wear your passion. Exclusive merchandise designed and produced by FCB Bengaluru — only available to our community.
        </p>
      </div>

      <div className={`merch-grid${allItems.length === 1 ? ' merch-single' : ''}`}>
        {allItems.map(item => (
          <MerchCard key={item.id} item={item} />
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
