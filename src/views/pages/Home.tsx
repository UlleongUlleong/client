import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

import ChatRoom from '../../components/ChatRoom.tsx';

import { dummyChatRooms } from '../../components/ChatRoom.tsx';
import ChatRoomGrid from '../../components/ChatRoomGrid.tsx';
import {
  MainContainer,
  StyledSlider,
  CategoryTitle,
  Category,
  StyleChatRoomsGrid,
  SliderWrapper,
} from '../../styles/Home.ts';
import SearchBar from '../../components/SearchBar.tsx';
function Home() {
  const featuredRooms = dummyChatRooms.slice(0, 6); // 최신 9개 방 (3개씩 보여줄 것)
  const user_category = ['소주', '맥주', '시끌시끌'];
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
  // 슬라이더 이동 함수

  return (
    <MainContainer>
      <SearchBar />
      <Category>
        <CategoryTitle title="최신 순">최신 순</CategoryTitle>
        <Link className="view_all" to="/chatlist" state={{ data: '최신 순' }}>
          더보기
        </Link>
      </Category>

      <StyledSlider {...settings}>
        {featuredRooms.map((room) => (
          <StyleChatRoomsGrid key={room.id}>
            <ChatRoom key={room.id} room={room}></ChatRoom>
          </StyleChatRoomsGrid>
        ))}
      </StyledSlider>

      {user_category.length > 0 ? (
        <CategoryTitle>사용자 추천 순</CategoryTitle>
      ) : (
        <CategoryTitle> 기본 순</CategoryTitle>
      )}

      <ChatRoomGrid />
    </MainContainer>
  );
}

export default Home;
