import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    profileImage: null,
    imagePreview: null
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        profileImage: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const checkUsername = async () => {
    // API 호출 로직
    alert('사용 가능한 이름입니다.');
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    // 프로필 정보 업데이트 API 호출
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    // 비밀번호 변경 API 호출
  };

  return (
    <div className="page-container">
      <Header />
      <div className="profile-edit-container">
        <h2 className="profile-edit-title">프로필 수정</h2>
        
        {/* 기본 정보 폼 */}
        <form onSubmit={handleProfileSubmit} className="profile-edit-form">
          <div className="profile-image-section">
            <img 
              src={profile.imagePreview || '/images/default-profile.png'} 
              className="profile-image-preview"
            />
            <label htmlFor="profile-image" className="image-upload-button">
              이미지 업로드
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="profile-image-input"
            />
          </div>

          <div className="profile-edit-form-group">
            <label className="profile-edit-label">이름</label>
            <div className="username-check-group">
              <input
                className="profile-edit-input"
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({...profile, username: e.target.value})}
              />
              <button type="button" onClick={checkUsername} className="check-button">
                중복확인
              </button>
            </div>
          </div>

          <div className="profile-edit-form-group">
            <label className="profile-edit-label">자기소개</label>
            <textarea
              className="profile-edit-input bio-input"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
            />
          </div>

          <button type="submit" className="profile-edit-button">
            프로필 저장
          </button>
        </form>

        {/* 비밀번호 변경 버튼 */}
        <button 
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="password-change-button"
        >
          비밀번호 변경
        </button>

        {/* 비밀번호 변경 폼 */}
        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="profile-edit-form-group">
              <label className="profile-edit-label">현재 비밀번호</label>
              <input
                type="password"
                className="profile-edit-input"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              />
            </div>
            <div className="profile-edit-form-group">
              <label className="profile-edit-label">새 비밀번호</label>
              <input
                type="password"
                className="profile-edit-input"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              />
            </div>
            <div className="profile-edit-form-group">
              <label className="profile-edit-label">새 비밀번호 확인</label>
              <input
                type="password"
                className="profile-edit-input"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              />
            </div>
            <button type="submit" className="profile-edit-button">
              비밀번호 변경
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfileEdit;