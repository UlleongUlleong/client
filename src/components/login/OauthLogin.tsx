import React from 'react';
import styled from 'styled-components';

const OauthLogin = () => {
  return (
    <OauthLoginStyle>
      <div className="oauth-container">
        <img
          className="google"
          src="src/assets/images/google-icon.png"
          alt="Google Login"
        />
        <img src="src/assets/images/kakao-icon.png" alt="Kakao Login" />
        <img src="src/assets/images/naver-icon.png" alt="Naver Login" />
      </div>
    </OauthLoginStyle>
  );
};

const OauthLoginStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .oauth-container {
    width: 50%;
    max-width: 300px;
    min-width: 200px;
    display: flex;
    justify-content: space-around;
  }

  .google {
    padding: 3px;
  }
  img {
    width: 35px;
    height: auto;
  }
`;

export default OauthLogin;
