import { styled } from 'styled-components';
import React from 'react';
import { FiX } from "react-icons/fi";

interface ImageModalProps {
    isImageModalOpen: boolean;
    handleCloseModal: () => void;
    handleImageUploadClick: () => void;
    handleRemoveImage: () => void;
}

function ImageModal({
    isImageModalOpen,
    handleCloseModal,
    handleImageUploadClick,
    handleRemoveImage
}: ImageModalProps) {
    if (!isImageModalOpen) return null;

    return (
        <ImageModalStyle onClick={handleCloseModal}>
            <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                <div className="title">
                    <p>프로필 사진 관리</p>
                    <div className="close-icon" onClick={handleCloseModal}>
                        <FiX />
                    </div>
                </div>
                <div className="modal-content">
                    <button onClick={handleImageUploadClick}>수정</button>
                    <button onClick={handleRemoveImage}>삭제</button>
                </div>
            </div>
        </ImageModalStyle>
    );
}

const ImageModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  .image-modal {
    background: white;
    width: 300px;
    height: 200px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }

  .close-icon {
    cursor: pointer;
    font-size: 24px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .modal-content button {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #000000;
    color: white;
  }
`;

export default ImageModal;
