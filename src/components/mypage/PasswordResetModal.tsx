import { styled } from 'styled-components';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { GoAlert, GoCheckCircle } from 'react-icons/go';
import { ResetPassword } from '../../api/profileApi';

interface ModalProps {
    toggleResetModal: () => void;
    isResetPasswordOpen: boolean;
    setIsResetPasswordOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordResetModal({ isResetPasswordOpen, setIsResetPasswordOpen, toggleResetModal }: ModalProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if (!isResetPasswordOpen) return null;

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            toggleResetModal();
        }
    };

    const handleResetPassword = async () => {
        try {
            setErrorMessage(null);
            const response = await ResetPassword(password, confirmPassword);
            toast.success(response.message, { icon: <GoCheckCircle /> });
            setIsResetPasswordOpen(false);
        } catch (error: any) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('잠시후에 다시 시도해주세요');
            }
            toast.error(errorMessage, { icon: <GoAlert /> });
        }
    }

    return (
        <PasswordResetModalStyle>
            <div className="modal-overlay" onClick={handleBackgroundClick}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={() => setIsResetPasswordOpen(false)}>
                        <FaTimes />
                    </button>
                    <h2>비밀번호 수정</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="새로운 비밀번호를 입력해주세요"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="다시 한번 더 입력해주세요."
                    />
                    <button className="confirm-button" onClick={handleResetPassword}>변경하기</button>
                </div>
            </div>
        </PasswordResetModalStyle>
    );
}

const PasswordResetModalStyle = styled.div`
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
        position : relative;
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
        cursor: pointer;
        font-size: 20px;
    }

    input[type="password"] {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .confirm-button {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        background: black;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
`;

export default PasswordResetModal;
