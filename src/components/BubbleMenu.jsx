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
      className="bubble-item"
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
    <div className="bubble-menu-container">
      {/* Top Row */}
      <div className="bubble-row">
        {topRow.map((item, i) => (
          <div key={`top-${i}`}>
             <BubbleItem item={item} />
          </div>
        ))}
      </div>
      {/* Bottom Row */}
      <div className="bubble-row bubble-bottom-row">
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
