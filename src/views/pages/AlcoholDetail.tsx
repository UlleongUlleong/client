import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import DetailCard from '../../components/alcoholdetail/DetailCard';
import ReviewCard from '../../components/alcoholdetail/ReviewCard';
import ReviewModal from '../../components/alcoholdetail/ReviewModal';
import SearchBar from '../../components/SearchBar';
import { useParams } from 'react-router-dom';
import {
  getAlcoholDetail,
  getAlcoholReview,
  getValidBookmark,
} from '../../api/alcoholApi';
import { AlcoholDetailType, AlcoholReviewType } from '../../models/alcohol';
import { getReviewAlcohol } from '../../api/profileApi';

function AlcoholDetail() {
  const { id } = useParams<{ id: string }>();
  const [alcoholData, setAlcoholData] = useState<AlcoholDetailType | null>(
    null,
  );
  const [reviewData, setReviewData] = useState<AlcoholReviewType[] | null>([]);
  const [clickedBookmark, setClickedBookmark] = useState(false);
  const [isMyReview, setIsMyReview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchAlcoholDetail = async () => {
      if (!id) return;
      try {
        const response = await getAlcoholDetail(id);
        if (response) {
          setAlcoholData(response.data.data);
        }
      } catch (error) {
        console.log('getAlcoholDetail : ', error);
      }
    };
    const fetchAlcoholReview = async () => {
      if (!id) return;
      try {
        const response = await getAlcoholReview(id);
        if (response) {
          setReviewData(response.data.data);
        }
      } catch (error) {
        console.log('fetchAlcoholReview :', error);
      }
    };
    const fetchValidBookmark = async () => {
      if (!id) return;
      setClickedBookmark(false);
      try {
        const response = await getValidBookmark(id);
        if (response.data.data) {
          setClickedBookmark(true);
        }
      } catch (error) {
        console.log('fetchValidBookmark :', error);
      }
    };
    const fetchValidReview = async () => {
      try {
        const data = await getReviewAlcohol();
        if (data && id) {
          const myReview = data.data.find(
            (review) => review.alcoholId === parseInt(id),
          );
          setIsMyReview(!myReview);
          console.log(!!myReview);
        }
      } catch (error) {
        console.log('fetchValidReview:', error);
      }
    };
    fetchAlcoholDetail();
    fetchAlcoholReview();
    fetchValidBookmark();
    fetchValidReview();
  }, [id]);

  return (
    <AlcoholDetailStyle>
      <div className="search-bar">
        <SearchBar isMoodCategories={false} />
      </div>
      <div className="content">
        <div className="alcohol-container">
          <h1>oo</h1>
          {alcoholData && (
            <DetailCard
              {...alcoholData}
              toggleModal={toggleModal}
              clickedBookmark={clickedBookmark}
              setClickedBookmark={setClickedBookmark}
              isMyReview={isMyReview}
            />
          )}
        </div>
        <div className="review-container">
          <h1>{alcoholData?.reviewCount}개의 리뷰</h1>
          <div className="container">
            <div className="reviews">
              {reviewData && reviewData.length > 0 ? (
                reviewData.map((review) => (
                  <ReviewCard
                    key={review.id}
                    id={review.id}
                    score={review.score}
                    comment={review.comment}
                    user={review.user}
                  />
                ))
              ) : (
                <p>등록된 리뷰가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && id && <ReviewModal id={id} closeModal={toggleModal} />}
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
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    width: 100%;
    justify-content: center;
    align-items: start;
    margin-bottom: 40px;

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
