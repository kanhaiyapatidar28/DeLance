import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Find Talent', href: '#services' },
  { label: 'Pricing',     href: '#compare'  },
  { label: 'About',       href: '#about'    },
  { label: 'Solutions',   to:   '/client-dashboard' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [hoverIdx, setHoverIdx]     = useState(null);
  const [pillStyle, setPillStyle]   = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const linksRef = useRef([]);
  const { theme, toggle } = useTheme();
  const { user, login, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sliding indicator pill
  const handleLinkEnter = (i) => {
    setHoverIdx(i);
    const el = linksRef.current[i];
    if (el) {
      const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = el;
      setPillStyle({ left: offsetLeft, width: offsetWidth, height: offsetHeight, top: offsetTop });
    }
  };

  return (
    <>
      <div style={{
        position: 'fixed', top: '14px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 300,
        width: 'min(92vw, 980px)',
      }}>

        {/* Purple aurora glow behind pill */}
        <div style={{
          position: 'absolute', inset: '-8px',
          borderRadius: '100px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.22) 0%, transparent 70%)',
          filter: 'blur(10px)',
          pointerEvents: 'none',
          opacity: scrolled ? 0.6 : 0.35,
          transition: 'opacity 0.5s ease',
        }} />

        <nav style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.25rem', height: '54px', borderRadius: '100px',
          background: 'rgba(15, 5, 30, 0.55)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          border: '1px solid rgba(168,85,247,0.22)',
          boxShadow: `
            0 4px 40px rgba(0,0,0,0.5),
            0 0 0 0.5px rgba(168,85,247,0.18) inset,
            0 1.5px 0 rgba(255,255,255,0.07) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset
          `,
          overflow: 'visible',
        }}>

          {/* Shimmer sweep on load */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '100px',
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 4s ease-in-out infinite',
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* ── LOGO ─────────────────────────────────── */}
          <Link to="/" style={{
            position: 'relative', zIndex: 1,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: '1.15rem', fontWeight: 800,
            letterSpacing: '-0.03em', color: '#fff',
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '6px',
            flexShrink: 0,
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#A855F7,#6D28D9)',
              boxShadow: '0 2px 12px rgba(168,85,247,0.5)',
              fontSize: '0.75rem', fontWeight: 900, color: '#fff',
            }}>D</span>
            De<span style={{ color: '#C084FC' }}>Lance</span>
            <span style={{
              fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.07em',
              textTransform: 'uppercase',
              background: 'rgba(168,85,247,0.15)',
              color: '#A855F7', border: '1px solid rgba(168,85,247,0.3)',
              padding: '2px 7px', borderRadius: '100px',
            }}>Beta</span>
          </Link>

          {/* ── CENTER LINKS with sliding pill indicator ── */}
          <div className="nav-center-links" style={{ position: 'relative', zIndex: 1 }}
            onMouseLeave={() => setHoverIdx(null)}>

            {/* Sliding hover pill */}
            {hoverIdx !== null && (
              <div style={{
                position: 'absolute',
                left: pillStyle.left, top: pillStyle.top,
                width: pillStyle.width, height: pillStyle.height || 32,
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '100px',
                transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1), width 0.25s cubic-bezier(0.4,0,0.2,1)',
                pointerEvents: 'none',
              }} />
            )}

            <ul style={{
              display: 'flex', alignItems: 'center',
              gap: '0', listStyle: 'none', margin: 0, padding: 0,
            }}>
              {NAV_LINKS.map(({ label, href, to }, i) => (
                <li key={label}
                  ref={el => linksRef.current[i] = el}
                  onMouseEnter={() => handleLinkEnter(i)}
                >
                  {to ? (
                    <Link to={to} style={linkStyle}>{label}</Link>
                  ) : (
                    <a href={href} style={linkStyle}>{label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── ACTIONS ──────────────────────────────── */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, position: 'relative', zIndex: 1 }}>

            {/* Hamburger Button (Mobile Only) */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent', border: 'none', color: '#fff',
                cursor: 'pointer', padding: '0.4rem', zIndex: 1,
              }}
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggle}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', borderRadius: '50%',
                background: theme === 'dark'
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(0,0,0,0.06)',
                border: theme === 'dark'
                  ? '1px solid rgba(255,255,255,0.12)'
                  : '1px solid rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = theme === 'dark' ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.12)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'; }}
            >
              {theme === 'dark' ? (
                /* Sun icon for light mode */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,200,60,0.9)" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                /* Moon icon for dark mode */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Wallet */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              padding: '4px 12px', borderRadius: '100px',
              fontSize: '0.73rem', fontFamily: 'Inter, monospace',
              color: 'rgba(16,185,129,0.8)', cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
              onClick={!user ? login : undefined}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(16,185,129,0.15)'; e.currentTarget.style.borderColor='rgba(16,185,129,0.4)'; e.currentTarget.style.color='#10b981'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(16,185,129,0.08)'; e.currentTarget.style.borderColor='rgba(16,185,129,0.2)'; e.currentTarget.style.color='rgba(16,185,129,0.8)'; }}
            >
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#10b981', flexShrink: 0,
                boxShadow: '0 0 6px #10b981',
                animation: 'dotPulse 2s ease-in-out infinite',
              }} />
              {user ? (user.address ? user.address.substring(0,6) + '...' + user.address.substring(38) : '0x742...d44E') : 'Connect Wallet'}
            </div>

            {user ? (
              /* User Profile Section */
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '4px 6px 4px 12px', borderRadius: '100px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer', transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='rgba(168,85,247,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'}
                >
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{user.name}</span>
                  <img src={user.avatar} style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#333' }} alt="Avatar" />
                </button>
                
                {showUserMenu && (
                  <div style={{
                    position: 'absolute', top: '120%', right: 0, width: '180px',
                    background: 'rgba(15, 5, 30, 0.95)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(168,85,247,0.22)', borderRadius: '16px',
                    padding: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 500
                  }}>
                    <Link to="/freelancer-dashboard" style={dropdownItemStyle}>Dashboard</Link>
                    <button onClick={logout} style={{ ...dropdownItemStyle, width: '100%', textAlign: 'left', border: 'none', background: 'transparent' }}>Log out</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Log in */}
                <Link to="/login" style={{
                  padding: '0.38rem 1rem', borderRadius: '100px',
                  fontSize: '0.8rem', fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(255,255,255,0.55)',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(255,255,255,0.28)'; e.currentTarget.style.background='rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.background='transparent'; }}
                >Log in</Link>

                {/* Get Started */}
                <Link to="/signup" style={{
                  padding: '0.42rem 1.2rem',
                  borderRadius: '100px',
                  fontSize: '0.8rem', fontWeight: 700,
                  fontFamily: 'Inter, sans-serif', color: '#fff',
                  background: 'linear-gradient(135deg, rgba(192,132,252,0.85) 0%, rgba(109,40,217,0.9) 100%)',
                  border: '1px solid rgba(192,132,252,0.35)',
                  boxShadow: '0 2px 16px rgba(168,85,247,0.4), 0 1px 0 rgba(255,255,255,0.15) inset',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow='0 4px 28px rgba(168,85,247,0.65), 0 1px 0 rgba(255,255,255,0.15) inset'; e.currentTarget.style.transform='translateY(-1px) scale(1.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 16px rgba(168,85,247,0.4), 0 1px 0 rgba(255,255,255,0.15) inset'; e.currentTarget.style.transform='translateY(0) scale(1)'; }}
                >Get Started →</Link>
              </>
            )}
          </div>
        </nav>
        
        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute', top: '70px', left: 0, right: 0,
            background: 'rgba(15, 5, 30, 0.95)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168,85,247,0.22)', borderRadius: '16px',
            padding: '1rem', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 200,
            display: 'flex', flexDirection: 'column', gap: '0.5rem'
          }}>
            {NAV_LINKS.map(({ label, href, to }, i) => (
              <div key={label} onClick={() => setMobileMenuOpen(false)}>
                {to ? (
                  <Link to={to} style={{ ...dropdownItemStyle, fontSize: '1rem' }}>{label}</Link>
                ) : (
                  <a href={href} style={{ ...dropdownItemStyle, fontSize: '1rem' }}>{label}</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 850px) {
          .nav-center-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @keyframes dotPulse {
          0%,100% { opacity:1; box-shadow:0 0 6px #10b981; }
          50%      { opacity:0.4; box-shadow:0 0 2px #10b981; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}

const dropdownItemStyle = {
  display: 'block',
  padding: '10px 14px',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.85rem',
  fontWeight: 500,
  textDecoration: 'none',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  cursor: 'pointer'
};

const linkStyle = {
  display: 'block',
  color: 'rgba(255,255,255,0.55)',
  textDecoration: 'none',
  padding: '0.38rem 0.9rem',
  borderRadius: '100px',
  fontSize: '0.84rem',
  fontWeight: 500,
  fontFamily: 'Inter, sans-serif',
  transition: 'color 0.2s ease',
  position: 'relative', zIndex: 1,
  whiteSpace: 'nowrap',
};
