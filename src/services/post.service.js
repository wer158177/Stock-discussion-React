import axiosInstance from './api.config';

const POST_API = '/post-service/api/post';

export const postService = {
  getPosts: async (page = 0, size = 10) => {
    try {
      console.log(`Fetching posts for page ${page}`);
      const response = await axiosInstance.get(`${POST_API}/random`, {
        params: { page, size }
      });
      console.log('Posts response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Posts fetch error:', error);
      throw error;
    }
  },

  createPost: async postData => {
    try {
      const postBody = {
        title: postData.title,
        content: postData.content,
        tags: postData.hashtags,
        image: null
      };

      const response = await axiosInstance.post(`${POST_API}/write`, postBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Post creation error:', error);
      throw error;
    }
  },
  likePost: async postId => {
    try {
      console.log(`Liking post: ${postId}`);
      const response = await axiosInstance.post(
        `${POST_API}/${postId}/like`
      );
      return response.data;
    } catch (error) {
      console.error('Like post error:', error);
      throw error;
    }
  },

  unlikePost: async postId => {
    try {
      console.log(`Unliking post: ${postId}`);
      const response = await axiosInstance.delete(
        `${POST_API}/${postId}/like`
      );
      return response.data;
    } catch (error) {
      console.error('Unlike post error:', error);
      throw error;
    }
  }
};