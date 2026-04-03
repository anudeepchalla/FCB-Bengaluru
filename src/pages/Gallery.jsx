import { useState, useEffect, useCallback } from 'react';
import Footer from '../components/Footer';
import './Gallery.css';

// ─────────────────────────────────────────────
//  CONFIGURATION
//  Replace GOOGLE_API_KEY with your API key from
//  Google Cloud Console → APIs & Services → Credentials
//  The Drive folder is already set from your shared link.
// ─────────────────────────────────────────────
const GOOGLE_API_KEY   = 'AIzaSyDBhqd5demWtVWO8FVfTuHTP14qYew39uA';
const DRIVE_FOLDER_ID  = '1l69nJfPNvNu6MNpHHkVvaIMwqqTnGcIm';
const MAX_PHOTOS       = 50;

// Google Drive direct image URL builder
const driveThumbUrl = (fileId) =>
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;

const driveFullUrl = (fileId) =>
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;

export default function Gallery() {
  const [photos, setPhotos]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [lightbox, setLightbox]   = useState(null); // index of open photo
  const [imgLoaded, setImgLoaded] = useState({});

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
      setError('api_key_missing');
      setLoading(false);
      return;
    }

    try {
      // Query Drive for image files inside the folder, ordered by name (album order)
      const query = encodeURIComponent(
        `'${DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`
      );
      const fields = encodeURIComponent('files(id,name,createdTime),nextPageToken');
      const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=name&pageSize=${MAX_PHOTOS}&key=${GOOGLE_API_KEY}`;

      const res = await fetch(url);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setPhotos(data.files || []);
    } catch (err) {
      console.error('Gallery fetch error:', err);
      setError(err.message || 'Failed to load photos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === 'ArrowRight') setLightbox(i => Math.min(i + 1, photos.length - 1));
      if (e.key === 'ArrowLeft')  setLightbox(i => Math.max(i - 1, 0));
      if (e.key === 'Escape')     setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, photos.length]);

  const openLightbox = (idx) => {
    setLightbox(idx);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="page-gallery">
      {/* Header */}
      <div className="page-header gallery-header">
        <p className="section-label">Memories from the Stand</p>
        <h2 className="section-title">
          Our <span className="accent">Gallery</span>
        </h2>
        <div className="divider" />
        <p className="header-sub">
          Screaming, cheering, celebrating — moments that made us a family. Up to {MAX_PHOTOS} photos, pulled live from our album.
        </p>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="gallery-state">
          <div className="gallery-spinner">
            <div className="spinner-ring" />
            <div className="spinner-ring" />
            <div className="spinner-ring" />
          </div>
          <p className="gallery-state-text">Loading photos from Google Drive…</p>
        </div>
      )}

      {/* ── API Key Missing ── */}
      {!loading && error === 'api_key_missing' && (
        <div className="gallery-state">
          <div className="gallery-notice">
            <div className="notice-icon">🔑</div>
            <h3>Almost there — API Key needed</h3>
            <p>
              The gallery fetches photos live from your Google Drive folder.<br />
              To activate it, add your Google API Key in{' '}
              <code>src/pages/Gallery.jsx</code> at the top:
            </p>
            <div className="notice-code">
              <span className="code-comment">// Replace this line:</span><br />
              <span className="code-const">const</span> GOOGLE_API_KEY = <span className="code-str">'YOUR_GOOGLE_API_KEY_HERE'</span>;
            </div>
            <p className="notice-steps">
              <strong>How to get one (2 minutes):</strong><br />
              1. Go to <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer">console.cloud.google.com</a><br />
              2. Select project <strong>screening-photos</strong><br />
              3. APIs &amp; Services → Credentials → <strong>+ Create Credentials → API Key</strong><br />
              4. Copy the key and paste it above
            </p>
            <p className="notice-note">
              💡 The Drive folder is already configured and set to public — only the API key is missing.
            </p>
          </div>
        </div>
      )}

      {/* ── Other Error ── */}
      {!loading && error && error !== 'api_key_missing' && (
        <div className="gallery-state">
          <div className="gallery-notice gallery-notice--error">
            <div className="notice-icon">⚠️</div>
            <h3>Could not load photos</h3>
            <p>{error}</p>
            <p className="notice-note">
              Make sure the Drive folder is set to <strong>"Anyone with the link can view"</strong> and the Google Drive API is enabled for project <strong>screening-photos</strong>.
            </p>
            <button className="btn-retry" onClick={fetchPhotos}>Try Again</button>
          </div>
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && photos.length === 0 && (
        <div className="gallery-state">
          <div className="gallery-notice">
            <div className="notice-icon">📷</div>
            <h3>No photos yet</h3>
            <p>Add photos to your Google Drive folder and they'll appear here automatically.</p>
          </div>
        </div>
      )}

      {/* ── Grid ── */}
      {!loading && !error && photos.length > 0 && (
        <>
          <div className="gallery-meta">
            Showing <strong>{photos.length}</strong> photo{photos.length !== 1 ? 's' : ''}
            {photos.length === MAX_PHOTOS && ` (limit: ${MAX_PHOTOS})`}
          </div>
          <div className="gallery-grid">
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                className={`gallery-item${imgLoaded[photo.id] ? ' loaded' : ''}`}
                onClick={() => openLightbox(idx)}
              >
                <div className="gallery-item-inner">
                  <img
                    src={driveThumbUrl(photo.id)}
                    alt={photo.name || `Photo ${idx + 1}`}
                    loading="lazy"
                    onLoad={() => setImgLoaded(p => ({ ...p, [photo.id]: true }))}
                    onError={(e) => { e.target.style.opacity = '0.2'; }}
                  />
                  <div className="gallery-item-overlay">
                    <span className="gallery-zoom-icon">🔍</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Lightbox ── */}
      {lightbox !== null && photos[lightbox] && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => Math.max(i - 1, 0)); }}
            disabled={lightbox === 0}
          >‹</button>

          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img
              src={driveFullUrl(photos[lightbox].id)}
              alt={photos[lightbox].name}
            />
            <div className="lightbox-counter">
              {lightbox + 1} / {photos.length}
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => Math.min(i + 1, photos.length - 1)); }}
            disabled={lightbox === photos.length - 1}
          >›</button>
        </div>
      )}

      <Footer copy="© 2025 FCB Bengaluru. All rights reserved." />
    </div>
  );
}
