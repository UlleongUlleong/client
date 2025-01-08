import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import Divider from './Divider';
import OauthLogin from './OauthLogin';

const LoginBox = () => {
  return (
    <LoginBoxStyle>
      <div className="logo">
        <img className="logo-img" src="src/assets/images/logo.png" />
      </div>
      <h1>login</h1>
      <div className="login-form">
        <LoginForm />
      </div>
      <div className="divider">
        <Divider />
      </div>
      <OauthLogin />
    </LoginBoxStyle>
  );
};

const LoginBoxStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow:
    0px 4px 6px rgba(0, 0, 0, 0.1),
    0px 1px 3px rgba(0, 0, 0, 0.06);
  padding: 40px 0;

  h1 {
    padding: 40px 0;
  }

  .logo-img {
    width: 150px;
    height: auto;
  }

  .login-form {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .divider {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default LoginBox;
