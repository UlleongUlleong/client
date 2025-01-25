// import React from 'react';
// import { useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';

// const OauthCallback = () => {
//   console.log('들어옴');
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const authCode = searchParams.get('code');
//     console.log('인증코드', authCode);
//     if (authCode) {
//       axios
//         .post('/api/auth/google', {
//           code: authCode, // 백엔드에 전달할 데이터
//         })
//         .then((response) => {
//           const accessToken = response.data.access_token; // 백엔드 응답에서 액세스 토큰 추출
//           console.log('Access Token', accessToken);
//           // 필요시 성공시 처리 코드 추가해야됨
//         })
//         .catch((error) => {
//           console.error('Error', error);
//         });
//     } else {
//       console.error('No auth code found in URL');
//     }
//   }, [searchParams]);

//   return (
//     <OauthCallbackStyle>
//       <h1>로그인 처리중...</h1>
//     </OauthCallbackStyle>
//   );
// };

// const OauthCallbackStyle = styled.div``;

// export default OauthCallback;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OauthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드에서 사용자 정보를 가져오기
    axios
      .get('http://localhost:5000/auth/user', { withCredentials: true })
      .then((response) => {
        console.log('User Data:', response.data);
        // 사용자 정보를 상태로 저장하거나 대시보드로 이동
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
        navigate('/login'); // 로그인 실패 시 로그인 페이지로 이동
      });
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OauthCallback;
