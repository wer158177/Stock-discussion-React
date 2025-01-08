import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true'
  },
  withCredentials: true,
  timeout: 5000,
});

const PUBLIC_PATHS = [
  '/user-service/api/auth/login',
  '/user-service/api/auth/register',
  '/user-service/api/auth/refresh'
];

axiosInstance.interceptors.request.use(
  config => {
    // 공개 API 경로 체크
    const isPublicPath = PUBLIC_PATHS.some(path => config.url.includes(path));
    if (isPublicPath) {
      console.log('🔓 공개 API 요청:', config.url);
      return config;
    }

    // OPTIONS 요청 처리
    if (config.method === 'options') {
      config.headers['Access-Control-Request-Method'] = 'POST, GET, DELETE, PUT';
      config.headers['Access-Control-Request-Headers'] = 'Content-Type, Authorization';
    }

    // 비공개 API 토큰 검증
    const accessToken = Cookies.get('ACCESS_TOKEN');
    console.log('🍪 ACCESS_TOKEN:', accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('🔑 Authorization 헤더:', config.headers.Authorization);
    } else {
      const refreshToken = Cookies.get('REFRESH_TOKEN');
      console.log('🔄 REFRESH_TOKEN 확인:', refreshToken);
      
      if (!refreshToken) {
        console.warn('⚠️ 토큰이 없습니다');
      }
    }

    return config;
  },
  error => {
    console.error('❌ 요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('📥 응답 데이터:', response.data);
    return response;
  },
  error => {
    console.error('❌ 응답 에러:', error.response?.status);
    if (error.response?.status === 401) {
      console.error('🚫 인증 실패');
      Cookies.remove('ACCESS_TOKEN');
      Cookies.remove('REFRESH_TOKEN');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;