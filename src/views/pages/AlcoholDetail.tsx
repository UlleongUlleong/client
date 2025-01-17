import { styled } from 'styled-components';
import React, { useState } from 'react';
import DetailCard from '../../components/alcoholdetail/DetailCard';
import ReviewCard from '../../components/alcoholdetail/ReviewCard';
import ReviewModal from '../../components/alcoholdetail/ReviewModal';

function AlcoholDetail() {
  const dummyData = {
    id: 1,
    imageSrc: 'https://picsum.photos/200',
    title: '마루나 동백 양주',
    rating: 4.7,
    reviewCount: 7,
    interestCount: 113,
  };

  const dummyReview = {
    imageUrl: 'https://picsum.photos/200',
    title: '마루나 동백 양주',
    score: 5,
    comment: '리뷰에용',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <AlcoholDetailStyle>
      <div className="search-bar">검색바</div>
      <div className="content">
        <div className="alcohol-container">
          <h1>oo</h1>
          <DetailCard {...dummyData} toggleModal={toggleModal} />
        </div>
        <div className="review-container">
          <h1>10개의 리뷰</h1>
          <div className="container">
            <div className="reviews">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <ReviewCard key={index} {...dummyReview} />
                ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <ReviewModal closeModal={toggleModal} />}
    </AlcoholDetailStyle>
  );
}

const AlcoholDetailStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 94%;
  min-height: 100%;
  overflow-y: auto;

  .search-bar {
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    width: 100%;
    justify-content: center;
    align-items: start;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .alcohol-container {
      h1 {
        visibility: hidden;
      }
    }
    .review-container {
      .container {
        width: 600px;
        height: 600px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        background-color: #dbd4d4;
        display: flex;
        justify-content: center;
        .reviews {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          overflow-y: auto;
          padding-right: 8px;
          width: 90%;
          padding: 16px;
          &::-webkit-scrollbar {
            width: 12px;
          }
          &::-webkit-scrollbar-track {
            display: none;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #716f6f51;
            border-radius: 20px;
          }
          &::-webkit-scrollbar-button {
            display: none;
          }
        }
      }
    }
  }
`;

export default AlcoholDetail;
