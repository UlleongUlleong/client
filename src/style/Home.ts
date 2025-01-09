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
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 중앙 정렬 */
  // navbar의 min-width값으로 고정
  height: 130px;
  padding: 0 20px;
  min-width: 400px;
`;

export const Category = styled.div`
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  display: flex;
  padding: 0 20px;
  .view_all {
    text-decoration: underline;
  }
  .category_name {
  }
`;

export const StyledTextField = styled(TextField)`
  width: 50%;
  max-width: 800px;
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
  font-family: 'Inter', sans-serif;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  position: absolute;
  right: 15px;
  cursor: pointer;
`;

export const SliderContainer = styled.div`
  width: 100%;
  min-width: 400px;
  left: 10%;

  align-items: center;
  margin-bottom: 30px;

  padding: 0; // 패딩 제거
`;

export const ChatRoomsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  gap: 15px;
  margin: 10px auto;
  padding: 15px;
`;

export const ChatRoom = styled.div`
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
