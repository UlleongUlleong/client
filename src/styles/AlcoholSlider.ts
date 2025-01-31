import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const NewSlider = styled(Slider)`
  font-family: 'Noto Sans KR', sans-serif;

  .slick-list {
    margin: 0 30px; // Creates equal left/right spacing
  }

  .slick-track {
    display: flex !important; // Override inline styles
    justify-content: space-between;
    align-items: center; // Optional for vertical alignment
  }

  .slick-slide {
    float: none !important; // Disable default float
    height: auto; // Ensure slide height adjusts
    > div {
      height: 100%; // Ensure child div fills slide
    }
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
export const SliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 8,
  variableWidth: false,
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
