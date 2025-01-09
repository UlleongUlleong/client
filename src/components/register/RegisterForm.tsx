import React from 'react';
import styled from 'styled-components';

const RegisterForm = () => {
  return (
    <RegisterFormStyle>
      <form>
        <input
          className="register"
          type="email"
          placeholder="이메일을 입력하세요"
        />
        <input
          className="register"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        <input
          className="register"
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
        />
        <input
          className="register"
          type="text"
          placeholder="사용하실 닉네임을 입력해주세요"
        />
      </form>
    </RegisterFormStyle>
  );
};

const RegisterFormStyle = styled.div`
  width: 100%;
  margin: 0 auto;

  .logo-img {
    width: 150px;
    height: auto;
  }

  h1 {
    padding: 40px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }

  .register {
    width: 100%;
    padding: 8px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export default RegisterForm;
