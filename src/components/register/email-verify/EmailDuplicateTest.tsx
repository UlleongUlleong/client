import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  checkEmailAvailability,
  requestEmailCode,
} from '../../../api/users/registerApi';
import { toast } from 'react-toastify';
import { GoAlert } from 'react-icons/go';

const EmailDuplicateTest = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [emailAvailabilityMessage, setEmailAvailabilityMessage] = useState<
    string | null
  >(null);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const [isDuplicatePassed, setIsDuplicatePassed] = useState<boolean>(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromQuery = queryParams.get('email') || '';
    setEmail(emailFromQuery);
  }, [location.search]);

  const handleEmailCheck = async () => {
    try {
      const response = await checkEmailAvailability(email);
      setEmailAvailabilityMessage(response.message);
      setIsEmailError(false);
      setIsDuplicatePassed(true);
    } catch (error: any) {
      setIsEmailError(true);
      setIsDuplicatePassed(false);

      if (error.response) {
        setEmailAvailabilityMessage(error.response.data.message);
      } else {
        setEmailAvailabilityMessage(
          '서비스 이용 중 오류가 발생했습니다. 불편을 드려 죄송합니다. 잠시 후 다시 시도해주세요.',
        );
      }
    }
  };

  const handleButtonClicked = () => {
    handleRequestCode();
    navigate(`/email-verification?email=${encodeURIComponent(email)}`, {
      state: { email },
    });
  };

  const handleRequestCode = async () => {
    try {
      const response = await requestEmailCode(email);
      // toast.success(response.message, { icon: <GoCheckCircle /> });
    } catch (error: any) {
      toast.error(error.message, { icon: <GoAlert /> });
    }
  };

  return (
    <EmailDuplicateTestStyle>
      <div className="logo">
        <img
          className="logo-img"
          src="/assets/image/logo/logo.png"
          alt="Logo"
        />
      </div>
      <div className="verification-container">
        <h3>이메일 중복검사</h3>
        <form className="email-form">
          <input type="text" value={email} disabled />
          <button
            type="button"
            onClick={handleEmailCheck}
            disabled={isDuplicatePassed}
          >
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
        {isDuplicatePassed && (
          <div className="verification-btn">
            <button
              className="verification-btn"
              type="button"
              onClick={handleButtonClicked}
            >
              이메일 인증하기
            </button>
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

  .verification-btn {
    width: 100%;
    padding-top: 30px;

    button {
      background: black;
      border-radius: 30px;
      border: none;
      width: 100%;
      padding: 10px 0;
      color: white;
      font-size: 1rem;
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

export default EmailDuplicateTest;
