import React from 'react';
import './IconButton.css';

function IconButton({ icon: Icon, onClick, isActive, isLike }) {
  return (
    <button 
      className={`icon-button ${isActive ? 'active' : ''} ${isLike ? 'like' : ''}`}
      onClick={onClick}
    >
      <Icon fill={isActive ? (isLike ? "#ff4b4b" : "#ffeba7") : "currentColor"} />
    </button>
  );
}

export default React.memo(IconButton);