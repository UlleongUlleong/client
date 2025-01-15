import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  imageSrc: string;
  title: string;
  description: number;
}

function Card({ imageSrc, title, description }: CardProps) {
  const fullStars = Math.floor(description);
  const emptyStars = 5 - fullStars;

  return (
    <CardWrapper>
      <CardImage src={imageSrc} alt={title} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
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
          <Rating>{description.toFixed(1)}</Rating>
        </CardStars>
      </CardContent>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
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
  align-items: center;
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
