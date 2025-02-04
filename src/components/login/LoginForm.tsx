import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginApi } from '../../api/users/loginApi';
import { toast } from 'react-toastify';
import { GoAlert, GoCheckCircle } from 'react-icons/go';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRemembered, setIsRemembered] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const loginContent = {
      email: email,
      password: password,
      isRemembered: isRemembered,
    };

    try {
      const response = await loginApi(loginContent);
      toast.success(response.message, { icon: <GoCheckCircle /> });

      if (isRemembered) {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const formattedDate = `${expiresAt.getFullYear()}-${String(
          expiresAt.getMonth() + 1,
        ).padStart(2, '0')}-${String(expiresAt.getDate()).padStart(2, '0')}`;

        const loginInfo = {
          isLoggedIn: true,
          expiresAt: formattedDate,
        };

        localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
      }

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: any) {
      console.log(error);
      if (error.status === 401) {
        toast.error('이메일 혹은 비밀번호가 다릅니다.', { icon: <GoAlert /> });
      } else if (error.status === 403) {
        toast.error('간편 로그인으로 등록된 사용자입니다.', {
          icon: <GoAlert />,
        });
      } else if (error.status > 500) {
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

  const openFindPassword = () => {
    const width = 400;
    const height = 350;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const win = window.open(
      `http://localhost:5173/find-password`,
      'FindPassword',
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`,
    );

    win?.addEventListener('resize', () => {
      win?.resizeTo(400, 400);
    });
  };

  return (
    <LoginFormStyle>
      <div className="login-inputs">
        <input
          className="login"
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login-options">
        <div className="stay-logged-group">
          <input
            className="checkbox"
            type="checkbox"
            checked={isRemembered}
            onChange={(e) => setIsRemembered(e.target.checked)}
          />
          <label htmlFor="stay-logged-radio">로그인 유지</label>
        </div>
        <button className="find-pwd-btn" onClick={openFindPassword}>
          비밀번호 찾기
        </button>
      </div>
      <button type="button" onClick={handleLogin}>
        이메일로 로그인
      </button>
      <Link to="/register">
        <span className="register-link">회원가입</span>
      </Link>
    </LoginFormStyle>
  );
};

const LoginFormStyle = styled.div`
  width: 60%;
  margin: 0 auto;

  .login-inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .login {
    padding: 8px;
    width: 100%;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
    margin-bottom: 18px;

    .stay-logged-group {
      display: flex;
      align-items: center;
      gap: 4px;

      .checkbox {
        width: 14px;
        height: 14px;
        margin-bottom: 3px;
      }

      label {
        font-size: 0.9rem;
        color: black;
      }
    }

    .find-pwd-btn {
      all: unset;
      font-size: 0.9rem;
      color: #9b9b9b;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }
  }

  button {
    width: 100%;
    border: none;
    border-radius: 30px;
    background: black;
    color: white;
    font-size: 1rem;
    padding: 10px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background: #333;
    }

    &:active {
      background: #555;
    }
  }

  .register-link {
    all: unset;
    display: block;
    margin-top: 20px;
    text-align: center;
    font-size: 0.9rem;
    text-decoration: underline;
    cursor: pointer;
    color: black;

    &:hover {
      color: #555;
    }
  }
`;

export default LoginForm;
