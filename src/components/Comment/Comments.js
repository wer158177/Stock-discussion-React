import React from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import './Comment.css';

const Comments = ({ postId, comments, onAddComment }) => {
  return (
    <div className="post-comments-section">
      <div className="comments-header">
        Comments ({comments.length})
      </div>
      <CommentList comments={comments} />
      <CommentInput postId={postId} onAddComment={onAddComment} />
    </div>
  );
};

export default Comments;