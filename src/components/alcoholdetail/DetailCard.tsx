import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaRegStar } from 'react-icons/fa';
import { AlcoholDetailType } from '../../models/alcohol';
import { handleBookmark } from '../../api/alcoholApi';

interface DetailCardProps extends AlcoholDetailType {
  toggleModal: () => void;
  clickedBookmark: boolean;
  setClickedBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  isMyReview: boolean;
}

function DetailCard({
  id,
  imageUrl,
  name,
  scoreAverage,
  reviewCount,
  interestCount,
  clickedBookmark,
  setClickedBookmark,
  isMyReview,
  toggleModal,
}: DetailCardProps) {
  const handleBookmarkClick = () => {
    const fetchHandleBookmark = async () => {
      if (!id) return;
      try {
        await handleBookmark(id.toString());
        window.location.reload();
      } catch (error) {
        console.log('handleBookmarkClick :', error);
        alert('로그인이 필요한 서비스입니다.');
      }
    };
    fetchHandleBookmark();
  };

  const handleRatingClick = () => {
    if (!isMyReview) {
      toggleModal();
    } else {
      alert('리뷰를 이미 작성하셨습니다.');
    }
  };

  return (
    <DetailCardStyle>
      <div className="cardImage">
        <img
          src={`https://ulleong-bucket.s3.ap-northeast-2.amazonaws.com/${imageUrl}`}
          alt={name}
        />
      </div>
      <div className="cardTitle">{name}</div>
      <div
        className={`rating ${isMyReview ? 'active' : ''}`}
        onClick={handleRatingClick}
      >
        <FaRegStar />
        {scoreAverage}점({reviewCount}명)
      </div>
      <div
        className={`bookmark ${clickedBookmark ? 'active' : ''}`}
        onClick={handleBookmarkClick}
      >
        <FaRegBookmark />
        {interestCount}
      </div>
    </DetailCardStyle>
  );
}

const DetailCardStyle = styled.div`
  width: 600px;
  height: 600px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .cardImage {
    width: 300px;
    height: 300px;
    margin-top: 40px;
    margin-bottom: 40px;
    img {
      border-radius: 12px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cardTitle {
    font-size: 32px;
    font-weight: bold;
  }
  .rating,
  .bookmark {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 4px;
    padding: 8px;
    gap: 4px;
    cursor: pointer;
    transition:
      color 0.3s ease,
      background-color 0.3s ease;

    svg {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
  }

  .rating svg {
    color: black;
  }

  .rating.active svg {
    color: #ff9500;
  }

  .bookmark.active svg {
    color: #ff9500;
  }
`;

export default DetailCard;
