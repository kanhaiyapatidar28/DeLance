import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BubbleMenu from '../components/BubbleMenu';
import StatueAnimation from '../components/StatueAnimation';
import Waves from '../components/Waves';
import '../assets/landing.css';

const Counter = ({ target, prefix = '' }) => {
  return <span>{prefix}{target}</span>;
};

const popularItems = [
  {
    label: <>Smart<br/>Contract</>,
    category: 'Web3',
    rotation: -4,
    hoverStyles: { bgColor: '#A855F7', textColor: '#ffffff' }
  },
  {
    label: 'Blockchain',
    category: 'Web3',
    rotation: 2,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: <>UI/UX<br/>Design</>,
    category: 'Design',
    rotation: -2,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: <>3D<br/>Animation</>,
    category: 'Design',
    rotation: 5,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Copywriting',
    category: 'Marketing',
    rotation: -3,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Web Development',
    category: 'Development',
    rotation: 4,
    hoverStyles: { bgColor: '#6366f1', textColor: '#ffffff' }
  },
  {
    label: 'Video Editing',
    category: 'Design',
    rotation: -5,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  }
];

const Home = () => {
  useEffect(() => {
    // Scroll Reveal Intersection Observer
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    
    revealEls.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-headline-wrap" style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
            {/* Fade masks on left and right */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '8rem',
              background: 'linear-gradient(to right, var(--bg), transparent)',
              zIndex: 2, pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '8rem',
              background: 'linear-gradient(to left, var(--bg), transparent)',
              zIndex: 2, pointerEvents: 'none'
            }} />

            {/* Scrolling track — two copies for seamless loop */}
            <div style={{
              display: 'flex',
              animation: 'marqueeScroll 18s linear infinite',
              whiteSpace: 'nowrap',
              willChange: 'transform',
            }}>
              {[0, 1].map(copy => (
                <div key={copy} style={{ display: 'flex', alignItems: 'center', gap: '2rem', paddingRight: '2rem', flexShrink: 0 }}>
                  {['FREELANCE', '★', 'MARKETPLACE', '◆', 'DECENTRALIZED', '★', 'WEB3', '◆', 'ESCROW', '★', 'TRUSTLESS', '◆'].map((word, i) => (
                    <span key={i} className={i % 2 === 0 ? 'display-hero' : ''}
                      style={
                        i % 2 !== 0
                          ? { color: 'var(--primary)', fontSize: '2rem', lineHeight: 1 }
                          : i % 4 === 2
                            ? { WebkitTextStroke: '2px var(--dark)', color: 'transparent', display: 'inline-block' }
                            : {}
                      }
                    >{word}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marqueeScroll {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
          `}</style>
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-top reveal revealed">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span className="tag tag-teal" style={{ fontSize: '0.72rem' }}>● Live on Ethereum</span>
                  <span className="tag tag-teal" style={{ fontSize: '0.72rem' }}>Polygon</span>
                  <span className="tag tag-teal" style={{ fontSize: '0.72rem' }}>Arbitrum</span>
                </div>
                <p className="hero-tagline">A DeLance marketplace connects you with talented freelancers using smart contracts that protect both sides — facilitating a project from start to finish.</p>
                <div className="hero-search-wrap">
                  {/* Premium glass search bar */}
                  <div id="heroSearchBar" style={{
                    display: 'flex', alignItems: 'center',
                    height: '56px',
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: '100px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                    onFocus={() => {
                      document.getElementById('heroSearchBar').style.borderColor = 'rgba(168,85,247,0.5)';
                      document.getElementById('heroSearchBar').style.boxShadow = '0 4px 32px rgba(0,0,0,0.35), 0 0 0 3px rgba(168,85,247,0.12), 0 1px 0 rgba(255,255,255,0.06) inset';
                    }}
                    onBlur={() => {
                      document.getElementById('heroSearchBar').style.borderColor = 'rgba(255,255,255,0.14)';
                      document.getElementById('heroSearchBar').style.boxShadow = '0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset';
                    }}
                  >
                    {/* Category dropdown */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '0 1.1rem', height: '100%',
                      borderRight: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer', flexShrink: 0,
                    }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' }}>All</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>

                    {/* Search icon */}
                    <svg style={{ marginLeft: '1rem', flexShrink: 0, color: 'rgba(255,255,255,0.3)' }} width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>

                    {/* Input */}
                    <input
                      type="text"
                      placeholder="Search for any service..."
                      id="heroSearch"
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        background: 'transparent',
                        borderRadius: '0px',
                        padding: '0 0.75rem',
                        color: '#fff',
                        fontFamily: 'Inter,sans-serif',
                        fontSize: '0.9rem',
                      }}
                    />

                    {/* Divider + Search button */}
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingRight: '6px' }}>
                      <button
                        type="button"
                        style={{
                          height: '42px', padding: '0 1.4rem',
                          background: 'linear-gradient(135deg, rgba(168,85,247,0.9) 0%, rgba(109,40,217,1) 100%)',
                          border: '1px solid rgba(192,132,252,0.3)',
                          borderRadius: '100px', color: '#fff',
                          fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '0.84rem',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                          boxShadow: '0 2px 12px rgba(168,85,247,0.35)',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow='0 4px 20px rgba(168,85,247,0.55)'; e.currentTarget.style.transform='scale(1.02)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 12px rgba(168,85,247,0.35)'; e.currentTarget.style.transform='scale(1)'; }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        Search
                      </button>
                    </div>
                  </div>
                  
                  {/* POPULAR SERVICES - BUBBLE MENU MOVED UNDER SEARCH */}
                  <div style={{ marginTop: '2.5rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', zIndex: 50 }}>
                      <div className="section-eyebrow" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>Popular Services</div>
                      <div className="bubble-menu-outer-wrap" style={{ marginLeft: '-1rem' }}>
                        <BubbleMenu 
                          logo={<span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#111' }}>Categories</span>}
                          items={popularItems}
                          menuBg="#ffffff"
                          menuContentColor="#111111"
                        />
                      </div>
                  </div>
                </div>
              </div>
              <div className="hero-bottom reveal revealed reveal-delay-2">
                <div className="avatar-stack">
                  <div className="av" style={{ background: '#EAF5F3', color: 'var(--primary)' }}>A</div>
                  <div className="av" style={{ background: '#F9F0FF', color: '#8B5CF6' }}>S</div>
                  <div className="av" style={{ background: '#FFF0F0', color: '#E53E3E' }}>M</div>
                </div>
                <div>
                  <div className="trusted-count"><Counter target="3,400+" /></div>
                  <div className="trusted-label">Trusted Freelancers</div>
                </div>
                <div style={{ marginLeft: '1rem' }}>
                  <div className="stars" style={{ fontSize: '0.85rem' }}>★★★★★</div>
                  <div className="trusted-sub">4.9 / 5 satisfaction</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <Link to="/freelancer-dashboard" className="btn btn-teal btn-sm">Find Talent →</Link>
                </div>
              </div>
            </div>
            <div className="hero-photo-side">
              {/* INTERACTIVE ANIMATED STATUE */}
              <StatueAnimation />
              
              <div className="hero-photo-overlay" style={{ pointerEvents: 'none' }}>
                <div className="hero-profile-card" style={{ pointerEvents: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="av" style={{ width: '38px', height: '38px', background: 'var(--primary-light)', color: 'var(--primary)', fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>S</div>
                    <div>
                      <div className="profile-card-name">Audrey M.</div>
                      <div className="profile-card-role">UI/UX Designer · Remote</div>
                    </div>
                  </div>
                  <div className="profile-card-row"><span className="stars" style={{ fontSize: '0.7rem' }}>★★★★★</span> <strong>4.9</strong></div>
                  <div className="profile-card-rate">$90 / hour</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Services section was relocated into the Hero Search area */}

        {/* OUTSTANDING WORKMANSHIP V2 */}
        <section className="workmanship-v2" id="about">
          <div className="container">
            <div className="workmanship-grid-v2">
              
              {/* Media Side */}
              <div className="workmanship-media-frame reveal">
                <img src="/workmanship-photo.png" alt="Professional freelancer" />
                <div className="workmanship-overlay" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }}></div>
                <button className="play-btn-premium" aria-label="Play video" title="Watch how it works">
                  <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>

              {/* Content Side */}
              <div className="workmanship-glass-card reveal reveal-delay-1">
                <div className="badge-live">
                  <span className="pulse-dot"></span>
                  Verified Excellence
                </div>
                <div className="section-eyebrow" style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>Top Talent</div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '1.25rem', lineHeight: 1.1, fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800 }}>
                  Find outstanding<br/>workmanship.
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '420px' }}>
                  The best way to verify and de-risk work with a fully customized freelance project. 
                  Our platform guarantees connection with top-tier freelancers on-chain, 
                  making every project transparent at every step.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/freelancer-dashboard" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem' }}>Browse Talent</Link>
                  <button className="btn" style={{ 
                    padding: '0.8rem 1.8rem', 
                    background: 'transparent',
                    border: '1px solid var(--outline-dark)',
                    color: 'var(--dark)',
                    fontWeight: 600
                  }}>Explore Process</button>
                </div>
                
                {/* Decorative background text */}
                <div className="workmanship-deco-text">PRO</div>
              </div>

            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <div className="stats-strip">
          <div className="container">
            <div className="stats-strip-inner reveal revealed">
              <div className="stat-strip-item">
                <span className="stat-strip-num teal-num"><Counter target="14.2M" prefix="$" /></span>
                <span className="stat-strip-label">Secured in Escrow</span>
              </div>
              <div className="stat-strip-div"></div>
              <div className="stat-strip-item">
                <span className="stat-strip-num"><Counter target="8,400+" /></span>
                <span className="stat-strip-label">Contracts Completed</span>
              </div>
              <div className="stat-strip-div"></div>
              <div className="stat-strip-item">
                <span className="stat-strip-num teal-num"><Counter target="142" /></span>
                <span className="stat-strip-label">Countries</span>
              </div>
              <div className="stat-strip-div"></div>
              <div className="stat-strip-item">
                <span className="stat-strip-num"><Counter target="0" /></span>
                <span className="stat-strip-label">Platform Employees in the Loop</span>
              </div>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <section className="why-section" id="why" style={{ position: 'relative', overflow: 'hidden', background: 'rgba(80,20,120,0.08)' }}>
          {/* Waves background */}
          <Waves
            lineColor="rgba(168,85,247,0.65)"
            backgroundColor="transparent"
            waveSpeedX={0.0125}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
            style={{ zIndex: 0 }}
          />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="why-grid">
              <div>
                <div className="section-eyebrow reveal revealed">Why Choose Us?</div>
                <h2 className="reveal revealed" style={{ marginBottom: '0.5rem' }}>Guaranteed trust, built into every contract.</h2>
                <p className="reveal revealed" style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '380px', lineHeight: 1.7, marginBottom: '2rem' }}>Choose DeLance out of all services and freelancers to access an everything-in-one freelance toolkit, always.</p>
                <div className="why-features-list">
                  <div className="why-feature reveal revealed">
                    <div className="why-icon">🤝</div>
                    <div>
                      <h4>Seamless Collaboration</h4>
                      <p>On our friendly interface you share every collaboration easier. Communicate with confidence, and track project progress every step.</p>
                    </div>
                  </div>
                  <div className="why-feature reveal revealed reveal-delay-1">
                    <div className="why-icon">🌐</div>
                    <div>
                      <h4>Support and Community</h4>
                      <p>Join a diverse ecosystem of Freelancers and Clients who are passionate about their craft. Highly-accessible 24/7 support when you need help and have questions.</p>
                    </div>
                  </div>
                  <div className="why-feature reveal revealed reveal-delay-2">
                    <div className="why-icon">🔒</div>
                    <div>
                      <h4>Secure and Reliable</h4>
                      <p>Your safety and security are top priorities. We safeguard both parties using smart contract escrow and decentralized governance.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="why-right">
                <div className="why-photo">
                  <img src="/workmanship-photo.png" alt="Professional at work" />
                </div>
                <div className="guarantee-stamp">
                  <span style={{ fontSize: '1.4rem' }}>✓</span>
                  <span>Quality</span>
                  <span>Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="compare-section" id="compare">
          <div className="container">
            <div className="section-eyebrow reveal revealed" style={{ textAlign: 'center', display: 'block' }}>Platform Comparison</div>
            <h2 className="reveal revealed" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>DeLance vs Legacy Platforms</h2>
            <div className="card reveal revealed" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-xl)' }}>
              <div className="compare-grid compare-header">
                <div className="compare-feature">Feature</div>
                <div className="compare-col col-delance">DeLance</div>
                <div className="compare-col col-legacy">Upwork / Fiverr</div>
              </div>
              <div className="compare-row"><div className="compare-feature">Service Fee</div><div className="compare-col good">✓ ~1–3% (gas only)</div><div className="compare-col bad">✗ 10–27% deducted</div></div>
              <div className="compare-row"><div className="compare-feature">Payment Settlement</div><div className="compare-col good">✓ Instant on-chain</div><div className="compare-col bad">✗ 7–14 day transfers</div></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-inner reveal revealed">
              <div className="section-eyebrow" style={{ color: 'var(--accent)', display: 'block', marginBottom: '1rem' }}>Get Started</div>
              <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to work<br />trustlessly?</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.7 }}>No account to create. Just connect your wallet.</p>
              <div className="cta-actions">
                <Link to="/client-dashboard" className="btn btn-white btn-lg">Post a Job</Link>
                <Link to="/freelancer-dashboard" className="btn btn-teal btn-lg">Find Work →</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Home;
