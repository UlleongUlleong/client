import React from 'react';
import styled from 'styled-components';
import { oauthLogin } from '../../api/users/loginApi';
// import { oauthLogin } from '../../api/users/loginApi';
// import { toast } from 'react-toastify';
// import { GoAlert, GoCheckCircle } from 'react-icons/go';

const OauthLogin = () => {
  const handleOauthLogin = async (provider: string) => {
    try {
      await oauthLogin({ provider });
    } catch (error) {
      console.error(`${provider} OAuth login failed:`, error);
    }
  };

  return (
    <OauthLoginStyle>
      <div className="oauth-container">
        <button onClick={() => handleOauthLogin('google')}>
          <img
            className="google"
            src="src/assets/images/google-icon.png"
            alt="Google Login"
          />
        </button>
        <button onClick={() => handleOauthLogin('kakao')}>
          <img src="src/assets/images/kakao-icon.png" alt="Kakao Login" />
        </button>
        <button onClick={() => handleOauthLogin('naver')}>
          <img src="src/assets/images/naver-icon.png" alt="Naver Login" />
        </button>
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

  button {
    background: white;
    border: none;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default OauthLogin;
