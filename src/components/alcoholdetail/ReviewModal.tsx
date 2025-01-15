import { styled } from 'styled-components';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface ModalProps {
    closeModal: () => void;
}

function ReviewModal({ closeModal }: ModalProps) {
    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleStarClick = (rating: number) => {
        setSelectedRating(rating);
    };

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    const handleSaveClick = () => {
        if (!selectedRating) {
            alert('별점을 선택해주세요!');
            return;
        }
        if (!reviewText.trim()) {
            alert('리뷰 내용을 입력해주세요!');
            return;
        }
        console.log('리뷰 저장:', { rating: selectedRating, review: reviewText });
        alert('리뷰가 저장되었습니다!');
        closeModal();
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return <ReviewModalStyle onClick={closeModal}>
        <div className="modal-content" onClick={handleModalClick}>
            <div className="comment">별을 클릭해 점수를 매겨주세요.</div>
            <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                        key={index}
                        className={`star ${selectedRating > index ? 'filled' : ''}`}
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
                <button onClick={handleSaveClick} className='btn'>등록</button>
            </div>
        </div>
    </ReviewModalStyle>
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
        width: 25%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap : 12px;

        .comment {
            font-size : 20px;
            font-weight : bold;
        }

        .rating {
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
            width: 250px;
            height: 200px;
            padding: 10px;
            font-size: 16px;
            font-family: 'Arial', sans-serif;
            border: 2px solid #000000;
            border-radius: 8px;
            resize: none; 
            outline: none; 
            background-color: #f9f9f9;
            color: #333;
            transition: border-color 0.3s ease-in-out;

            &:focus {
                border-color: #007bff; 
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
    }
`;

export default ReviewModal;