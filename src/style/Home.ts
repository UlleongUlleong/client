import styled from 'styled-components';
import { TextField } from '@mui/material';
import Slider from 'react-slick';
export const MainContainer = styled.div`
  width: calc(100% - 80px);
  position: relative;
  padding: 0px;
  margin-left: 80px; // NavigationBar의 width만큼 margin 추가
  min-height: 100vh;
`;

export const TopBar = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  // navbar의 min-width값으로 고정
  height: 130px;
  min-width: 400px;
`;

export const Category = styled.div`
  font-family: 'Noto Sans KR', serif;
  justify-content: space-between;

  height: 50px;
  .view_all {
    text-decoration: underline;
    font-size: 12px;
    float: right;
    position: relative;
    right: 30px;
    top: 30px;

    cursor: pointer;
  }
`;

export const CategoryTitle = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-size: 15px;
  background-color: #f5f5f5;
  position: relative;
  left: 3%;
  top: 20px;
  border-radius: 2px;
`;

export const StyledTextField = styled(TextField)`
  width: 50%;
  max-width: 700px;
  font-family: 'Noto Sans KR', serif;

  .MuiOutlinedInput-root {
    font-family: 'Noto Sans KR', serif;
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
  font-family: 'Noto Sans KR', serif;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  position: absolute;
  right: 20px;
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
  font-family: 'Noto Sans KR', serif;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
`;

export const ChatDescription = styled.div`
  width: 290px;
  margin: 0 auto;
`;

export const Text = styled.span`
  font-family: 'Noto Sans KR', serif;
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
    margin: 0 15px;
  }

  .slick-slide {
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

export const Loading = styled.div`
  font-family: 'Noto Sans KR', serif;
  align-items: center;
  margin: 0 auto;
`;
