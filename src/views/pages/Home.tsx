import React, { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown.tsx';
import ChatRoom from '../../components/ChatRoom.tsx';
import {
  StyleChatRoomsGrid,
  Category,
  CategoryTitle,
} from '../../styles/ChatRoomGrid.ts';
import { dummyChatRooms } from '../../components/ChatRoom.tsx';
import ChatRoomGrid from '../../components/ChatRoomGrid.tsx';
import {
  MainContainer,
  StyledSlider,
  MakeChatRoomButton,
} from '../../styles/Home.ts';

import SearchBar from '../../components/SearchBar.tsx';

function Home() {
  const navigate = useNavigate();
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

  const navigateToMakeRoom = () => {
    navigate('/rooms');
  };

  useEffect(() => {}, [featuredRooms]);

  const handleSort = (value: string) => {
    console.log(value);
    if (value === '생성일 순') {
      featuredRooms.sort((a, b) => {
        return a.createdAt > b.createdAt
          ? -1
          : a.createdAt < b.createdAt
            ? 1
            : 0;
      });
    } else if (value === '참여자 순') {
      featuredRooms.sort((a, b) => {
        return a.maxParticipants > b.maxParticipants
          ? -1
          : a.maxParticipants < b.maxParticipants
            ? 1
            : 0;
      });
    }
  };
  const categories = ['mood', 'alcohol'];
  return (
    <MainContainer>
      <SearchBar isMoodCategories={true} />
      <Category>
        <Link
          to="/chatlist"
          className="more "
          state={{ newChatRoom: dummyChatRooms, sort: '최신 순' }}
        >
          더보기
        </Link>
      </Category>
      <CategoryTitle>최신 순</CategoryTitle>
      <StyledSlider {...settings}>
        {featuredRooms.map((room) => (
          <StyleChatRoomsGrid key={room.id}>
            <ChatRoom key={room.id} room={room}></ChatRoom>
          </StyleChatRoomsGrid>
        ))}
      </StyledSlider>{' '}
      <Dropdown onSelect={handleSort} />
      {user_category.length > 0 ? (
        <CategoryTitle>사용자 추천 순</CategoryTitle>
      ) : (
        <CategoryTitle> 기본 순</CategoryTitle>
      )}{' '}
      <MakeChatRoomButton onClick={navigateToMakeRoom}>
        방 만들기
      </MakeChatRoomButton>
      <ChatRoomGrid />
    </MainContainer>
  );
}

export default Home;
