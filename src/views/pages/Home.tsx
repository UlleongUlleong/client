import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import ChatRoom from '../../components/chatRoom/ChatRoom.tsx';

import {
  StyleChatRoomsGrid,
  Category,
  CategoryTitle,
} from '../../styles/ChatRoomGrid.ts';
import { dummyChatRooms } from '../../components/chatRoom/ChatRoom.tsx';
import ChatRoomGrid from '../../components/chatRoom/ChatRoomGrid.tsx';
import {
  MainContainer,
  StyledSlider,
  MakeChatRoomButton,
} from '../../styles/Home.ts';

import SearchBar from '../../components/SearchBar.tsx';
import styled from 'styled-components';

export const GridTopBar = styled.div`
  height: 50px;
  justify-content: space-between;
`;

function Home() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 2220,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1859,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1499,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1139,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigateToMakeRoom = () => {
    navigate('/rooms');
  };

  return (
    <MainContainer>
      <SearchBar isMoodCategories={true} />
      {/* 최신 순 슬라이더  */}
      <GridTopBar>
        <CategoryTitle>최신 순</CategoryTitle>
        <Category>
          <Link to="/chat-lists" className="more">
            더보기
          </Link>
        </Category>
      </GridTopBar>

      <StyledSlider {...settings}>
        {dummyChatRooms.map((room) => (
          <StyleChatRoomsGrid key={room.id}>
            <ChatRoom key={room.id} room={room}></ChatRoom>
          </StyleChatRoomsGrid>
        ))}
      </StyledSlider>

      <MakeChatRoomButton onClick={navigateToMakeRoom}>
        방 만들기
      </MakeChatRoomButton>

      {/* 사용자 추천 순 채팅방 무한 스크롤 */}
      <ChatRoomGrid />
    </MainContainer>
  );
}

export default Home;
