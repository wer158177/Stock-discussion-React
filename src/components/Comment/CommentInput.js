import React, { useState } from 'react';

const CommentInput = ({ postId, parentId, onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(postId, comment, parentId);
      setComment('');
    }
  };

  return (
    <form className="comment-input-wrapper" onSubmit={handleSubmit}>
      <input
        type="text"
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
    </form>
  );
};

export default React.memo(CommentInput);