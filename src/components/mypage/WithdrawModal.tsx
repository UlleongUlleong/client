import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { formatTime } from '../../utils/regitsterUtils';
import { toast } from 'react-toastify';
import { GoCheckCircle, GoAlert } from 'react-icons/go';
import { requestEmailCode, verifyEmailCode } from '../../api/users/registerApi';
import { WithdrawUser } from '../../api/profileApi';

interface WithDrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

function WithDrawModal({ isOpen, onClose, onConfirm }: WithDrawModalProps) {
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(''); // 이메일 상태 추가
    const [isWithdrawn, setIsWithdrawn] = useState<boolean>(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

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
            setTimeLeft(30);  // 타이머 리셋
            setErrorMessage(null);
            const response = await requestEmailCode(email);
            toast.success(response.message, { icon: <GoCheckCircle /> });
        } catch (error: any) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('인증코드 요청에 실패했습니다 잠시후에 다시 시도해주세요');
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
            setIsEmailVerified(true);
        } catch (error: any) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('인증요청이 실패했습니다 잠시후에 다시 시도해주세요');
            }
            toast.error(errorMessage, { icon: <GoAlert /> });
        }
    };

    const handleWithdrawConfirm = async () => {
        if (isWithdrawn) {
            return;
        }

        if (!password) {
            toast.info('비밀번호를 입력해주세요.', { icon: <GoAlert /> });
            return;
        }

        try {
            setIsWithdrawn(true);
            await WithdrawUser(password);
            toast.success('회원 탈퇴가 완료되었습니다.', { icon: <GoCheckCircle /> });
            onConfirm();
        } catch (error: any) {
            setIsWithdrawn(false); // 실패시 다시 상태 초기화
            setErrorMessage('회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.');
            toast.error(errorMessage, { icon: <GoAlert /> });
        }
    };

    if (!isOpen) return null;

    return (
        <WithDrawModalStyle>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content">
                <h2>회원 탈퇴</h2>
                {!isEmailVerified ? (
                    <>
                        <p>이메일을 입력해주세요.</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력해주세요"
                        />
                        <button
                            onClick={handleResendCode}
                            disabled={!email}
                        >
                            인증 메일 보내기
                        </button>
                        <p>인증 메일이 전송되었습니다. 인증 코드를 입력해주세요.</p>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="인증번호 6자리를 입력해주세요."
                            maxLength={6}
                        />
                        <button
                            onClick={handleResendCode}
                            disabled={timeLeft !== 0}
                        >
                            인증코드 재전송
                        </button>
                        <div>{formatTime(timeLeft)}</div>
                        <button onClick={handleVerifyCode}>인증 확인</button>
                    </>
                ) : (
                    <>
                        <p>비밀번호를 입력해주세요.</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호 입력"
                        />
                        <div className="buttons">
                            <button onClick={onClose}>취소</button>
                            <button onClick={handleWithdrawConfirm} disabled={isWithdrawn}>확인</button>
                        </div>
                    </>
                )}
            </div>
        </WithDrawModalStyle>
    );
}

const WithDrawModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .modal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    
    input {
      padding: 8px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .buttons {
      display: flex;
      gap: 10px;

      button {
        padding: 8px 12px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      button:last-child {
        background-color: black;
        color: white;
      }
    }
  }
`;

export default WithDrawModal;
