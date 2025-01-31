import React from 'react';
import { styled } from 'styled-components';
import { } from '../../models/profile';
import { AlcoholReviewType } from '../../models/alcohol';

function ReviewCard({ id, score, comment, user }: AlcoholReviewType) {
  const { imageUrl, nickname } = user || {};
  return (
    <ReviewCardStyle>
      <div className="image-container">
        <img src={imageUrl} alt={imageUrl}></img>
        <div className="rating">{score}점</div>
      </div>
      <div className="review">
        <div className="nickname">{nickname}</div>
        <div className="comment">{comment}</div>
      </div>
    </ReviewCardStyle>
  );
}

const ReviewCardStyle = styled.div`
  display: flex;
  border: none;
  border-radius: 8px;
  width: 480px;
  height: 100px;
  background-color: white;
  flex-shrink: 0;
  .image-container {
    display: flex;
    flex-direction: column;
    flex-basis: 100px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    img {
      width: 60px;
      border-radius: 50%;
    }
    .rating {
      font-size: 12px;
    }
  }
  .review {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    gap: 12px;

    .nickname {
      font-size: 10px;
    }
    .comment {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

export default ReviewCard;
