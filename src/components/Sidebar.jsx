import { Link, NavLink } from 'react-router-dom';
import '../assets/dashboard.css';

const Sidebar = ({ isFreelancer }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/" className="logo">De<span>Lance</span></Link>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">{isFreelancer ? 'Freelancer' : 'Client'}</div>
        <NavLink to={isFreelancer ? '/freelancer-dashboard' : '/client-dashboard'} end>
          <span className="nav-icon">📊</span> Overview
        </NavLink>
        <NavLink to="/browse-jobs">
          <span className="nav-icon">🔍</span> {isFreelancer ? 'Browse Jobs' : 'My Posts'}
        </NavLink>
        <NavLink to="/active-contracts">
          <span className="nav-icon">⛓️</span> Active Contracts
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-switch">
          <Link to={isFreelancer ? '/client-dashboard' : '/freelancer-dashboard'}>
            Switch to {isFreelancer ? 'Client' : 'Freelancer'} →
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
