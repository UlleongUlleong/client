import styled from 'styled-components';
import Slider from 'react-slick';

export const MainContainer = styled.div`
  width: 94%;
  position: relative;
  overflow-y: auto;
`;

export const StyledSlider = styled(Slider)`
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  display: flex;

  .slick-list {
    @media (max-width: 2579px) {
      width: 2150px;
    }
    @media (max-width: 2219px) {
      width: 1800px;
    }
    @media (max-width: 1859px) {
      width: 1450px;
    }
    @media (max-width: 1499px) {
      width: 1080px;
    }
    @media (max-width: 1139px) {
      width: 720px;
    }
    @media (max-width: 468px) {
      width: 280px;
    }
    @media (max-width: 400px) {
      width: 250px;
    }
  }

  .slick-slide {
  }

  .slick-arrow {
    width: 30px;
    height: 30px;

    &::before {
      font-size: 30px;
    }

    &.slick-prev {
      left: 0px;
    }

    &.slick-next {
      right: 0px;
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

export const Loading = styled.div`
  font-family: 'Noto Sans KR', serif;
  align-items: center;
  display: grid;
  position: relative;
  bottom: 20px;
  justify-content: center;
  align-items: center;
  margin: 0;
`;
export const LastItemContainer = styled.div`
  font-family: 'Noto Sans KR', serif;
  margin: 0 auto;
`;

export const MakeChatRoomButton = styled.button`
  color: black;
  border: none;
  background: white;
  z-index: 100;
  cursor: pointer;
  font-family: 'Noto Sans KR', serif;
  font-size: 14px;
  padding: 13px 18px;
  position: fixed;
  bottom: 50px;
  right: 60px;
  box-shadow:
    0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  &:hover {
    background: #f2f2f2;
  }
  @media (max-width: 468px) {
    right: 20px;
  }
`;
