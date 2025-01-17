import React, { useState } from 'react';
import styled from 'styled-components';

const FindPassword = () => {
  const [email, setEmail] = useState<string>('');

  const handleSendTempPassword = () => {
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }

    window.opener.postMessage(
      { type: 'FindPassword', email },
      window.location.origin,
    );
    alert('입력하신 이메일로 임시 비밀번호가 전송되었습니다.');
    window.close();
  };

  return (
    <FindPasswordStyle>
      <div className="findpassword-container">
        <div className="msg">입력하신 이메일로 임시 비밀번호가 전송됩니다.</div>
        <form className="email-form">
          <input
            className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="send-email-btn"
            type="button"
            onClick={handleSendTempPassword}
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
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;

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
    }
  }

  .findpassword-container {
    width: 80%;
  }

  .msg {
    text-align: left;
    font-size: 0.9rem;
    padding: 15px 0;
  }
`;

export default FindPassword;
