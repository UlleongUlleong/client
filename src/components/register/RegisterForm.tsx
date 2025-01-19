import React, { useEffect, useState } from 'react';
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
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
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
  setIsEmailVerified,
}: RegisterFormProps) => {
  const openEmailVerificationWindow = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    const width = 400;
    const height = 400;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const verificationWindow = window.open(
      `http://localhost:5173/email-verification?email=${encodeURIComponent(email)}`,
      'EmailVerification',
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`,
    );

    verificationWindow?.addEventListener('load', () => {
      verificationWindow.postMessage({ type: 'sendEmail', email }, '*');
    });

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'emailVerified' && event.data.success) {
        setIsEmailVerified(true);
        alert('이메일 인증이 완료되었습니다!');
      }
    };

    window.addEventListener('message', handleMessage);

    const interval = setInterval(() => {
      if (verificationWindow?.closed) {
        clearInterval(interval);
        window.removeEventListener('message', handleMessage);
      }
    }, 500);
  };

  const [passwordError, setPasswordError] = useState<string | null>();

  const validatePassword = (password: string): string => {
    const minLength = 8;
    const maxLength = 20;
    const alphabetRegex = /[a-zA-Z]/; // 알파벳 포함 여부
    const specialCharRegex = /[!@$*&]/; // 특수문자 포함 여부
    const numberRegex = /[0-9]/; // 숫자 포함 여부

    if (password.length < minLength) {
      return `비밀번호는 최소 ${minLength}자 이상이어야 합니다.`;
    }

    if (password.length > maxLength) {
      return `비밀번호는 최대 ${maxLength}자 이하여야 합니다.`;
    }

    if (!alphabetRegex.test(password)) {
      return '비밀번호에는 알파벳이 최소 1자 이상 포함되어야 합니다.';
    }

    if (!specialCharRegex.test(password)) {
      return '비밀번호에는 특수 문자 (! * @ $ &) 중 하나 이상 포함되어야 합니다.';
    }

    if (!numberRegex.test(password)) {
      return '비밀번호에는 숫자가 최소 1자 이상 포함되어야 합니다.';
    }

    return '';
  };

  const comparePassword = () => {
    if (confirmPassword === password) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const errorMessage = validatePassword(password);
    setPasswordError(errorMessage !== '' ? errorMessage : null);
  }, [password]);

  return (
    <RegisterFormStyle>
      <form>
        <div className="email-box">
          <input
            className="register-email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="duplicatetest-btn"
            type="button"
            onClick={openEmailVerificationWindow}
          >
            중복 검사
          </button>
        </div>
        {/* 이메일 중복 검사 결과 띄우는 곳*/}
        <input
          className="register"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && (
          <div className="check-msg">
            {passwordError ? (
              <span className="notpass-msg">{passwordError}</span>
            ) : (
              <span className="pass-msg">사용 가능한 비밀번호입니다.</span>
            )}
          </div>
        )}
        <input
          className="register"
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPassword && (
          <div className="check-msg">
            {comparePassword() ? (
              <span className="pass-msg">{'비밀번호가 일치합니다.'}</span>
            ) : (
              <span className="notpass-msg">
                {'비밀번호가 일치하지 않습니다.'}
              </span>
            )}
          </div>
        )}
        <div className="email-box">
          <input
            className="register-email"
            type="text"
            placeholder="사용하실 닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            className="duplicatetest-btn"
            type="button"
            onClick={() => {}}
          >
            중복 검사
          </button>
        </div>
        {/* 닉네임 중복 검사 결과 띄우는 곳*/}
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

  .check-msg {
    display: flex;
    justify-content: flex-end;

    span {
      font-size: 0.8rem;
    }
  }

  .pass-msg {
    color: #038b00;
  }

  .notpass-msg {
    color: #e50808;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 6px;
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

  .email-box {
    width: 100%;

    display: flex;
    justify-content: space-between;
    gap: 4px;
  }

  .register-email {
    width: 70%;
    padding: 8px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .duplicatetest-btn {
    background: black;
    border: none;
    border-radius: 4px;
    padding: 0 4px;
    color: white;
    font-size: 0.7rem;
    font-weight: bold;
    width: 28%;
    cursor: pointer;
  }
`;

export default RegisterForm;
