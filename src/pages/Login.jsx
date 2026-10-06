import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await login(email, password);
    if (!error) {
      const userRole = data?.user?.role || 'freelancer';
      navigate(`/${userRole}-dashboard`);
    } else {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '100vh', paddingTop: '64px' }}>
        {/* Left Side: Editorial Image */}
        <div style={{ 
          position: 'relative', 
          overflow: 'hidden',
          background: 'var(--bg-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/auth-bg.png" 
            alt="Editorial background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Subtle overlay text */}
          <div style={{
            position: 'absolute',
            bottom: '4rem',
            left: '4rem',
            color: '#fff',
            zIndex: 2,
            maxWidth: '400px'
          }}>
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '1.5rem', color: '#fff' }}>Welcome back.</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.7, fontWeight: 400 }}>Connect with the world's most elite decentralized talent pool.</p>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)', zIndex: 1 }}></div>
        </div>

        {/* Right Side: Login Form */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '4rem 5rem',
          background: 'var(--bg)'
        }}>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <div className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>Authentication</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem' }}>Log In</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="glass-input"
                  required
                  style={{
                    background: 'var(--bg-warm)',
                    border: '1px solid var(--outline-dark)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: 'var(--dark)',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="glass-input"
                  required
                  style={{
                    background: 'var(--bg-warm)',
                    border: '1px solid var(--outline-dark)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: 'var(--dark)',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--body)' }}>
                  <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                  Remember me
                </label>
                <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</Link>
              </div>

              <button 
                type="submit" 
                className="btn btn-teal" 
                style={{ width: '100%', padding: '14px', marginTop: '1rem', fontSize: '0.95rem' }}
              >
                Sign In
              </button>
            </form>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--muted)' }}>
              Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Sign up</Link>
            </div>

            <div style={{ margin: '2.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--outline)' }}></div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--faint)' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--outline)' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button className="btn btn-white" style={{ fontSize: '0.85rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button className="btn btn-white" style={{ fontSize: '0.85rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                Github
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
