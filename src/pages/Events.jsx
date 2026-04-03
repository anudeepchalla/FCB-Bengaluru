import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';
import { STATIC_EVENTS } from '../data/siteData';
import './Events.css';

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function EventCard({ event }) {
  const { openPaymentModal } = useApp();
  return (
    <div className="event-card">
      <div className={`event-banner ${event.bannerClass || ''}`} />
      <div className="event-body">
        <span className={`event-type ${event.typeClass}`}>{event.type}</span>
        <div className="event-title">{event.title}</div>
        <div className="event-meta">
          <div className="event-meta-row"><CalendarIcon />{event.dateStr}</div>
          <div className="event-meta-row"><PinIcon />{event.venue}</div>
          {event.capacity && (
            <div className="event-meta-row"><PeopleIcon />{event.capacity}</div>
          )}
        </div>
        <p className="event-desc">{event.desc}</p>
        <div className="event-cta">
          <div className="event-price">
            {event.price} <span>{event.priceLabel}</span>
          </div>
          <button
            className="btn-event"
            onClick={() => openPaymentModal(event.title, event.price)}
          >
            {event.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Events({ adminEvents = [] }) {
  const allEvents = [...STATIC_EVENTS, ...adminEvents];

  return (
    <div className="page-events">
      <div className="page-header events-header">
        <p className="section-label">FCB Bengaluru Presents</p>
        <h2 className="section-title">Upcoming <span className="accent">Events</span></h2>
        <div className="divider" />
        <p className="header-sub">
          Screenings, meetups, and exclusive fan experiences — all happening in Bengaluru. Be there, bleed blaugrana.
        </p>
      </div>

      <div className="events-grid">
        {allEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <Footer copy="© 2025 FCB Bengaluru. All rights reserved." />
    </div>
  );
}
