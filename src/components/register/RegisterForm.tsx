import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface RegisterFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
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
}: RegisterFormProps) => {
  // test하려고 넣은 코드
  const [checkingEmail, setCheckingEmail] = useState<boolean>(false);
  const [checkingPassword, setCheckingPassword] = useState<boolean>(false);
  const [checkingNickname, setCheckingNickname] = useState<boolean>(false);

  const vaildateEmail = (email: string) => {
    const existedEmailArr = [
      'test1@test.com',
      'test2@test.com',
      'test3@test.com',
      'test4@test.com',
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      console.error('유효하지 않은 이메일 형식입니다.');
      return false;
    }

    const isUnique = !existedEmailArr.some(
      (existedEmail) => email === existedEmail,
    );

    return isUnique;
  };

  const validatePassword = (password: string): boolean => {
    const specialCharRegex = /[!@$*&]/;
    const minLength = 8;

    if (password.length < minLength) {
      console.error(`비밀번호는 최소 ${minLength}자 이상이어야 합니다.`);
      return false;
    }

    if (!specialCharRegex.test(password)) {
      console.error(
        '비밀번호에 특수 문자 (! * @ $ &) 중 하나 이상 포함되어야 합니다.',
      );
      return false;
    }

    return true;
  };

  const validateNickname = (nickname: string) => {
    const existedNicknameArr = ['유빈', '보미', '은석', '수빈', '찬휘'];

    const isUnique = !existedNicknameArr.some(
      (existedNickname) => nickname === existedNickname,
    );
    return isUnique;
  };

  useEffect(() => {
    setCheckingEmail(vaildateEmail(email));
  }, [email]);

  useEffect(() => {
    setCheckingPassword(validatePassword(password));
  }, [password]);

  useEffect(() => {
    setCheckingNickname(validateNickname(nickname));
  }, [nickname]);
  // 여기까지

  return (
    <RegisterFormStyle>
      <form>
        <input
          className="register"
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && (
          <div className="check-msg">
            {checkingEmail ? (
              <span className="pass-msg">{'사용 가능한 이메일입니다.'}</span>
            ) : (
              <span className="notpass-msg">{'사용 불가한 이메일입니다.'}</span>
            )}
          </div>
        )}
        <input
          className="register"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && (
          <div className="check-msg">
            {checkingPassword ? (
              <span className="pass-msg">{'사용 가능한 비밀번호입니다.'}</span>
            ) : (
              <span className="notpass-msg">
                {'! * @ $ & 를 한 개 이상 포함시켜주세요.'}
              </span>
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
            {password === confirmPassword && password != '' ? (
              <span className="pass-msg">{'비밀번호가 일치합니다.'}</span>
            ) : (
              <span className="notpass-msg">
                {'비밀번호가 일치하지 않습니다.'}
              </span>
            )}
          </div>
        )}
        <input
          className="register"
          type="text"
          placeholder="사용하실 닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {nickname && (
          <div className="check-msg">
            {checkingNickname && nickname != '' ? (
              <span className="pass-msg">{'사용 가능한 닉네임입니다.'}</span>
            ) : (
              <span className="notpass-msg">{'사용 불가한 닉네임입니다.'}</span>
            )}
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
`;

export default RegisterForm;
