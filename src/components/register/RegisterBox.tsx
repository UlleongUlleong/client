import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RegisterForm from './RegisterForm';
import SelectKeywords from '../create-room/SelectKeywords';
import { register } from '../../api/users/registerApi';
import { toast } from 'react-toastify';
import { GoAlert, GoCheckCircle } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const RegisterBox = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [checkedAge, setCheckedAge] = useState<boolean>(false);
  const [checkedUseInfo, setCheckedUseInfo] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  const [moods, setMoods] = useState<number[]>([]);
  const [alcohols, setAlcohols] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setAllChecked(checkedAge && checkedUseInfo);
  }, [checkedAge, checkedUseInfo]);

  const handleAllChecked = (isChecked: boolean) => {
    setAllChecked(isChecked);
    setCheckedAge(isChecked);
    setCheckedUseInfo(isChecked);
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !nickname) {
      alert('필수 정보를 입력해주세요. (이메일, 비밀번호, 닉네임)');
      return;
    }
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    }
    if (!checkedAge || !checkedUseInfo) {
      alert('필수 항목에 동의해야 회원가입이 가능합니다.');
      return;
    }

    const registerContent = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      nickname: nickname,
      moodCategory: moods,
      alcoholCategory: alcohols,
    };

    try {
      const response = await register(registerContent);
      toast.success(response.message, { icon: <GoCheckCircle /> });
      navigate('/');
    } catch (error: any) {
      if (error.status === 400) {
        toast.error('입력한 비밀번호가 서로 다릅니다.', {
          icon: <GoAlert />,
        });
      } else if (error.status === 401) {
        toast.error('인증 후에 회원가입을 진행해주세요.', {
          icon: <GoAlert />,
        });
      } else if (error.status >= 500) {
        toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', {
          icon: <GoAlert />,
        });
      } else {
        toast.error(
          '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
          {
            icon: <GoAlert />,
          },
        );
      }
    }
  };

  return (
    <RegisterBoxStyle>
      <div className="logo">
        <img className="logo-img" src="/assets/image/logo/logo.png" />
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
          isEmailVerified={isEmailVerified}
          setIsEmailVerified={setIsEmailVerified}
        />
      </div>
      <div className="keywords-group">
        <SelectKeywords
          title="register"
          moods={moods}
          setMoods={setMoods}
          alcohols={alcohols}
          setAlcohols={setAlcohols}
        />
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
          회원가입 하기
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

export default RegisterBox;
