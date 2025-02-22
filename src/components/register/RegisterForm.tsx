import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { validatePassword } from '../../utils/regitsterUtils';
import { checkNicknameAvailability } from '../../api/users/registerApi';

interface RegisterFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  isEmailVerified: boolean;
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
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'EMAIL_VERIFIED' && event.data.status) {
        setIsEmailVerified(true);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setIsEmailVerified]);

  const [nicknameAvailabilityMessage, setnicknameAvailabilityMessage] =
    useState<string | null>(null);

  const [isNicknameError, setIsNicknameError] = useState<boolean>(false);

  const openEmailVerificationWindow = () => {
    const width = 400;
    const height = 400;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const newWindow = window.open(
      `https://www.sulleong.coderoom.site/email-duplication?email=${encodeURIComponent(email)}`,
      'EmailDuplicationTest',
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`,
    );

    if (!newWindow) {
      console.error('새 창을 열 수 없습니다. 팝업 차단 설정을 확인하세요.');
    }
  };

  const handleEmailCheck = () => {
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }

    openEmailVerificationWindow();
  };

  const handleNicknameCheck = async () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await checkNicknameAvailability(nickname);
      setnicknameAvailabilityMessage(response.message);
      setIsNicknameError(false);
    } catch (error: any) {
      setIsNicknameError(true);

      if (error.response) {
        setnicknameAvailabilityMessage(error.response.data.message);
      } else {
        setnicknameAvailabilityMessage(
          '서비스 이용 중 오류가 발생했습니다. 불편을 드려 죄송합니다. 잠시 후 다시 시도해주세요.',
        );
      }
    }
  };

  const [passwordError, setPasswordError] = useState<string | null>();

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
            onClick={handleEmailCheck}
          >
            이메일 인증
          </button>
        </div>
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
            {confirmPassword === password ? (
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
            onClick={handleNicknameCheck}
          >
            중복 검사
          </button>
        </div>
        {nicknameAvailabilityMessage && (
          <div className="check-msg">
            <span className={isNicknameError ? 'notpass-msg' : 'pass-msg'}>
              {nicknameAvailabilityMessage}
            </span>
          </div>
        )}
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
