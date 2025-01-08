import React, { useState, useEffect } from 'react';
import { userService } from '../../services/user.service';
import './UserProfileModal.css';

const UserProfileModal = ({ username, onClose }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userService.getUserInfo(username);
        setUserInfo(data);
        setIsFollowing(data.following); // following 상태 초기화
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    fetchUserInfo();
  }, [username]);

  const handleFollow = async () => {
    try {
      if (!userInfo) return;
      
      if (isFollowing) {
        await userService.unfollowUser(userInfo.id);
      } else {
        await userService.followUser(userInfo.id);
      }
      setIsFollowing(!isFollowing);
      
      // 팔로워 카운트 업데이트를 위해 유저 정보 다시 가져오기
      const updatedData = await userService.getUserInfo(username);
      setUserInfo(updatedData);
      
    } catch (error) {
      console.error('Failed to follow/unfollow user:', error);
    }
  };

  if (!userInfo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="user-profile-header">
          <img 
            src={userInfo.imageUrl || '/default-profile.png'} 
            alt="" 
            className="profile-image" 
          />
          <h2>{userInfo.username}</h2>
          {userInfo.intro && (
            <p className="user-intro">{userInfo.intro}</p>
          )}
        </div>
        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-label">팔로워</span>
            <span className="stat-value">{userInfo.followerCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">팔로잉</span>
            <span className="stat-value">{userInfo.followingCount}</span>
          </div>
        </div>
        <button 
          className={`follow-button ${isFollowing ? 'following' : ''}`}
          onClick={handleFollow}
        >
          {isFollowing ? '팔로잉 취소' : '팔로우'}
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;