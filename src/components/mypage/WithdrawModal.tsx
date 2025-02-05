import React, { useState } from 'react';
import { styled } from 'styled-components';
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [isWithdrawn, setIsWithdrawn] = useState<boolean>(false);

    const handleResendCode = async () => {
        try {
            setErrorMessage(null);
            const response = await requestEmailCode(email);
            toast.success(response.message, { icon: <GoCheckCircle /> });
        } catch (error: any) {
            setErrorMessage('인증코드 요청에 실패했습니다. 잠시 후에 다시 시도해주세요.');
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
            setErrorMessage('인증 요청에 실패했습니다. 잠시 후에 다시 시도해주세요.');
            toast.error(errorMessage, { icon: <GoAlert /> });
        }
    };

    const handleWithdrawConfirm = async () => {
        if (isWithdrawn) return;

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
            setIsWithdrawn(false);
            setErrorMessage('회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.');
            toast.error(errorMessage, { icon: <GoAlert /> });
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    if (!isOpen) return null;

    return (
        <WithDrawModalStyle>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={handleOverlayClick}>
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>회원 탈퇴</h2>
                    {!isEmailVerified ? (
                        <>
                            <div className="input-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일을 입력하세요."
                                />
                                <button onClick={handleResendCode} disabled={!email}>인증메일 보내기</button>
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="인증번호 6자리를 입력하세요."
                                    maxLength={6}
                                />
                                <button onClick={handleVerifyCode}>인증확인</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="input-group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호 입력"
                                />
                            </div>
                            <div className="buttons">
                                <button className="cancel-button" onClick={onClose}>취소</button>
                                <button className="confirm-button" onClick={handleWithdrawConfirm} disabled={isWithdrawn}>확인</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </WithDrawModalStyle>
    );
}

const WithDrawModalStyle = styled.div`
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-content {
        position: relative;
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }

    .input-group {
        display: flex;
        width: 100%;
        margin-bottom: 10px;
    }

    .input-group input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .input-group button {
        padding: 10px;
        background: black;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }

    .buttons {
        display: flex;
        gap: 10px;
        width: 100%;
    }

    .buttons button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }

    .cancel-button {
        background-color: gray;
        color: white;
    }

    .confirm-button {
        background-color: black;
        color: white;
    }
`;

export default WithDrawModal;
