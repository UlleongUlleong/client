import styled from 'styled-components';
import { TextField } from '@mui/material';
import Slider from 'react-slick';
export const MainContainer = styled.div`
  width: calc(100% - 80px);
  position: relative;
  margin-left: 80px; // NavigationBar의 width만큼 margin 추가
  padding: 0px;
  min-height: 100vh;
`;

export const TopBar = styled.div`
  left: 80px; // navbar의 min-width값으로 고정
  height: 100px;
  background-color: blue;
  align-items: center;
`;

export const SliderContainer = styled.div`
  width: 100%;
  min-width: 400px;
  background-color: gray;
  align-items: center;
  margin-bottom: 30px;

  padding: 0; // 패딩 제거
`;

export const StyledTextField = styled(TextField)`
  width: 50%;

  font-family: 'Inter', sans-serif;
  background: #ededed;

  .MuiOutlinedInput-root {
    font-family: 'Inter', sans-serif;
    color: #000;

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: gray;
      border-width: 2px;
    }
  }
`;

export const LoginButton = styled.button`
  width: 60px;
  height: 30px;
  margin: 0 10px;
  font-family: 'Inter', sans-serif;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
`;

export const ChatRoomsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  gap: 15px;
  background-color: bisque;
  margin: 0 auto;
  padding: 15px;

  /* @media (min-width: 1920px) {
    max-width: 1900px;
    & > * {
      width: calc(20% - 20px);
      min-width: 350px;
    }
  } */

  /* // 1440px ~ 1919px (최대 4개)
  @media (min-width: 1440px) and (max-width: 1919px) {
    max-width: 1580px;
    & > * {
      width: calc(25% - 20px);
      min-width: 300px;
    }
  }

  // 1024px ~ 1439px (최대 3개)
  @media (min-width: 1024px) and (max-width: 1439px) {
    max-width: 1200px;
    & > * {
      width: calc(33.333% - 20px);
      min-width: 280px;
    }
  }

  // 768px ~ 1023px (최대 2개)
  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 800px;
    & > * {
      width: calc(50% - 20px);
      min-width: 260px;
    }
  }

  // 768px 미만 (1개)
  @media (max-width: 767px) {
    max-width: 400px;
    & > * {
      width: calc(100% - 20px);
      min-width: 220px;
    }
  } */
`;

export const ChatRoom = styled.div`
  background-color: coral;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  margin: 10px auto;
`;
export const ChatImage = styled.div`
  height: 200px;
  width: 300px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const ChatTitleBox = styled.div`
  width: 290px;
  margin: 5px auto;
  height: 20px;
  text-align: left;
`;

export const Title = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
`;

export const ChatDescription = styled.div`
  width: 290px;
  margin: 0 auto;
  background-color: #ffffff;
`;

export const Text = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #000000;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledSlider = styled(Slider)`
  width: 90%;
  margin: 0 auto;
  background-color: aliceblue;
  position: relative;
  .slick-list {
    margin: 0;
  }

  .slick-slide {
    padding: 0 15px;
  }

  .slick-arrow {
    width: 40px;
    height: 40px;
    z-index: 1;

    &::before {
      font-size: 35px;
    }

    &.slick-prev {
      left: -30px;
    }

    &.slick-next {
      right: -30px;
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
