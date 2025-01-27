import React from 'react';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import ProfileReviewCard from '../../components/mypage/ProfileReviewCard';

function ProfileReview() {
  const location = useLocation();
  const reviewAlcohol = location.state.reviewAlcohol || [];

  return (
    <ProfileReviewStyle>
      <div className="content">
        <h1>내가 리뷰한 술</h1>
        <div className="container">
          {reviewAlcohol.map((card) => (
            <ProfileReviewCard
              key={card.id}
              id={card.id}
              alcohol={card.alcohol}
              score={card.score}
              comment={card.comment}
              alcoholId={card.alcoholId}
            />
          ))}
        </div>
      </div>
    </ProfileReviewStyle>
  );
}

const ProfileReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 94%;
  padding: 20px;
  overflow-y: auto;
  h1 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .content {
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 10px;
    width: 100%;
    overflow-x: auto;
  }
  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
    }
    h1 {
      font-size: 24px;
    }
  }
  @media (max-width: 420px) {
    h1 {
      font-size: 20px;
    }
  }
`;

export default ProfileReview;
