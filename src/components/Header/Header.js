import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { alarmService } from '../../services/alarm.service';
import { getUserIdFromCookie } from '../../utils/auth';
import './Header.css';

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userId = getUserIdFromCookie();
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    console.log('Current pathname:', location.pathname); // 디버깅용
    console.log('isLoginPage:', isLoginPage); // 디버깅용
    console.log('userId:', userId); // 디버깅용

    let eventSource = null;
    let retryCount = 0;
    const maxRetries = 3;

    const connectAlarmService = () => {
      if (!userId || isLoginPage) return; // isLoginPage 체크 추가
      
      try {
        console.log('알람 서비스 연결 시도... userId:', userId);
        eventSource = alarmService.subscribeToAlarms(
          userId,
          (newAlarm) => {
            console.log('새로운 알람 수신:', newAlarm);
            setNotifications(prev => [...prev, {
              id: Date.now(),
              message: newAlarm.content, // content만 추출
              isRead: false
            }]);
            setConnectionError(false);
            retryCount = 0;
          }
        );

        eventSource.onerror = (error) => {
          console.error('알람 서비스 연결 에러:', error);
          eventSource.close();
          setConnectionError(true);

          if (retryCount < maxRetries) {
            console.log(`재연결 시도 ${retryCount + 1}/${maxRetries}...`);
            retryCount++;
            setTimeout(connectAlarmService, 3000); // 3초 후 재시도
          }
        };
      } catch (error) {
        console.error('알람 서비스 초기화 실패:', error);
        setConnectionError(true);
      }
    };

    connectAlarmService();

    return () => {
      if (eventSource) {
        console.log('알람 서비스 연결 종료');
        eventSource.close();
      }
    };
  }, [userId, isLoginPage, location.pathname]); // location.pathname 의존성 추가


  return (
    <header className='header'>
      {isLoginPage ? (
        <div className='header-logo'>
          <Link to='/' className='logo'>
            Stock
          </Link>
        </div>
      ) : (
        <>
          <nav className='header-nav'>
            <ul>
              <li>
                <Link to='/home'>Home</Link>
              </li>
              <li>
                <Link to='/'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Sign Up</Link>
              </li>
            </ul>
          </nav>
          <div className='header-right'>
            <div className='notification-container'>
              <button
                className='notification-button'
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FontAwesomeIcon icon={faBell} className='bell-icon' />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className='notification-badge'>
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className='notification-dropdown'>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className='notification-item'>
                        {notification.message}
                      </div>
                    ))
                  ) : (
                    <div className='notification-empty'>알림이 없습니다</div>
                  )}
                </div>
              )}
            </div>
            <div className='menu-container'>
              <button
                className='profile-button'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                ☰ 메뉴
              </button>
              {showDropdown && (
                <div className='profile-dropdown'>
                  <Link to='/profile/edit' className='dropdown-item'>
                    내 정보
                  </Link>
                  <Link to='/settings' className='dropdown-item'>
                    설정
                  </Link>
                  <button className='dropdown-item'>로그아웃</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
