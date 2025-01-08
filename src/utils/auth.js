import { jwtDecode } from 'jwt-decode';

const getTokenFromCookie = () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
  console.log('모든 쿠키:', cookies);
  
  if (!tokenCookie) {
    console.log('쿠키에서 토큰을 찾을 수 없음');
    return null;
  }

  const token = tokenCookie.split('=')[1];
  console.log('쿠키에서 찾은 토큰:', token);
  return token;
};

export const getUserIdFromToken = () => {
  console.log('=== JWT 디코딩 시작 ===');
  
  const token = getTokenFromCookie();
  console.log('쿠키에서 가져온 토큰:', token ? '토큰 존재' : '토큰 없음');
  
  if (!token) {
    console.log('토큰이 없어서 종료');
    return null;
  }
  
  try {
    console.log('토큰 디코딩 시도...');
    console.log('원본 토큰:', token);
    
    const decoded = jwtDecode(token);
    console.log('디코딩된 토큰 데이터:', decoded);
    console.log('추출된 userId:', decoded.userId);
    
    return decoded.userId;
  } catch (error) {
    console.error('=== JWT 디코딩 실패 ===');
    console.error('에러 타입:', error.name);
    console.error('에러 메시지:', error.message);
    console.error('스택 트레이스:', error.stack);
    return null;
  }
};

export const getUserIdFromCookie = () => {
  const cookies = document.cookie.split(';');
  const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('userId='));
  
  if (!userIdCookie) {
    console.log('userId 쿠키를 찾을 수 없음');
    return null;
  }

  const userId = userIdCookie.split('=')[1];
  console.log('쿠키에서 찾은 userId:', userId);
  return userId;
};