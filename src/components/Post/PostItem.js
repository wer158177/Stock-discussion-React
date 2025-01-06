import React, { memo, useState } from 'react';
import { HeartIcon, CommentIcon, ShareIcon } from '../Icons/PostIcons';
import Comments from '../Comment/Comments';
import './Post.css';

const PostItem = ({
  post,
  onLike,
  onBookmark,
  liked,
  bookmarked,
  isLike,
  onAddComment,
}) => {
  const [showComments, setShowComments] = useState(false);

  // 태그 추출 로직
  const extractTags = content => {
    const tagRegex = /#[^\s#]+/g;
    const tags = content.match(tagRegex) || [];
    const contentWithoutTags = content.replace(tagRegex, '').trim();
    return { tags, contentWithoutTags };
  };

  const { tags, contentWithoutTags } = extractTags(post.content);

  return (
    <div className='post'>
      <div className='post-content-section'>
        <div className='post-header'>
          <div className='user-info'>
            <img src={post.userImage} alt='' className='user-avatar' />
            <div className='header-text'>
              <span className='username'>{post.username}</span>
              <span className='timestamp'>{post.timestamp}</span>
            </div>
          </div>
        </div>

        <div className='post-content'>
          <p>{contentWithoutTags}</p>
          {tags.length > 0 && (
            <div className='tags-container'>
              {tags.map((tag, index) => (
                <span key={index} className='tag'>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.image && (
          <div className='post-image'>
            <img src={post.image} alt='' loading='lazy' />
          </div>
        )}

        <div className='post-stats'>
          <span>
            {post.likes} Likes • {post.comments.length} Comments
          </span>
          <span>{post.shares} Shares</span>
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
          comments={post.comments}
          onAddComment={onAddComment}
        />
      )}
    </div>
  );
};

export default memo(PostItem);
