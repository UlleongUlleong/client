import React from 'react';
import styled from 'styled-components';
import LoginBox from '../../login/LoginBox';

const Login = () => {
  return (
    <LoginStyle>
      <div className="container">
        <LoginBox />
      </div>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .container {
    width: 40%;
    min-width: 500px;
  }
`;

export default Login;
