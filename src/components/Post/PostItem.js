import React, { memo, useState } from 'react';
import { HeartIcon, CommentIcon, ShareIcon } from '../Icons/PostIcons';
import Comments from '../Comment/Comments';
import UserProfileModal from '../UserProfileModal/UserProfileModal';
import './Post.css';

const PostItem = ({
  post,
  onLike,
  liked,
  onAddComment,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0); // 댓글 수 상태 추가
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    console.log('Post data:', post);
    if (post.username) {  // id 대신 username 확인
      setShowProfile(true);
    }
  };

  return (
    <div className='post'>
      <div className='post-content-section'>
        <div className='post-header'>
          <div className='user-info' onClick={handleProfileClick}>
            <img 
              src={`/images/${post.userImage}`} 
              alt='' 
              className='user-avatar' 
            />
            <div className='header-text'>
              <span className='username'>{post.username}</span>
              <span className='timestamp'>{post.timestamp}</span>
            </div>
          </div>
        </div>

        <div className='post-content'>
          <p>{post.content}</p>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className='tags-container'>
              {post.hashtags.map((tag, index) => (
                <span key={index} className='tag'>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.image && (
          <div className='post-image'>
            <img src={`/images/${post.image}`} alt='' loading='lazy' />
          </div>
        )}

        <div className='post-stats'>
          <span>
            {post.likes} Likes • {commentCount} Comments
          </span>
        </div>

        <div className='post-actions'>
          <button
            className={`action-button ${liked ? 'active-like' : ''}`}
            onClick={() => onLike(post.id)}
          >
            <HeartIcon filled={liked} />
            <span className='action-text'>Like</span>
          </button>
          <button
            className='action-button'
            onClick={() => setShowComments(!showComments)}
          >
            <CommentIcon />
            <span className='action-text'>Comment</span>
          </button>
          <button className='action-button'>
            <ShareIcon />
            <span className='action-text'>Share</span>
          </button>
        </div>
      </div>

      {showComments && (
        <Comments
          postId={post.id}
          onAddComment={(comment) => {
            onAddComment(comment);
            setCommentCount(prev => prev + 1);
          }}
        />
      )}

      {showProfile && post.username && (
        <UserProfileModal 
          username={post.username}  // id 대신 username 전달
          onClose={() => setShowProfile(false)} 
        />
      )}
    </div>
  );
};

export default memo(PostItem);