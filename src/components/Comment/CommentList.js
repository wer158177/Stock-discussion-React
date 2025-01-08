import React, { useState } from 'react';
import { HeartIcon } from '../Icons/PostIcons';
import { formatDate } from '../../utils/dateUtils';
import { commentService } from '../../services/comment.service';
import CommentInput from './CommentInput';
import UserProfileModal from '../UserProfileModal/UserProfileModal';

const CommentList = ({ comments: initialComments, postId, onReplyClick }) => {
  const [visibleComments, setVisibleComments] = useState(3);
  const [comments, setComments] = useState(initialComments);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReplies, setShowReplies] = useState(null);

  const handleLike = async (postId, commentId, isReply = false, parentId = null) => {
    try {
      let targetComment;
      if (isReply) {
        // 대댓글 찾기
        const parentComment = comments.find(c => c.id === parentId);
        targetComment = parentComment.replies.find(r => r.id === commentId);
      } else {
        // 일반 댓글 찾기
        targetComment = comments.find(c => c.id === commentId);
      }

      if (targetComment.liked) {
        await commentService.unlikeComment(postId, commentId);
      } else {
        await commentService.likeComment(postId, commentId);
      }
      
      // 상태 업데이트
      setComments(prev => prev.map(comment => {
        if (isReply && comment.id === parentId) {
          // 대댓글 상태 업데이트
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === commentId
                ? {
                    ...reply,
                    liked: !reply.liked,
                    likeCount: reply.liked ? reply.likeCount - 1 : reply.likeCount + 1
                  }
                : reply
            )
          };
        } else if (!isReply && comment.id === commentId) {
          // 일반 댓글 상태 업데이트
          return {
            ...comment,
            liked: !comment.liked,
            likeCount: comment.liked ? comment.likeCount - 1 : comment.likeCount + 1
          };
        }
        return comment;
      }));
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  const handleUserClick = (username) => {
    setShowUserProfile(true);
    setSelectedUsername(username);
  };

  const showMoreComments = () => {
    setVisibleComments(prev => prev + 3);
  };

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  const handleReplyClick = async (commentId) => {
    try {
      if (showReplies === commentId) {
        setShowReplies(null);
      } else {
        const replies = await commentService.getReplies(postId, commentId);
        setComments(prev => prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, replies: replies }
            : comment
        ));
        setShowReplies(commentId);
      }
      onReplyClick(showReplies === commentId ? null : commentId);
    } catch (error) {
      console.error('답글 조회 실패:', error);
    }
  };

  const handleAddReply = async (commentId, content) => {
    try {
      const newReply = await commentService.addComment(postId, content, commentId);
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              replies: [...(comment.replies || []), newReply]
            }
          : comment
      ));
      setReplyingTo(null);
    } catch (error) {
      console.error('답글 작성 실패:', error);
    }
  };

  return (
    <div className="comments-list" onScroll={handleScroll}>
      {comments.slice(0, visibleComments).map(comment => (
        <div key={comment.id} className="comment-content">
          <div className="comment-header">
            <img 
              src={comment.userImage || '/default-profile.png'} 
              alt="" 
              className="comment-avatar"
              onClick={() => handleUserClick(comment.username)}
              style={{ cursor: 'pointer' }}
            />
            <span 
              className="comment-username"
              onClick={() => handleUserClick(comment.username)}
            >
              {comment.username}
              {showUserProfile && selectedUsername === comment.username && (
                <div className="user-profile-modal">
                  <UserProfileModal
                    username={selectedUsername}
                    onClose={() => setShowUserProfile(false)}
                  />
                </div>
              )}
            </span>
            <span className="comment-timestamp">{formatDate(comment.createdAt)}</span>
          </div>
          <div className="comment-text-container">
            <p className="comment-text">{comment.content}</p>
            <button 
              className={`comment-like-button ${comment.liked ? 'active' : ''}`}
              onClick={() => handleLike(postId, comment.id)}
            >
              <HeartIcon filled={comment.liked} />
              <span>{comment.likeCount}</span>
            </button>
          </div>
          <div className="comment-actions">
            <button 
              className="comment-reply-button"
              onClick={() => handleReplyClick(comment.id)}
            >
             답글 더보기
            </button>
          </div>
          {replyingTo === comment.id && (
            <CommentInput 
              postId={postId}
              parentId={comment.id}
              onAddComment={(_, content) => handleAddReply(comment.id, content)}
            />
          )}
          {comment.replies && comment.replies.length > 0 && showReplies === comment.id && (
            <div className="comment-replies">
              {comment.replies.map(reply => (
                <div key={reply.id} className="comment-item reply">
                  <img 
                    src={reply.userImage || '/default-profile.png'} 
                    alt="" 
                    className="comment-avatar"
                    onClick={() => handleUserClick(reply.username)}
                  />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span 
                        className="comment-username"
                        onClick={() => handleUserClick(reply.username)}
                      >
                        {reply.username}
                        {showUserProfile && selectedUsername === reply.username && (
                          <div className="user-profile-modal">
                            <UserProfileModal
                              username={selectedUsername}
                              onClose={() => setShowUserProfile(false)}
                            />
                          </div>
                        )}
                      </span>
                      <span className="comment-timestamp">{formatDate(reply.createdAt)}</span>
                    </div>
                    <div className="comment-text-container">
                      <p className="comment-text">{reply.content}</p>
                      <button 
                        className={`comment-like-button ${reply.liked ? 'active' : ''}`}
                        onClick={() => handleLike(postId, reply.id, true, comment.id)}
                      >
                        <HeartIcon filled={reply.liked} />
                        <span>{reply.likeCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
      {showUserProfile && selectedUsername && (
        <UserProfileModal
          username={selectedUsername}
          onClose={() => setShowUserProfile(false)}
        />
      )}
    </div>
  );
};

export default React.memo(CommentList);