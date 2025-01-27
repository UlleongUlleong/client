import React, { useEffect } from 'react';

const OauthCallback = () => {
  useEffect(() => {
    // 쿠키에서 특정 값을 가져오는 함수
    const getCookie = (name: string): string | null => {
      //   const cookieArr = document.cookie.split('; ');
      const cookieArr = document.cookie;
      console.log('쿠키들', cookieArr);
      for (const cookie of cookieArr) {
        const [key, value] = cookie.split('=');
        if (key === name) {
          return value;
        }
      }
      return null;
    };

    const accessToken = getCookie('access_token');

    if (accessToken) {
      console.log('Access Token:', accessToken);

      localStorage.setItem('accessToken', accessToken);
      window.location.href = '/';
    } else {
      console.error('쿠키에서 액세스 토큰을 찾을 수 없습니다.');
    }
  }, []);

  return <div>OAuth 인증 처리 중...</div>;
};

export default OauthCallback;
