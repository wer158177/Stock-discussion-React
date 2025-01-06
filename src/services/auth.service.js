import axiosInstance from './api.config';

const AUTH_API = '/user-service/api/user';

export const authService = {
  // 로그인 요청
  login: async credentials => {
    try {
      const response = await axiosInstance.post(
        `${AUTH_API}/login`,
        credentials,
        {
          withCredentials: true, // 쿠키 수신을 위한 설정
        }
      );

      console.log('Login Response:', response); // 디버깅 로그

      // 응답 그대로 반환
      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response || error); // 디버깅 로그
      throw error; // 에러를 호출한 쪽으로 전달
    }
  },

  // 인증 상태 확인
  checkAuthStatus: async () => {
    try {
      const response = await axiosInstance.get(`${AUTH_API}/status`, {
        withCredentials: true,
      });

      console.log('Auth Status Response:', response); // 디버깅 로그
      return response.data;
    } catch (error) {
      console.error('Auth status check failed:', error.response || error); // 디버깅 로그
      return { isAuthenticated: false };
    }
  },

  // 회원가입 요청
  register: async userData => {
    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      if (userData.intro) formData.append('intro', userData.intro);
      if (userData.imageFile) formData.append('imageFile', userData.imageFile);
      formData.append('admin', userData.admin || false);
      formData.append('adminToken', userData.adminToken || '');

      const response = await axiosInstance.post(
        `${AUTH_API}/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      console.log('Register Response:', response); // 디버깅 로그
      return response.data;
    } catch (error) {
      console.error('Register Error:', error.response || error); // 디버깅 로그
      throw error; // 에러를 호출한 쪽으로 전달
    }
  },
};
