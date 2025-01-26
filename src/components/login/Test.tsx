import React, { useEffect } from 'react';
import styled from 'styled-components';
import { testApi } from '../../api/users/loginApi';

const Test = () => {
  useEffect(() => {
    const cookieArr = document.cookie;
    console.log('쿠키들', cookieArr);
    // 쿠키에서 특정 값을 가져오는 함수
    // const getCookie = (name: string): string | null => {
    //   //   const cookieArr = document.cookie.split('; ');
    //   const cookieArr = document.cookie;
    //   console.log('쿠키들', cookieArr);
    //   for (const cookie of cookieArr) {
    //     const [key, value] = cookie.split('=');
    //     if (key === name) {
    //       return value;
    //     }
    //   }
    //   return null;
    // };

    // const accessToken = getCookie('access_token');

    // if (accessToken) {
    //   console.log('Access Token:', accessToken);

    //   localStorage.setItem('accessToken', accessToken);
    //   window.location.href = '/';
    // } else {
    //   console.error('쿠키에서 액세스 토큰을 찾을 수 없습니다.');
    // }
  }, []);
  const handleTest = async () => {
    const res = testApi();
    console.log(res);
  };
  return (
    <TestStyle>
      <button onClick={handleTest}>버튼</button>
    </TestStyle>
  );
};

const TestStyle = styled.div``;

export default Test;
