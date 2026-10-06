import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import '../assets/dashboard.css';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [totalSpent, setTotalSpent] = useState(128400);
  const [inEscrow, setInEscrow] = useState(8200);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contracts, setContracts] = useState([
    { id: 1, title: 'Smart Contract Optimization', budget: 3800, freelancer: 'Audrey M.', status: 'In Progress' },
    { id: 2, title: 'Landing Page Redesign', budget: 1200, freelancer: 'Kevin S.', status: 'Awaiting Approval' }
  ]);
  const statsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(statsRef.current, 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }
    );
  }, []);

  const handlePostJob = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPostModal(false);
      // Logic to add job would go here
    }, 1200);
  };

  const handleReleaseEscrow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setInEscrow(prev => prev - 1200);
      setTotalSpent(prev => prev + 1200);
      setContracts(prev => prev.map(c => c.id === 2 ? { ...c, status: 'Completed' } : c));
      setIsProcessing(false);
      setShowReleaseModal(false);
    }, 1500);
  };

  return (
    <div className="app-layout">
      <Sidebar isFreelancer={false} />
      <div className="main-content">
        <header className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <div className="label" style={{ marginBottom: '2px' }}>Client Portal</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem' }}>The {user?.name.split(' ')[0] || 'Alex'} Workspace</h3>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="network-badge"><span className="wallet-dot"></span> Polygon</div>
            <div className="wallet-badge"><span className="wallet-dot"></span><span className="mono" style={{ fontSize: '0.78rem' }}>0x9F4...22B1</span></div>
            <Link to="/" className="btn btn-ghost btn-sm">← Home</Link>
          </div>
        </header>

        <div className="page-body">
          <div className="stats-row" style={{ marginBottom: '2rem' }}>
            <div className="stat-card" ref={el => statsRef.current[0] = el}>
              <div className="label">Total Spent</div>
              <div className="stat-value">${totalSpent.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>USDC</span></div>
              <div style={{ marginTop: '0.4rem' }}><span className="tag tag-teal tag-sm">Top Client</span></div>
            </div>
            <div className="stat-card" ref={el => statsRef.current[1] = el}>
              <div className="label">In Escrow</div>
              <div className="stat-value teal">${inEscrow.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>USDC</span></div>
              <div style={{ marginTop: '0.4rem' }}><span className="tag tag-sm" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Secured by Smart Contract</span></div>
            </div>
          </div>

          <div className="two-col">
            <div>
              <div className="section-header" style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Management Terminal</h3>
                <button onClick={() => setShowPostModal(true)} className="btn btn-teal btn-sm">Post New Job +</button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contracts.map(contract => (
                  <div key={contract.id} className="card job-listing" style={{ border: contract.status === 'Awaiting Approval' ? '1px solid var(--warning)' : '1px solid var(--outline)' }}>
                    <div className="flex justify-between items-start" style={{ marginBottom: '0.6rem' }}>
                      <div>
                        <h3 className="job-title" style={{ marginBottom: '3px' }}>{contract.title}</h3>
                        <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>0xF2d...A441 · {contract.status}</div>
                      </div>
                      <span className="job-amount">${contract.budget.toLocaleString()} USDC</span>
                    </div>
                    <div className="job-listing-footer" style={{ background: contract.status === 'Awaiting Approval' ? 'rgba(217,119,6,0.03)' : 'transparent', marginTop: '0.5rem', borderRadius: '0 0 12px 12px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Freelancer: <b>{contract.freelancer}</b></span>
                      {contract.status === 'Awaiting Approval' ? (
                        <button onClick={() => setShowReleaseModal(true)} className="btn btn-sm" style={{ background: 'var(--warning)', color: '#fff', border: 'none' }}>Approve & Release →</button>
                      ) : (
                        <button className="btn btn-outline btn-sm">View Work</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="sidebar-details-dash">
              <div className="card" style={{ background: 'rgba(168,85,247,0.03)', border: '1px dashed var(--primary)' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Project Intelligence</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                  Your projects are currently <b>12% ahead</b> of schedule. Consider releasing the next milestone for <b>Audrey M.</b> to maintain momentum.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="dashboard-modal-overlay" onClick={() => !isProcessing && setShowPostModal(false)}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Post New Job</h2>
            <form onSubmit={handlePostJob} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Project Title</label>
                <input type="text" placeholder="e.g. Smart Contract Audit" className="glass-input-premium" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Budget (USDC)</label>
                  <input type="number" placeholder="5000" className="glass-input-premium" required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Timeline</label>
                  <select className="glass-input-premium">
                    <option>1-2 Weeks</option>
                    <option>1 Month</option>
                    <option>3+ Months</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowPostModal(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" disabled={isProcessing} className="btn btn-teal" style={{ flex: 2 }}>
                  {isProcessing ? 'Publishing...' : 'Post Job →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Release Escrow Modal */}
      {showReleaseModal && (
        <div className="dashboard-modal-overlay" onClick={() => !isProcessing && setShowReleaseModal(false)}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
              <h2 style={{ fontSize: '1.5rem' }}>Release Milestone?</h2>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem', textAlign: 'center' }}>
              You are authorizing the release of <b>1,200 USDC</b> to <b>Kevin S.</b> for the <i>Landing Page Redesign</i> milestone.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setShowReleaseModal(false)} disabled={isProcessing} className="btn btn-ghost" style={{ flex: 1 }}>Not yet</button>
              <button onClick={handleReleaseEscrow} disabled={isProcessing} className="btn btn-teal" style={{ flex: 2 }}>
                {isProcessing ? 'Processing Transaction...' : 'Yes, Release Payment →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
