import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { checkEmailAvailability } from '../../../api/users/registerApi';

const EmailDuplicateTest = () => {
  const [email, setEmail] = useState<string>('');
  const [emailAvailabilityMessage, setEmailAvailabilityMessage] = useState<
    string | null
  >(null);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmailCheck = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await checkEmailAvailability(email);
      setEmailAvailabilityMessage(response.message);
      setIsEmailError(false);
      navigate('/email-verification');
    } catch (error: any) {
      console.log(error);
      setEmailAvailabilityMessage(error.message);
      setIsEmailError(true);
    }
  };
  return (
    <EmailDuplicateTestStyle>
      <div className="logo">
        <img className="logo-img" src="src/assets/images/logo.png" alt="Logo" />
      </div>
      <div className="verification-container">
        <h3>이메일 중복검사</h3>
        <form className="email-form">
          <input
            className="input-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={handleEmailCheck}>
            중복 검사
          </button>
        </form>
        {emailAvailabilityMessage && (
          <div className="check-msg">
            <span className={isEmailError ? 'notpass-msg' : 'pass-msg'}>
              {emailAvailabilityMessage}
            </span>
          </div>
        )}
      </div>
    </EmailDuplicateTestStyle>
  );
};

const EmailDuplicateTestStyle = styled.div`
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
`;

export default EmailDuplicateTest;
