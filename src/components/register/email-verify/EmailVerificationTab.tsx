import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const EmailVerificationTab = () => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);
  const email = 'test@programmers.com';

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeOver(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const verification = () => {
    if (verificationCode === '111111') {
      window.close();
    } else {
      alert('잘못된 인증 코드입니다.');
    }
  };

  const resendCode = () => {
    if (!isTimeOver) return;
    setTimeLeft(30);
    setIsTimeOver(false);
    // alert('새 인증 코드를 전송하였습니다.');
  };

  const handleButtonClick = () => {
    if (!isTimeOver) verification();
    else resendCode();
  };

  return (
    <StyledContainer>
      <div className="logo">
        <img className="logo-img" src="src/assets/images/logo.png" alt="Logo" />
      </div>
      <div className="verification-container">
        <h3>이메일 인증</h3>
        <form className="email-form">
          <input className="input-email" type="text" value={email} disabled />
          <button type="button" onClick={() => setIsButtonClicked(true)}>
            이메일 인증
          </button>
        </form>
        {isButtonClicked && (
          <div>
            <div className="msg">
              인증 메일이 {email} (으)로 전송되었습니다.
            </div>
            <form className="code-form">
              <input
                type="text"
                maxLength={6}
                value={verificationCode}
                placeholder="인증번호 6자리를 입력해주세요."
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <div className="count">{formatTime(timeLeft)}</div>
              <button
                className="register-btn"
                type="button"
                onClick={handleButtonClick}
              >
                {!isTimeOver ? '확인' : '코드 재전송'}
              </button>
            </form>
          </div>
        )}
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  .logo-img {
    width: 80px;
    height: auto;
  }

  .verification-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 20px 0;

    h3 {
      margin-bottom: 10px;
      font-size: 1.2rem;
      // text-align: center;
    }
  }

  .email-form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    input {
      width: 76%;
      padding: 8px;
      font-size: 0.9rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      width: 22%;
      background: black;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 0.7rem;
      padding: 8px;
      cursor: pointer;
      // transition: background-color 0.3s;

      // &:hover {
      //   background: #333;
      // }
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
