import React from 'react';
import styled from 'styled-components';

interface RegisterFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  nickname,
  setNickname,
}: RegisterFormProps) => {
  return (
    <RegisterFormStyle>
      <form>
        <input
          className="register"
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-group">
          <input
            className="register"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="register"
            type="password"
            placeholder="비밀번호를 한 번 더 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input
          className="register"
          type="text"
          placeholder="사용하실 닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
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

  .password-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
