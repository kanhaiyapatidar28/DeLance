import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-col">
            <Link to="/" className="nav-logo" style={{ marginBottom: '1rem', display: 'inline-block', textDecoration: 'none' }}>
              De<span style={{ color: 'var(--primary)' }}>Lance</span>
            </Link>
            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '240px', marginTop: '0.5rem' }}>
              The trustless freelance marketplace. Smart contract powered, globally accessible.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.25rem' }}>
              {['𝕏', 'in', 'gh', 'dc'].map(s => (
                <a key={s} href="#" style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  border: '1px solid var(--outline-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted)', fontSize: '0.72rem', fontWeight: 700,
                  textDecoration: 'none', transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--outline-dark)'; e.currentTarget.style.color = 'var(--muted)'; }}
                >{s}</a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Report Issue</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Customer Stories</a></li>
              <li><a href="#">Smart Contract Docs</a></li>
              <li><a href="#">Security Audit</a></li>
              <li><a href="#">Directory Guide</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Freelance</h4>
            <ul>
              <li><a href="#">Services</a></li>
              <li><a href="#">Browse Jobs</a></li>
              <li><a href="#">DAO Governance</a></li>
              <li><a href="#">Dispute Center</a></li>
            </ul>
          </div>
        </div>

        {/* Divider with newsletter */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem', padding: '1.5rem 0',
          borderTop: '1px solid var(--outline)', marginBottom: '1.5rem',
        }}>
          <div>
            <p style={{ color: 'var(--dark)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              Stay in the loop
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Get updates on new features and platform launches.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="email" placeholder="your@email.com" style={{
              padding: '0.5rem 1rem', borderRadius: '100px',
              border: '1px solid var(--outline-dark)',
              background: 'var(--bg-warm)', color: 'var(--dark)',
              fontFamily: 'Inter,sans-serif', fontSize: '0.84rem',
              outline: 'none', width: '220px',
            }} />
            <button style={{
              padding: '0.5rem 1.25rem', borderRadius: '100px',
              background: 'var(--primary)', color: '#fff',
              border: 'none', cursor: 'pointer',
              fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: '0.84rem',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; }}
            >Subscribe</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 DeLance, Inc. All rights reserved.</span>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
