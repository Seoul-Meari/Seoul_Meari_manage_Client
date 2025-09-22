// api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // 기본 서버 주소
  timeout: 10000, // 요청 제한 시간 (ms)
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 예: 토큰 자동 추가
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예: 401 처리
    if (error.response?.status === 401) {
      console.error('인증 만료. 다시 로그인 필요');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;