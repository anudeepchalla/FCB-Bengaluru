import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';
import './Home.css';

export default function Home() {
  const { showPage } = useApp();

  return (
    <div className="page-home">
      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-stripes">
          {[...Array(6)].map((_, i) => <div key={i} className="stripe" />)}
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="line-gold">Més Que</span><br />
            <span className="line-white">Un Club</span>
          </h1>
          <p className="hero-sub">
            Bengaluru's home for <strong>FC Barcelona</strong> fans. We bleed blaugrana in the heart of India's garden city.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => showPage('membership')}>
              Become a Member
            </button>
            <button className="btn-secondary" onClick={() => showPage('events')}>
              Upcoming Events
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">1500+</div>
            <div className="stat-label">Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">4</div>
            <div className="stat-label">Years Strong</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">30+</div>
            <div className="stat-label">Events Hosted</div>
          </div>
        </div>
      </section>

      {/* ─── Our Story ─── */}
      <div className="section">
        <p className="section-label">Our Story</p>
        <h2 className="section-title">
          Born in <span className="accent">Bengaluru</span>,<br />
          Loyal to <span className="accent">Barça</span>
        </h2>
        <div className="divider" />

        <div className="story-text">
          <p>It all started four years ago, in the crossroads and quiet corners of Bengaluru. Bound by nothing more than a shared love for FC Barcelona, a few strangers decided to gather for a match. Some of us had carried this love since the 90s — through eras, legends, and unforgettable nights.</p>
          <p>Our very first screening was for Barça vs Cádiz. Just eight of us showed up.</p>
          <p><strong>Eight strangers. One crest. One shared passion.</strong></p>
          <p>What began as whispers slowly turned into echoes. The chants grew louder, the circle grew wider, and the energy became something impossible to ignore. Before we knew it, <strong>500+ voices shook Bengaluru</strong> on a magical Clásico night — a sea of Blaugrana united thousands of kilometers away from Camp Nou.</p>
          <p>In these four years, we've lived every emotion together.</p>
          <p>There were the heartbreaks — painful Champions League nights in the post-Messi era, the agony of Araújo's red card, and those two haunting minutes against Inter that still echo in our minds.</p>
          <p>But there were nights of pure joy too.</p>
          <p>The domestic treble, the breathtaking rise of <strong>Lamine Yamal</strong>, unforgettable thrashings of Madrid and Bayern, and that moment — Koundé's strike in the Copa del Rey final — when the entire room erupted in disbelief and celebration.</p>
          <p>From being unseen to featuring on <strong>La Liga's official Instagram</strong> and appearing in Catalan magazines, our journey has been more than just football screenings.</p>
          <p>Because somewhere along the way, something beautiful happened.</p>
          <p><strong>We stopped being strangers. We became a family.</strong></p>
          <p>A family bound not just by matches on a screen, but by shared chants, friendships, celebrations, and heartbreaks.</p>
          <p>From Catalonia to Bengaluru, one anthem connects us all.</p>
          <p><em>One heart. One soul. One crest. One stand.</em></p>
          <p className="visca">Visca El Barça.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
