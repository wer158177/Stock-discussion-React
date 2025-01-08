import axiosInstance from './api.config';

const USER_API = '/user-service/api';

export const userService = {
  getUserInfo: async (username) => {
    try {
      console.log(`Fetching user info for username: ${username}`);
      const response = await axiosInstance.get(`${USER_API}/user/info/${username}`);
      console.log('User info response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get user info error:', error);
      throw error;
    }
  },
  
  followUser: async (followingId) => {
    try {
      console.log(`Following user with id: ${followingId}`);
      const response = await axiosInstance.post(`${USER_API}/following/${followingId}/follow`);
      console.log('Follow response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Follow error:', error);
      throw error;
    }
  },

  unfollowUser: async (followingId) => {
    try {
      console.log(`Unfollowing user with id: ${followingId}`);
      const response = await axiosInstance.delete(`${USER_API}/following/${followingId}/unfollow`);
      console.log('Unfollow response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Unfollow error:', error);
      throw error;
    }
  }
};