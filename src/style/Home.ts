import styled from 'styled-components';
import { TextField } from '@mui/material';
import Slider from 'react-slick';
export const MainContainer = styled.div`
  width: 95%;
  height: 100%;
  flex-direction: column;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 140px;
`;

export const SliderContainer = styled.div`
  width: 100%;
  background-color: black;
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
  width: 100%;

  gap: 30px;
  background-color: bisque;
  justify-content: center;
  padding-top: 25px;
  align-items: center;
  align-content: center;

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
  height: 300px;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
export const ChatImage = styled.div`
  height: 218px;
  width: 320px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const ChatTitleBox = styled.div`
  width: 95%;
  height: 20px;
  text-align: left;
  margin-top: 3px;
  margin-left: 5px;
`;

export const Title = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
`;

export const ChatDescription = styled.div`
  height: 15%;
  width: 95%;
  margin-left: 5px;
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
  height: 300px;
  width: 100%;
  background-color: aliceblue;
  justify-content: center;
  align-items: center;

  .slick-list {
    height: 100%;
    width: 100%;
  }
  .slick-dots {
    width: 100%;
  }

  /* .slick-track {
    display: flex;
    align-items: center;
  } */

  .slick-arrow {
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
