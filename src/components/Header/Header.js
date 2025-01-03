import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: '새로운 알림이 있습니다.', isRead: false },
    { id: 2, message: '주가가 5% 상승했습니다.', isRead: false }
  ]);

  return (
    <header className="header">
      <nav className="header-nav">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
        </ul>
      </nav>
      <div className="header-right">
        <div className="notification-container">
          <button 
            className="notification-button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FontAwesomeIcon icon={faBell} className="bell-icon" />
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="notification-badge">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    {notification.message}
                  </div>
                ))
              ) : (
                <div className="notification-empty">
                  알림이 없습니다
                </div>
              )}
            </div>
          )}
        </div>
        <div className="menu-container">
          <button 
            className="profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            ☰ 메뉴
          </button>
          {showDropdown && (
            <div className="profile-dropdown">
              <Link to="/profile/edit" className="dropdown-item">
                내 정보
              </Link>
              <Link to="/settings" className="dropdown-item">
                설정
              </Link>
              <button className="dropdown-item">로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;