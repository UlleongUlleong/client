import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { formatTime } from '../../../utils/regitsterUtils';
import {
  requestEmailCode,
  verifyEmailCode,
} from '../../../api/users/registerApi';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoCheckCircle, GoAlert } from 'react-icons/go';

const EmailVerificationTab = () => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const email = location.state.email;

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft]);

  const handleResendCode = async () => {
    try {
      setTimeLeft(30); // 고치기
      setErrorMessage(null);
      const response = await requestEmailCode(email);
      toast.success(response.message, { icon: <GoCheckCircle /> });
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          '인증코드 요청에 실패했습니다 잠시후에 다시 시도해주세요',
        );
      }
      toast.error(errorMessage, { icon: <GoAlert /> });
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      toast.info('인증코드를 입력해주세요.', { icon: <GoAlert /> });
      return;
    }

    try {
      setErrorMessage(null);
      const response = await verifyEmailCode(email, verificationCode);
      toast.success(response.message, { icon: <GoCheckCircle /> });

      if (window.opener) {
        window.opener.postMessage(
          { type: 'EMAIL_VERIFIED', status: true },
          '*',
        );
      }

      setTimeout(() => {
        window.close();
      }, 1000);
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('인증요청이 실패했습니다 잠시후에 다시 시도해주세요');
      }
      toast.error(errorMessage, { icon: <GoAlert /> });
    }
  };

  return (
    <StyledContainer>
      <div className="logo">
        <img className="logo-img" src="src/assets/images/logo.png" alt="Logo" />
      </div>
      <div className="verification-container">
        <h3>이메일 인증</h3>
        <div className="msg">인증 메일이 {email} (으)로 전송되었습니다.</div>
        <form className="email-form">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증번호 6자리를 입력해주세요."
            maxLength={6}
          />
          <button
            type="button"
            onClick={handleResendCode}
            disabled={timeLeft !== 0}
          >
            인증코드 재전송
          </button>
        </form>
        <div>
          <form className="code-form">
            <div className="count">{formatTime(timeLeft)}</div>
            <button
              className="register-btn"
              type="button"
              onClick={handleVerifyCode}
            >
              확인
            </button>
          </form>
        </div>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  .logo-img {
    width: 80px;
  }

  .verification-container {
    width: 80%;
    padding: 20px 0;

    h3 {
      margin-bottom: 10px;
      font-size: 1.2rem;
    }
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

  .email-form {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    input {
      flex: 1;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: black;
      color: white;
      cursor: pointer;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }

  .msg {
    font-size: 0.8rem;
    margin-bottom: 10px;
    color: #555;
  }

  .code-form {
    width: 100%;

    input {
      width: 100%;
      padding: 8px;
      font-size: 0.9rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .count {
      font-size: 0.9rem;
      color: red;
      text-align: right;
      margin-bottom: 10px;
    }

    .register-btn {
      width: 100%;
      color: white;
      background: black;
      border: none;
      border-radius: 30px;
      font-size: 1rem;
      padding: 8px 0;
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

export default EmailVerificationTab;
