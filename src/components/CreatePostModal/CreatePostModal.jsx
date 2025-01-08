// CreatePostModal.jsx
import React, { useState } from 'react';
import './CreatePostModal.css';
import { postService } from '../../services/post.service';

const CreatePostModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashtagArray = hashtags
        .split(' ')
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.slice(1));

      const postData = {
        title,
        content,
        image,
        hashtags: hashtagArray
      };

      const response = await postService.createPost(postData);
      onSubmit(response);
      onClose();
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      // TODO: 에러 처리 (예: 알림 표시)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>투자 아이디어 공유</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요..."
            className="modal-input"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요..."
            className="modal-textarea"
          />
          <input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="#해시태그 입력 (예: #비트코인 #투자)"
            className="modal-input"
          />
          <div className="file-input-wrapper">
            <label className="file-input-label">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="file-input"
              />
              이미지 첨부
            </label>
            {image && <span className="file-name">{image.name}</span>}
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">취소</button>
            <button type="submit" className="submit-button">게시</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;