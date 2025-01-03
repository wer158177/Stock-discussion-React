import React, { useState } from 'react';
import { HeartIcon } from '../Icons/PostIcons';

const CommentList = ({ comments: initialComments, onAddComment }) => {
  const [visibleComments, setVisibleComments] = useState(3);
  const [comments, setComments] = useState(initialComments.map(comment => ({
    ...comment,
    likes: Math.floor(Math.random() * 50),
    isLiked: false
  })));

  // 댓글 관련 상태와 핸들러는 유지
  const handleLike = (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const showMoreComments = () => {
    setVisibleComments(prev => prev + 3);
  };

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="comments-list" onScroll={handleScroll}>
      {/* 입력창 제거 - CommentInput 컴포넌트에서 처리 */}
      {comments.slice(0, visibleComments).map(comment => (
        <div key={comment.id} className="comment-item">
          <img src={comment.userImage} alt="" className="comment-avatar" />
          <div className="comment-content">
            <div className="comment-header">
              <span className="comment-username">{comment.username}</span>
              <span className="comment-timestamp">{comment.timestamp}</span>
            </div>
            <p className="comment-text">{comment.text}</p>
            <div className="comment-actions">
              <button 
                className={`comment-like-button ${comment.isLiked ? 'active' : ''}`}
                onClick={() => handleLike(comment.id)}
              >
                <HeartIcon filled={comment.isLiked} />
                <span>{comment.likes}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {visibleComments < comments.length && (
        <button 
          className="comment-load-more"
          onClick={showMoreComments}
        >
          댓글 더보기 ({comments.length - visibleComments}개)
        </button>
      )}
    </div>
  );
};

export default React.memo(CommentList);