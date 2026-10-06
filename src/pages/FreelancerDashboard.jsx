import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import '../assets/dashboard.css';

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [pendingAmount, setPendingAmount] = useState(1500);
  const [totalEarned, setTotalEarned] = useState(42300);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const statsRef = useRef([]);

  useEffect(() => {
    // Stat entrance animation
    gsap.fromTo(statsRef.current, 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power4.out" }
    );
  }, []);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setTotalEarned(prev => prev + pendingAmount);
      setPendingAmount(0);
      setIsWithdrawing(false);
      setShowWithdrawModal(false);
      // Success toast would go here
    }, 1500);
  };

  const handleApply = (jobId) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
  };

  const jobs = [
    { id: 1, title: 'DeFi Yield Aggregator UI', budget: 1200, time: '2h ago', applicants: 14, tags: ['React', 'TypeScript', 'Solidity'] },
    { id: 2, title: 'NFT Marketplace Smart Contracts', budget: 4500, time: '5h ago', applicants: 8, tags: ['Solidity', 'Hardhat', 'Security'] },
    { id: 3, title: 'Cross-chain Bridge Frontend', budget: 2800, time: '1d ago', applicants: 21, tags: ['Next.js', 'Ethers.js', 'Wagmi'] },
  ];

  return (
    <div className="app-layout">
      <Sidebar isFreelancer={true} />
      <div className="main-content">
        <header className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <div className="label" style={{ marginBottom: '2px' }}>Freelancer Terminal</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem' }}>Welcome back, {user?.name.split(' ')[0] || 'Alex'}</h3>
                <span className="tag tag-teal tag-sm">✓ Verified Pro</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="network-badge"><span className="wallet-dot"></span> Polygon</div>
            <div className="wallet-badge"><span className="wallet-dot"></span><span className="mono" style={{ fontSize: '0.78rem' }}>0xA8b...9d12</span></div>
            <Link to="/" className="btn btn-ghost btn-sm">← Home</Link>
          </div>
        </header>

        <div className="page-body">
          <div className="stats-row" style={{ marginBottom: '2rem' }}>
            <div className="stat-card" ref={el => statsRef.current[0] = el}>
              <div className="label">Total Earned</div>
              <div className="stat-value">${totalEarned.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>USDC</span></div>
              <div style={{ marginTop: '0.4rem' }}><span className="tag tag-teal tag-sm">↑ 28% YTD</span></div>
            </div>
            <div className="stat-card" ref={el => statsRef.current[1] = el}>
              <div className="label">Pending Withdrawal</div>
              <div className="stat-value teal">${pendingAmount.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>USDC</span></div>
              <div style={{ marginTop: '0.6rem' }}>
                <button 
                  disabled={pendingAmount === 0}
                  onClick={() => setShowWithdrawModal(true)}
                  className="btn btn-teal btn-sm"
                >
                  {pendingAmount === 0 ? 'Nothing to withdraw' : 'Withdraw →'}
                </button>
              </div>
            </div>
            <div className="stat-card" ref={el => statsRef.current[2] = el}>
              <div className="label">Active Contracts</div>
              <div className="stat-value">4</div>
              <div style={{ marginTop: '0.4rem' }}><span className="tag tag-sm" style={{ background: 'rgba(168,85,247,0.1)', color: 'var(--primary)' }}>2 Milestones Due</span></div>
            </div>
          </div>

          <div className="two-col">
            <div>
              <div className="section-header" style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Available Jobs Feed</h3>
                <span className="tag tag-teal tag-sm">{jobs.length} new matching</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {jobs.map(job => (
                  <div key={job.id} className="card job-listing" style={{ border: appliedJobs.has(job.id) ? '1px solid var(--primary)' : '1px solid var(--outline)' }}>
                    <div className="flex justify-between items-start" style={{ marginBottom: '0.6rem' }}>
                      <div>
                        <h3 className="job-title" style={{ marginBottom: '3px', fontSize: '1.05rem' }}>{job.title}</h3>
                        <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>0x3a7...b2F9 · {job.time}</div>
                      </div>
                      <span className="job-amount" style={{ fontSize: '1.1rem' }}>${job.budget.toLocaleString()} USDC</span>
                    </div>
                    <p style={{ fontSize: '0.86rem', color: 'var(--muted)', marginBottom: '1rem', lineHeight: 1.6 }}>Build a professional grade solution with clean code and high performance standards.</p>
                    <div className="skills-row">
                      {job.tags.map(tag => (
                        <span key={tag} className="tag tag-sm">{tag}</span>
                      ))}
                    </div>
                    <div className="job-listing-footer" style={{ background: appliedJobs.has(job.id) ? 'rgba(168,85,247,0.03)' : 'transparent', marginTop: '0.5rem', borderRadius: '0 0 12px 12px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{job.applicants} Applicants</span>
                      <button 
                        onClick={() => handleApply(job.id)}
                        disabled={appliedJobs.has(job.id)}
                        className={`btn btn-sm ${appliedJobs.has(job.id) ? 'btn-ghost' : 'btn-teal'}`}
                      >
                        {appliedJobs.has(job.id) ? '✓ Application Sent' : 'Apply Now →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="sidebar-details-dash">
              <div className="card" style={{ background: 'linear-gradient(135deg, #0F051E, #2D1A4D)', color: '#fff', border: 'none' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#C084FC' }}>Reputation Score</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>98%</div>
                <div className="progress-bar-bg" style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                  <div style={{ width: '98%', height: '100%', background: '#A855F7', borderRadius: '10px', boxShadow: '0 0 10px #A855F7' }}></div>
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '1rem' }}>Top 1% of Decentralized Talent globally.</p>
              </div>

              <div className="card" style={{ marginTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Activity Feed</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ fontSize: '0.8rem', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#10b981' }}>●</span>
                    <div>Payment received for <b>Milestone #2</b></div>
                  </li>
                  <li style={{ fontSize: '0.8rem', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#A855F7' }}>●</span>
                    <div>New invitation from <b>MetaMask</b></div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="dashboard-modal-overlay" onClick={() => !isWithdrawing && setShowWithdrawModal(false)}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Confirm Withdrawal</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              You are about to withdraw <b>{pendingAmount} USDC</b> to your connected wallet. This transaction will be processed on the Polygon network.
            </p>
            
            <div className="wallet-display-pill" style={{ 
              background: 'var(--bg-warm)', 
              padding: '1rem', 
              borderRadius: '12px', 
              border: '1px solid var(--outline)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Destination</span>
              <span className="mono" style={{ fontSize: '0.85rem' }}>0xA8b...9d12</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setShowWithdrawModal(false)} 
                disabled={isWithdrawing}
                className="btn btn-ghost" 
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                onClick={handleWithdraw} 
                disabled={isWithdrawing}
                className="btn btn-teal" 
                style={{ flex: 1.5, position: 'relative' }}
              >
                {isWithdrawing ? 'Processing...' : 'Confirm →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerDashboard;
