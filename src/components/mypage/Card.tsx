import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LikeAlcoholType } from '../../models/profile';

function Card({ id, name, scoreAverage, imageUrl }: LikeAlcoholType) {
  const fullStars = Math.floor(scoreAverage);
  const emptyStars = 5 - fullStars;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/alcohol/${id.toString()}`);
  };

  return (
    <CardWrapper onClick={handleCardClick}>
      <CardImage
        src={imageUrl ? `https://ulleong-bucket.s3.ap-northeast-2.amazonaws.com/${imageUrl}` : '/assets/image/default-image.png'}
        alt={name}
      />
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardStars>
          <StarsWrapper>
            {Array(fullStars)
              .fill(null)
              .map((_, index) => (
                <Star key={`full-${index}`}>★</Star>
              ))}
            {Array(emptyStars)
              .fill(null)
              .map((_, index) => (
                <Star key={`empty-${index}`} empty>
                  ☆
                </Star>
              ))}
          </StarsWrapper>
          <Rating>{scoreAverage.toFixed(1)}</Rating>
        </CardStars>
      </CardContent>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
max-width: 200px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  text-align: center;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardStars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
`;

const StarsWrapper = styled.div`
  display: flex;
`;

const Star = styled.span<{ empty?: boolean }>`
  font-size: 20px;
  color: ${({ empty }) => (empty ? '#ddd' : '#000000')};
`;

const Rating = styled.span`
  font-size: 16px;
  margin-left: 8px;
  color: #333;
`;

export default Card;
