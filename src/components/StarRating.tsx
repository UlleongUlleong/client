import styled from 'styled-components';
import React from 'react';
const StarWrapper = styled.div`
  display: flex;
  gap: 2px;
  font-size: 18px;
`;

const StarContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

interface FilledStarProps {
  $width: number;
}
const EmptyStar = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  color: #ccc;
`;

const FilledStar = styled.span<FilledStarProps>`
  position: absolute;
  left: 0;
  top: 0;
  color: #ffd700;
  width: ${(props) => props.$width}%;
  overflow: hidden;
  white-space: nowrap;
`;
interface StarRatingProps {
  score: number;
}
const StarRating: React.FC<StarRatingProps> = ({ score }) => {
  return (
    <StarWrapper>
      {[...Array(5)].map((_, index) => {
        let fillPercentage = 0;

        if (score >= index + 1) {
          fillPercentage = 100;
        } else if (score > index) {
          fillPercentage = (score - index) * 100;
        }

        return (
          <StarContainer key={index}>
            <EmptyStar>☆</EmptyStar>
            <FilledStar $width={fillPercentage}>★</FilledStar>
          </StarContainer>
        );
      })}
    </StarWrapper>
  );
};
export default StarRating;
