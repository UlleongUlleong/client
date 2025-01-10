import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RegisterForm from './RegisterForm';
import SelectKeywords from '../create-room/SelectKeywords';

const RegisterBox = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [checkedAge, setCheckedAge] = useState<boolean>(false);
  const [checkedUseInfo, setCheckedUseInfo] = useState<boolean>(false);

  useEffect(() => {
    setAllChecked(checkedAge && checkedUseInfo);
  }, [checkedAge, checkedUseInfo]);

  const handleAllChecked = (isChecked: boolean) => {
    setAllChecked(isChecked);
    setCheckedAge(isChecked);
    setCheckedUseInfo(isChecked);
  };

  const handleRegister = () => {
    if (!checkedAge || !checkedUseInfo) {
      alert('필수 항목에 동의해야 회원가입이 가능합니다.');
      return;
    }
    // 회원가입 로직 넣기
    console.log('회원가입 성공');
    alert('회원가입이 완료되었습니다');
  };

  return (
    <RegisterBoxStyle>
      <div className="logo">
        <img className="logo-img" src="src/assets/images/logo.png" />
      </div>
      <h1>회원가입</h1>
      <div className="register-form">
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          nickname={nickname}
          setNickname={setNickname}
        />
      </div>
      <div className="keywords-group">
        <SelectKeywords title="register" />
      </div>
      <div className="check-form">
        <div className="check-group">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => handleAllChecked(e.target.checked)}
          />
          <span>모두 동의합니다.</span>
        </div>
        <div className="check-detail-group">
          <div className="check-group">
            <input
              type="checkbox"
              checked={checkedAge}
              onChange={(e) => {
                setCheckedAge(e.target.checked);
              }}
            />
            <span>만 19세 이상입니다. (필수)</span>
          </div>
          <div className="check-group">
            <input
              type="checkbox"
              checked={checkedUseInfo}
              onChange={(e) => setCheckedUseInfo(e.target.checked)}
            />
            <span>개인정보 수집 및 이용 (필수)</span>
          </div>
        </div>
      </div>
      <div className="register-btn">
        <button type="button" onClick={handleRegister}>
          회원가입하기
        </button>
      </div>
    </RegisterBoxStyle>
  );
};

const RegisterBoxStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow:
    0px 4px 6px rgba(0, 0, 0, 0.1),
    0px 1px 3px rgba(0, 0, 0, 0.06);
  padding: 5% 10%;

  h1 {
    padding: 40px 0;
  }

  .logo-img {
    width: 150px;
    height: auto;
  }

  .register-form {
    display: flex;
    justify-content: center;
    width: 80%;
  }

  .keywords-group {
    display: flex;
    justify-content: center;
    width: 80%;
    padding: 20px 0;
  }

  .check-form {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .check-detail-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 10px;
    font-size: 0.9rem;
  }

  .check-group {
    display: flex;
    gap: 4px;
  }

  .register-btn {
    width: 80%;
    padding-top: 30px;
    padding-bottom: 10px;

    button {
      background: black;
      border-radius: 30px;
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

export default RegisterBox;
