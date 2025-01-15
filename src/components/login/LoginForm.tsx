import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginForm = () => {
  return (
    <LoginFormStyle>
      <form>
        <input
          className="login"
          type="text"
          placeholder="이메일을 입력하세요"
        />
        <input
          className="login"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </form>
      <div className="login-options">
        <div className="stay-logged-group">
          <input className="radio" type="radio" id="stay-logged-radio" />
          <label htmlFor="stay-logged-radio">로그인 유지</label>
        </div>
        <Link to="/">
          <span className="find-pwd">비밀번호 찾기</span>
        </Link>
      </div>
      <button type="button" onClick={() => {}}>
        이메일로 로그인
      </button>
      <span className="register">회원가입</span>
    </LoginFormStyle>
  );
};

const LoginFormStyle = styled.div`
  width: 60%;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .login {
    padding: 8px;
    width: 100%;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
    margin-bottom: 18px;

    .stay-logged-group {
      display: flex;
      align-items: center;
      gap: 4px;

      .radio {
        width: 14px;
        height: 14px;
      }

      label {
        font-size: 0.9rem;
        color: black;
      }
    }

    .find-pwd {
      font-size: 0.9rem;
      color: #9b9b9b;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }
  }

  button {
    width: 100%;
    border: none;
    border-radius: 30px;
    background: black;
    color: white;
    font-size: 1rem;
    padding: 10px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background: #333;
    }

    &:active {
      background: #555;
    }
  }

  .register {
    display: block;
    margin-top: 20px;
    text-align: center;
    font-size: 0.9rem;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
`;

export default LoginForm;
