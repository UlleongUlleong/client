import React from 'react';
import styled from 'styled-components';
import { IAlcohol } from '../models/alcohol';
import Alcohol from './Alcohol';

import { NoResults } from '../styles/Alcohol';
import { NewSlider, SliderSettings } from '../styles/AlcoholSlider';

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

function AlcoholSlider({ alcohols }: { alcohols: IAlcohol[] }) {
  return (
    <>
      {alcohols.length === 0 ? (
        <NoResults>등록된 술이 없습니다.</NoResults>
      ) : (
        <NewSlider {...SliderSettings}>
          {alcohols.map((data, index) => (
            <Alcohol key={index} alcohol={data} />
          ))}
        </NewSlider>
      )}
    </>
  );
}

export default AlcoholSlider;
