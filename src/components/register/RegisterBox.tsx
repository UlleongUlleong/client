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
        <SelectKeywords title="register" />
      </div>
      <div className="check-form">
        <div>
          <input type="radio" />
          <span>모두 동의합니다.</span>
        </div>
        <div className="check-detail">
          <div>
            <input type="radio" />
            <span>만 19세 이상입니다.</span>
          </div>
          <div>
            <input type="radio" />
            <span>개인정보 수집 및 이용 (필수)</span>
          </div>
        </div>
      </div>
      <div className="register-btn">
        <button type="button">회원가입하기</button>
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
  padding: 5% 10%;

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
    width: 80%;
  }

  .keywords-group {
    display: flex;
    justify-content: center;
    width: 80%;
    padding: 20px 0;
  }

  .check-form {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .check-detail {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 10px;
  }

  .register-btn {
    width: 80%;
    padding-top: 30px;
    padding-bottom: 10px;

    button {
      background: black;
      border-radius: 30px;
      width: 100%;
      padding: 10px 0;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background: #333;
      }

      &:active {
        background: #555;
      }
    }
  }
`;

export default RegisterBox;
