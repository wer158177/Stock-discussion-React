import axiosInstance from './api.config';

const POST_API = '/post-service/api/post/random';

export const postService = {
  // 게시물 목록 조회
  getPosts: async (page, size = 5) => {
    try {
      const response = await axiosInstance.get(
        `${POST_API}?page=${page}&size=${size}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Posts fetch error:', error);
      throw error;
    }
  },

  // 게시물 생성
  createPost: async postData => {
    try {
      const formData = new FormData();
      formData.append('content', postData.content);
      if (postData.image) {
        formData.append('image', postData.image);
      }

      const response = await axiosInstance.post(POST_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Post creation error:', error);
      throw error;
    }
  },

  // 게시물 좋아요/취소
  toggleLike: async postId => {
    try {
      const response = await axiosInstance.post(
        `${POST_API}/${postId}/like`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Like toggle error:', error);
      throw error;
    }
  },
};
