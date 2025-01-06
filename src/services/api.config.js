import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 수신을 위한 설정
  timeout: 5000,
  xhrFields: {
    withCredentials: true,
  },
  crossDomain: true,
});

// Request 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', config); // 요청 디버깅 로그
    return config;
  },
  error => {
    console.error('Request Error:', error); // 요청 에러 디버깅 로그
    return Promise.reject(error);
  }
);

// Response 인터셉터
axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', response); // 응답 디버깅 로그
    return response;
  },
  error => {
    console.error('Response Error:', error.response); // 응답 에러 디버깅 로그
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
