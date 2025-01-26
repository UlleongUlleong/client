import React from 'react';
import styled from 'styled-components';
import { IAlcohol } from '../models/alcohol';
import Alcohol from './Alcohol';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NoResults } from '../styles/Alcohol';
const NewSlider = styled(Slider)`
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
  justify-content: space-evenly;

  display: flex;

  .slick-list {
    position: relative;
    left: 15px;
    right: 15px;
    width: calc(100% - 30px);
  }

  .slick-arrow {
    width: 30px;
    height: 30px;

    &::before {
      font-size: 30px;
    }

    &.slick-prev {
      left: 5px;
      z-index: 1;
    }

    &.slick-next {
      right: 5px;
      z-index: 1;
    }

    &:hover {
      &::before {
        color: rgb(131, 131, 131);
      }
    }
  }
  .slick-prev:before {
    color: rgb(0, 0, 0);
    content: '❮';
  }

  .slick-next:before {
    color: rgb(0, 0, 0);
    content: '❯';
  }
`;
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 8,
  responsive: [
    {
      breakpoint: 2100,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

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
        <NewSlider {...settings}>
          {alcohols.map((data, index) => (
            <Alcohol key={index} alcol={data} />
          ))}
        </NewSlider>
      )}
    </>
  );
}

export default AlcoholSlider;
