import { styled } from 'styled-components';
import React from 'react';
import ProfileCard from '../../components/ProfileCard';

function ProfileLike() {
  const reviewedCards = [
    {
      imageSrc: 'https://picsum.photos/200',
      title: '마루나 동백 양주',
      description: 4.0,
      review:
        '리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.',
    },
    {
      imageSrc: 'https://picsum.photos/200',
      title: '서울 100리 18',
      description: 3.2,
      review: '리뷰랍니다.',
    },
    {
      imageSrc: 'https://picsum.photos/200',
      title: '극락',
      description: 5.0,
      review: '리뷰랍니다.',
    },
    {
      imageSrc: 'https://picsum.photos/200',
      title: '디아블로 카베르네 소비뇽',
      description: 2.5,
      review: '리뷰랍니다.',
    },
    {
      imageSrc: 'https://picsum.photos/200',
      title: '발디비에스 까베르네 소비뇽',
      description: 4.7,
      review: '리뷰랍니다.',
    },
    {
      imageSrc: 'https://picsum.photos/200',
      title: '발디비에스 까베르네 소비뇽',
      description: 4.7,
      review: '리뷰랍니다.',
    },
    {
      imageSrc: 'https://picsum.photos/200',
      title: '발디비에스 까베르네 소비뇽',
      description: 4.7,
      review: '리뷰랍니다.',
    },
  ];

  return (
    <ProfileLikeStyle>
      <div className="content">
        <h1>내가 좋아하는 술</h1>
        <div className="container">
          {reviewedCards.map((card, index) => (
            <ProfileCard
              key={`reviewed-${index}`}
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
              review={card.review}
            />
          ))}
        </div>
      </div>
    </ProfileLikeStyle>
  );
}

const ProfileLikeStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  overflow-y: auto;

  h1 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
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

export default ProfileLike;
