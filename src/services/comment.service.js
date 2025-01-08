import axiosInstance from './api.config';

const COMMENT_API = '/comment-service/api/post_comments';  // 엔드포인트 수정

export const commentService = {
  // 부모 댓글 조회
  getComments: async (postId) => {
    try {
      const response = await axiosInstance.get(`${COMMENT_API}/${postId}/comments`);
      console.log('댓글 조회 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('댓글 조회 실패:', error);
      throw error;
    }
  },

  // 답글 조회
  getReplies: async (postId, parentId) => {
    try {
      const response = await axiosInstance.get(`${COMMENT_API}/${postId}/comments/${parentId}/replies`);
      console.log('답글 조회 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('답글 조회 실패:', error);
      throw error;
    }
  },

  // 댓글 작성
  addComment: async (postId, content, parentId = null) => {
    try {
      const commentData = {
        postId: postId,
        content: content,
        parentId: parentId
      };
      const response = await axiosInstance.post(`${COMMENT_API}/${postId}`, commentData);
      console.log('댓글 작성 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      throw error;
    }
  },

  // 댓글 수정
  updateComment: async (postId, commentId, content) => {
    try {
      const commentData = {
        postId: postId,
        content: content
      };
      const response = await axiosInstance.put(`${COMMENT_API}/${postId}/comments/${commentId}`, commentData);
      console.log('댓글 수정 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (postId, commentId) => {
    try {
      const response = await axiosInstance.delete(`${COMMENT_API}/${postId}/${commentId}`);
      console.log('댓글 삭제 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      throw error;
    }
  },

  // 댓글 좋아요
  likeComment: async (postId, commentId) => {
    try {
      const response = await axiosInstance.post(`${COMMENT_API}/${postId}/${commentId}/like`);
      console.log('댓글 좋아요 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('댓글 좋아요 실패:', error);
      throw error;
    }
  },

  // 댓글 좋아요 취소
  unlikeComment: async (postId, commentId) => {
    try {
      const response = await axiosInstance.delete(`${COMMENT_API}/${postId}/${commentId}/like`);
      console.log('댓글 좋아요 취소 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('댓글 좋아요 취소 실패:', error);
      throw error;
    }
  }
};