import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import './Comment.css';
import { commentService } from '../../services/comment.service';

const Comments = ({ postId, onAddComment }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await commentService.getComments(postId);
        setComments(data || []); // data가 undefined면 빈 배열
      } catch (error) {
        console.error('댓글 로딩 실패:', error);
        setComments([]); // 에러 시 빈 배열
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (postId, content) => {
    try {
      if (replyingTo) {
        // 대댓글 작성
        const newReply = await commentService.addComment(postId, content, replyingTo);
        setComments(prev => prev.map(comment => 
          comment.id === replyingTo
            ? { 
                ...comment, 
                replies: [...(comment.replies || []), newReply]
              }
            : comment
        ));
        setReplyingTo(null);
      } else {
        // 일반 댓글 작성
        const newComment = await commentService.addComment(postId, content);
        setComments(prev => [newComment, ...prev]);
        if (onAddComment) onAddComment(newComment);
      }
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  if (loading) return <div>댓글 로딩중...</div>;

  return (
    <div className="comments-section">
      <CommentList 
        comments={comments} 
        postId={postId} 
        onReplyClick={(commentId) => setReplyingTo(commentId)} 
      />
      <CommentInput 
        postId={postId} 
        onAddComment={handleAddComment}
        placeholder={replyingTo ? "답글 작성하기..." : "댓글 작성하기..."}
      />
    </div>
  );
};

export default Comments;