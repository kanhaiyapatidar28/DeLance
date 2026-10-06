import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import '../assets/dashboard.css';

const CATEGORIES = ['All', 'Development', 'Design', 'Marketing', 'Web3', 'Management'];

const MOCK_JOBS = [
  { id: 1, title: 'DeFi Yield Aggregator UI', budget: 1200, category: 'Development', time: '2h ago', applicants: 14, tags: ['React', 'TypeScript', 'Solidity'], desc: 'Build a clean, data-rich UI for a yield aggregator on Arbitrum. Real-time APY charts required.' },
  { id: 2, title: 'NFT Marketplace Smart Contracts', budget: 4500, category: 'Web3', time: '5h ago', applicants: 8, tags: ['Solidity', 'Hardhat', 'Security'], desc: 'Develop secure, gas-optimized ERC-721 contracts for a premium digital art marketplace.' },
  { id: 3, title: 'Cross-chain Bridge Frontend', budget: 2800, category: 'Development', time: '1d ago', applicants: 21, tags: ['Next.js', 'Ethers.js', 'Wagmi'], desc: 'Create a seamless cross-chain bridging interface supporting Ethereum, Polygon, and Avalanche.' },
  { id: 4, title: 'Brand Identity for DAO', budget: 1800, category: 'Design', time: '3h ago', applicants: 5, tags: ['Figma', 'Branding', 'UI/UX'], desc: 'Craft a modern, decentralized-focused brand identity for a new social coordination DAO.' },
  { id: 5, title: 'Discord Community Management', budget: 900, category: 'Management', time: '12h ago', applicants: 30, tags: ['Community', 'Discord', 'Growth'], desc: 'Manage and grow a vibrant Web3 community on Discord. Experience with bots and moderation required.' },
  { id: 6, title: 'Solana Mobile Wallet Integration', budget: 3200, category: 'Web3', time: '2d ago', applicants: 12, tags: ['Swift', 'Solidity', 'Mobile'], desc: 'Integrate Phantom and Solflare wallet adapters into our native iOS/Android applications.' },
  { id: 7, title: 'Lending Protocol Smart Audit', budget: 6000, category: 'Web3', time: '4h ago', applicants: 3, tags: ['Solidity', 'Security', 'Auditing'], desc: 'Perform a comprehensive security audit on a new peer-to-peer lending protocol.' },
];

const BrowseJobs = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory && CATEGORIES.includes(initialCategory) ? initialCategory : 'All');
  const [filteredJobs, setFilteredJobs] = useState(MOCK_JOBS);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [selectedJob, setSelectedJob] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (initialCategory && CATEGORIES.includes(initialCategory)) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const filtered = MOCK_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                            job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredJobs(filtered);
  }, [search, activeCategory]);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [filteredJobs]);

  const handleApply = (jobId) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
    setSelectedJob(null);
  };

  return (
    <div className="app-layout">
      <Sidebar isFreelancer={true} />
      <div className="main-content">
        <header className="page-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', paddingBottom: '2.5rem' }}>
          <div>
            <div className="label" style={{ letterSpacing: '0.1em' }}>OPPORTUNITIES Explorer</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '4px' }}>Find Your Next High-Impact Project</h3>
          </div>

          <div style={{ width: '100%', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '320px' }}>
              <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', opacity: 0.6 }}>🔍</span>
              <input 
                type="text" 
                placeholder="Search by keywords, skills, or titles..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 52px',
                  borderRadius: '16px',
                  background: 'var(--bg-warm)',
                  border: '1px solid var(--outline)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  outline: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease',
                }}
                className="search-input-premium"
              />
            </div>
            
            <div className="flex items-center gap-3" style={{ marginLeft: 'auto' }}>
              <div className="network-badge" style={{ padding: '8px 16px' }}><span className="wallet-dot"></span> Polygon Mainnet</div>
              <div className="wallet-badge" style={{ padding: '8px 16px' }}><span className="wallet-dot"></span><span className="mono" style={{ fontSize: '0.85rem' }}>0xA8b...9d12</span></div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--outline)',
                  background: activeCategory === cat ? 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(109,40,217,0.1) 100%)' : 'var(--bg-warm)',
                  color: activeCategory === cat ? 'var(--primary)' : 'var(--muted)',
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(168,85,247,0.15)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="page-body">
          <div ref={gridRef} className="jobs-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filteredJobs.length > 0 ? filteredJobs.map(job => (
              <div key={job.id} onClick={() => setSelectedJob(job)} className="card job-listing" style={{ 
                cursor: 'pointer',
                display: 'flex', 
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                border: appliedJobs.has(job.id) ? '1px solid var(--primary)' : '1px solid var(--outline)'
              }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '1.25rem' }}>
                  <span className="tag tag-sm" style={{ 
                    background: 'rgba(168,85,247,0.06)', 
                    color: 'var(--primary)', 
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>{job.category}</span>
                  <span className="job-amount" style={{ fontSize: '1.15rem', fontWeight: 800 }}>${job.budget.toLocaleString()}</span>
                </div>
                
                <h3 className="job-title" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.35 }}>{job.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>{job.desc}</p>
                
                <div className="skills-row" style={{ marginBottom: '1.5rem' }}>
                  {job.tags.map(tag => (
                    <span key={tag} className="tag tag-sm" style={{ background: 'var(--bg-dark)', border: '1px solid var(--outline)', color: 'var(--muted)', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>

                <div className="job-listing-footer" style={{ borderTop: '1px solid var(--outline)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--dark)' }}>{job.applicants} Applicants</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Posted {job.time}</span>
                  </div>
                  <button 
                    disabled={appliedJobs.has(job.id)}
                    className={`btn btn-sm ${appliedJobs.has(job.id) ? 'btn-ghost' : 'btn-teal'}`}
                    style={{ padding: '10px 20px', fontSize: '0.8rem' }}
                  >
                    {appliedJobs.has(job.id) ? '✓ Applied' : 'View Details →'}
                  </button>
                </div>
              </div>
            )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 2rem', background: 'var(--bg-warm)', borderRadius: '24px', border: '1px dashed var(--outline)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem', filter: 'grayscale(1)' }}>🔭</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>No projects match your search</h2>
                <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Try adjusting your filters or search keywords to find more opportunities.</p>
                <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="btn btn-teal">Reset all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="dashboard-modal-overlay" onClick={() => setSelectedJob(null)} style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', padding: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <span className="tag tag-sm" style={{ marginBottom: '1rem', background: 'rgba(168,85,247,0.1)', color: 'var(--primary)' }}>{selectedJob.category}</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{selectedJob.title}</h2>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}>${selectedJob.budget.toLocaleString()}</div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--muted)' }}>Description</h4>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--dark)' }}>{selectedJob.desc}</p>
              </div>
              <div style={{ width: '180px' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--muted)' }}>Project Info</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li style={{ fontSize: '0.85rem' }}><b>Posted:</b> {selectedJob.time}</li>
                  <li style={{ fontSize: '0.85rem' }}><b>Type:</b> Smart Contract</li>
                  <li style={{ fontSize: '0.85rem' }}><b>Experience:</b> Lead / Senior</li>
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setSelectedJob(null)} 
                className="btn btn-ghost" 
                style={{ flex: 1, height: '54px' }}
              >
                Back to List
              </button>
              <button 
                onClick={() => handleApply(selectedJob.id)}
                disabled={appliedJobs.has(selectedJob.id)}
                className="btn btn-teal" 
                style={{ flex: 2, height: '54px', fontSize: '1rem' }}
              >
                {appliedJobs.has(selectedJob.id) ? '✓ Application Sent' : 'Submit Proposal →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseJobs;
