import { styled } from 'styled-components';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AddReview } from '../../api/reviewApi';

interface ModalProps {
  closeModal: () => void;
  id: string;
}

function ReviewModal({ closeModal, id }: ModalProps) {
  const [selectedscore, setSelectedscore] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleStarClick = (score: number) => {
    setSelectedscore(score);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSaveClick = () => {
    if (!id) return;

    if (!selectedscore) {
      alert('별점을 선택해주세요!');
      return;
    }

    if (!reviewText.trim()) {
      alert('리뷰 내용을 입력해주세요!');
      return;
    }

    const fetchAddReview = async () => {
      try {
        const response = await AddReview(id, selectedscore, reviewText);
        console.log('리뷰 등록 성공 :', response);
        alert('리뷰가 저장되었습니다!');
        closeModal();
        window.location.reload();
      } catch (error: any) {
        if (error.message === '엑세스 토큰이 필요합니다.') {
          alert('로그인이 필요한 서비스입니다.');
          closeModal();
        } else {
          alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
          closeModal();
        }
      }
    };
    fetchAddReview();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ReviewModalStyle onClick={closeModal}>
      <div className="modal-content" onClick={handleModalClick}>
        <div className="comment">별을 클릭해 점수를 매겨주세요.</div>
        <div className="score">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className={`star ${selectedscore > index ? 'filled' : ''}`}
              onClick={() => handleStarClick(index + 1)}
            />
          ))}
        </div>
        <div className="review-container">
          <textarea
            placeholder="리뷰를 작성해주세요."
            value={reviewText}
            onChange={handleReviewChange}
          />
        </div>
        <div className="button-container">
          <button onClick={handleSaveClick} className="btn">
            등록
          </button>
        </div>
      </div>
    </ReviewModalStyle>
  );
}

const ReviewModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-content {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    width: 30%;
    min-width: 450px;
    height: 60%;
    min-height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;

    .comment {
      font-size: 20px;
      font-weight: bold;
    }

    .score {
      display: flex;
      gap: 8px;
      .star {
        font-size: 40px;
        color: #ccc;
        cursor: pointer;
        transition: color 0.3s;
      }
      .star.filled {
        color: #ff9900;
      }
    }

    textarea {
      width: 300px;
      height: 200px;
      padding: 10px;
      font-size: 16px;
      font-family: 'Arial', sans-serif;
      border: 2px solid #000000;
      border-radius: 8px;
      outline: none;
      background-color: #f9f9f9;
      color: #333;
      transition: border-color 0.3s ease-in-out;

      &:focus {
        border-color: #273ec2;
        background-color: #ffffff;
      }
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      width: 80%;
      .btn {
        font-size: 16px;
        padding: 12px 32px;
        background-color: #000000;
        border-radius: 20px;
        color: white;
        border: 1px solid #ddd;
      }
    }
    @media (max-width: 768px) {
      width: 40%;
      gap: 8px;
      .comment {
        font-size: 16px;
      }
      .score .star {
        font-size: 40px;
      }
      textarea {
        font-size: 12px;
      }
    }

    @media (max-width: 320px) {
      width: 60%;
      gap: 8px;
      .comment {
        font-size: 12px;
      }
      .score .star {
        font-size: 28px;
      }
      textarea {
        width: 100%;
        font-size: 12px;
      }
      .button-container {
      width : 80%;
        .btn{
        font-size: 10px;
        padding : 8px 20px;
      }
    }
  }
`;

export default ReviewModal;
