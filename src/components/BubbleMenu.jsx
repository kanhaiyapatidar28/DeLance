import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BubbleItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
    } else {
      if (item.category) {
        navigate(`/browse-jobs?category=${item.category}`);
      } else if (item.href && item.href !== '#') {
        navigate(item.href);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      aria-label={item.ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `rotate(${isHovered ? 0 : item.rotation || 0}deg) scale(${isHovered ? 1.05 : 1})`,
        backgroundColor: isHovered && item.hoverStyles ? item.hoverStyles.bgColor : '#ffffff',
        color: isHovered && item.hoverStyles ? item.hoverStyles.textColor : '#111111',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: isHovered ? 10 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 2.25rem',
        borderRadius: '100px',
        fontSize: '1.1rem',
        lineHeight: '1.2',
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: '"Inter", sans-serif',
        letterSpacing: '-0.02em',
        textDecoration: 'none',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {item.label}
    </div>
  );
};

const BubbleMenu = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  const mid = Math.ceil(items.length / 2);
  const topRow = items.slice(0, mid);
  const bottomRow = items.slice(mid);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '0.5rem', padding: '1rem 0' }}>
      {/* Top Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.8rem' }}>
        {topRow.map((item, i) => (
          <div key={`top-${i}`}>
             <BubbleItem item={item} />
          </div>
        ))}
      </div>
      {/* Bottom Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.8rem', marginTop: '-0.4rem', marginLeft: '4.5rem' }}>
        {bottomRow.map((item, i) => (
          <div key={`bottom-${i}`}>
             <BubbleItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleMenu;
