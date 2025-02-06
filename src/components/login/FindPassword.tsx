import React, { useState } from 'react';
import { GoAlert, GoCheckCircle } from 'react-icons/go';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { findPassword } from '../../api/users/loginApi';
import { isValidEmail } from '../../utils/regitsterUtils';

const FindPassword = () => {
  const [email, setEmail] = useState<string>('');

  const handleSendTempPassword = async () => {
    if (!isValidEmail(email)) {
      toast.error('이메일 형식이 아닙니다.', { icon: <GoAlert /> });
      return;
    }

    try {
      const response = await findPassword({ email });
      window.opener.postMessage(
        { type: 'FindPassword', email },
        window.location.origin,
      );
      toast.success(response.message, {
        icon: <GoCheckCircle />,
      });
      setTimeout(() => {
        window.close();
      }, 1000);
    } catch (error: any) {
      toast.error(error.message, { icon: <GoAlert /> });
    }
  };

  return (
    <FindPasswordStyle>
      <div className="logo">
        <img
          className="logo-img"
          src="/assets/image/logo/logo.png"
          alt="Logo"
        />
      </div>
      <div className="find-password-container">
        <h3>임시 비밀번호 발급</h3>
        <div className="msg">입력하신 이메일로 임시 비밀번호가 전송됩니다.</div>
        <form className="email-form">
          <input
            className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
          />
          <button
            className="send-email-btn"
            type="button"
            onClick={handleSendTempPassword}
            disabled={!email}
          >
            메일 보내기
          </button>
        </form>
      </div>
    </FindPasswordStyle>
  );
};

const FindPasswordStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  .find-password-container {
    width: 80%;
    padding: 20px 0;

    h3 {
      margin-bottom: 10px;
      font-size: 1.2rem;
    }
  }

  .logo-img {
    width: 80px;
  }

  .email-form {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    .email-input {
      width: 100%;
      padding: 8px;
      width: 100%;
      font-size: 0.9rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      width: 30%;
      background: black;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 0.7rem;
      font-weight: bold;
      padding: 8px;
      cursor: pointer;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }

  .findpassword-container {
    width: 80%;
  }

  .msg {
    text-align: left;
    font-size: 0.9rem;
    padding: 15px 0;
    color: #555;
  }
`;

export default FindPassword;
