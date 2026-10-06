import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [role, setRole] = useState('freelancer'); // 'freelancer' or 'client'

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
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '1.5rem', color: '#fff' }}>Join the future.</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.7, fontWeight: 400 }}>Experience a new era of trustless, on-chain collaboration.</p>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)', zIndex: 1 }}></div>
        </div>

        {/* Right Side: Signup Form */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '4rem 5rem',
          background: 'var(--bg)'
        }}>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <div className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>Registration</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem' }}>Get Started</h2>

            {/* Role Toggle */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '6px', 
              background: 'var(--bg-warm)', 
              padding: '6px', 
              borderRadius: '100px',
              marginBottom: '2.5rem',
              border: '1px solid var(--outline)'
            }}>
              <button 
                onClick={() => setRole('freelancer')}
                style={{
                  padding: '10px',
                  borderRadius: '100px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: role === 'freelancer' ? 'var(--primary)' : 'transparent',
                  color: role === 'freelancer' ? '#fff' : 'var(--muted)',
                  transition: 'all 0.2s ease'
                }}
              >Freelancer</button>
              <button 
                onClick={() => setRole('client')}
                style={{
                  padding: '10px',
                  borderRadius: '100px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: role === 'client' ? 'var(--primary)' : 'transparent',
                  color: role === 'client' ? '#fff' : 'var(--muted)',
                  transition: 'all 0.2s ease'
                }}
              >Client</button>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>First Name</label>
                  <input type="text" placeholder="Jane" className="glass-input" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>Last Name</label>
                  <input type="text" placeholder="Doe" className="glass-input" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>Email Address</label>
                <input type="email" placeholder="jane@example.com" className="glass-input" style={inputStyle} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>Password</label>
                <input type="password" placeholder="••••••••" className="glass-input" style={inputStyle} />
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5, marginTop: '0.5rem' }}>
                By signing up, you agree to our <Link to="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Terms of Service</Link> and <Link to="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Privacy Policy</Link>.
              </p>

              <button 
                type="submit" 
                className="btn btn-teal" 
                style={{ width: '100%', padding: '14px', marginTop: '1rem', fontSize: '0.95rem' }}
              >
                Create Account
              </button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--muted)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const inputStyle = {
  background: 'var(--bg-warm)',
  border: '1px solid var(--outline-dark)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: 'var(--dark)',
  outline: 'none',
  transition: 'all 0.2s ease',
  width: '100%'
};

export default Signup;
