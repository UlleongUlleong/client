import React from 'react';
import styled from 'styled-components';
import { IAlcohol } from '../models/alcohol';
import Alcohol from './Alcohol';

export const StyleAlcoholReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  justify-content: space-around;
  padding: 10px;
  margin-top: 10px;
  &::after {
    content: '';
    grid-column: 1 / -1;
    height: 0;
  }

  @media (max-width: 468px) {
    grid-template-columns: repeat(auto-fill, 150px);
  }
`;

function AlocholGird({ alcohols }: { alcohols: IAlcohol[] }) {
  return (
    <StyleAlcoholReviewsGrid>
      {alcohols.map((data, index) => (
        <Alcohol key={index} alcol={data} />
      ))}
    </StyleAlcoholReviewsGrid>
  );
}

export default AlocholGird;
