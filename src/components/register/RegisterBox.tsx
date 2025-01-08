import React from 'react';
import styled from 'styled-components';
import RegisterForm from './RegisterForm';
import SelectKeywords from '../create-room/SelectKeywords';

const RegisterBox = () => {
  return (
    <RegisterBoxStyle>
      <div className="logo">
        <img className="logo-img" src="src/assets/images/logo.png" />
      </div>
      <h1>회원가입</h1>
      <div className="register-form">
        <RegisterForm />
      </div>
      <div className="keywords-group">
        <SelectKeywords />
      </div>
    </RegisterBoxStyle>
  );
};

const RegisterBoxStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow:
    0px 4px 6px rgba(0, 0, 0, 0.1),
    0px 1px 3px rgba(0, 0, 0, 0.06);
  padding: 4%;

  h1 {
    padding: 40px 0;
  }

  .logo-img {
    width: 150px;
    height: auto;
  }

  .register-form {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .keywords-group {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export default RegisterBox;
