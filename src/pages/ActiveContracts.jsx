import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import '../assets/dashboard.css';

const ActiveContracts = () => {
  const { user } = useAuth();
  const [contracts] = useState([
    { 
      id: 1, 
      title: 'DEX Liquidity Module', 
      client: 'Uniswap Labs', 
      budget: 8500, 
      progress: 65, 
      milestones: 4, 
      nextMilestone: 'Integration Testing',
      status: 'In Progress'
    },
    { 
      id: 2, 
      title: 'EVM Compatibility Layer', 
      client: 'Polygon Foundation', 
      budget: 12000, 
      progress: 20, 
      milestones: 6, 
      nextMilestone: 'Gas Optimization',
      status: 'Designing'
    }
  ]);

  return (
    <div className="app-layout">
      <Sidebar isFreelancer={true} />
      <div className="main-content">
        <header className="page-header">
          <div>
            <div className="label">Engagement Terminal</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Active Contracts</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="network-badge"><span className="wallet-dot"></span> Polygon</div>
            <div className="wallet-badge"><span className="wallet-dot"></span><span className="mono" style={{ fontSize: '0.78rem' }}>0xA8b...9d12</span></div>
          </div>
        </header>

        <div className="page-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {contracts.map(contract => (
              <div key={contract.id} className="card" style={{ padding: '2rem' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '4px' }}>{contract.title}</h3>
                    <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Client: <b>{contract.client}</b> · {contract.status}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}>${contract.budget.toLocaleString()}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Escrow</div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Overall Progress</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>{contract.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-dark)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ width: `${contract.progress}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px rgba(168,85,247,0.3)' }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--outline)', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Milestones</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{contract.milestones} Completed</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Next Phase</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{contract.nextMilestone}</div>
                    </div>
                  </div>
                  <button className="btn btn-teal btn-sm">Manage Work →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveContracts;
