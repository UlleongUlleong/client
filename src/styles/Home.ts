import styled from 'styled-components';
import { TextField } from '@mui/material';
import Slider from 'react-slick';

export const MainContainer = styled.div`
  width: calc(100% - 80px);
  margin-left: 80px;
  width: 100%;
  position: relative;
  padding: 0px;
  min-height: 100vh;
  overflow-y: auto;
  @media (max-width: 468px) {
    width: calc(100% - 70px);
    margin-left: 70px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  height: 130px;

  @media (max-width: 468px) {
    min-width: 200px;
  }
`;

export const Category = styled.div`
  font-family: 'Noto Sans KR', serif;
  justify-content: space-between;
  height: 50px;
  .view_all {
    text-decoration: underline;
    font-size: 14px;
    float: right;
    position: relative;
    right: 30px;
    top: 30px;
    cursor: pointer;
    color: black;
    &:visited {
      color: black;
    }
    &:hover {
      color: gray;
    }
  }
`;

export const CategoryTitle = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-size: 16px;
  position: relative;
  left: 3%;
  top: 20px;
  font-weight: 600;
  border-radius: 2px;
`;

export const StyledTextField = styled(TextField)`
  width: 50%;
  max-width: 650px;
  border-radius: 5px;
  font-family: 'Noto Sans KR', serif;
  left: 20px;

  .MuiOutlinedInput-root {
    font-family: 'Noto Sans KR', serif;
    color: #000;

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: gray;
      border-width: 2px;
    }
  }
`;

export const StyledTextFields = styled.form`
  width: 50%;
  max-width: 650px;
  font-family: 'Noto Sans KR', serif;
  .input {
    width: 90%;
    border: 1px solid #bbb;
    border-radius: 5px;
    padding: 10px 12px;
    font-size: 14px;
  }
  .icon {
    position: relative;
    margin: 0;
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

export const StyleChatRoomsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  margin: 1px auto;
`;

export const ChatRoomContainer = styled.div`
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 10px;
  margin: 0 auto;
`;
export const ChatImage = styled.div`
  height: 200px;
  width: 300px;
  margin: 0 auto;

  @media (max-width: 468px) {
    height: 150px;
    width: 225px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const ChatRoomParty = styled.div`
  position: relative;
  display: block;
  padding: 5px;
  width: 50px;
  right: 120px;
  top: 40px;
  background-color: rgba(0, 0, 0, 0.8);

  border-radius: 20px;
  .number {
    font-family: 'Noto Sans KR', serif;
    color: white;
    font-weight: 600;
  }

  @media (max-width: 468px) {
    right: 80px;
    top: 40px;
  }
`;

export const ChatTitleBox = styled.div`
  width: 290px;
  margin: 5px auto;
  height: 20px;
  text-align: left;

  @media (max-width: 468px) {
    width: 210px;
  }
`;

export const Title = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  @media (max-width: 468px) {
    font-size: 13px;
  }
`;

export const ChatDescription = styled.div`
  width: 290px;
  margin: 0 auto;
  @media (max-width: 468px) {
    width: 210px;
  }
`;

export const Text = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-size: 12px;
  color: #000000;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 468px) {
    font-size: 11px;
  }
`;

export const StyledSlider = styled(Slider)`
  width: 100%;
  margin: 0 auto;
  .slick-list {
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
  margin: 0 auto;
`;
export const LastItemContainer = styled.div`
  font-family: 'Noto Sans KR', serif;
  margin: 0 auto;
  align-items: center;
`;
