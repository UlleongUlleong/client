import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../assets/Spinner.gif';
import ChatRoom from '../../components/chatRoom/ChatRoom.tsx';

import {
  StyleChatRoomsGrid,
  Category,
  CategoryTitle,
} from '../../styles/ChatRoomGrid.ts';
import ChatRoomGrid from '../../components/chatRoom/ChatRoomGrid.tsx';
import {
  MainContainer,
  StyledSlider,
  MakeChatRoomButton,
} from '../../styles/Home.ts';

import SearchBar from '../../components/SearchBar.tsx';
import styled from 'styled-components';
import { useFetchRecentChatRooms } from '../../hooks/getChatroom.ts';
import { NoResults } from '../../styles/Alcohol.ts';
import { LoadingMain } from './Reviews.tsx';
import { isLogin } from '../../api/user.ts';
import { toast } from 'react-toastify';
import { GoAlert } from 'react-icons/go';

export const GridTopBar = styled.div`
  height: 50px;
  justify-content: space-between;
`;

const HomeDivider = styled.div`
  width: calc(100% - 80px);
  margin: 0 auto;
  height: 2px;
  background-color: #dadada;
  @media (max-width: 468px) {
    width: 60vw;
  }
`;

function Home() {
  const navigate = useNavigate();
  const { data, status } = useFetchRecentChatRooms(10);
  const mergedData = data?.pages?.flatMap((page) => page.data) || [];

  const navigateToMakeRoom = async () => {
    try {
      const loginStatus = await isLogin();
      if (loginStatus) {
        navigate('/create-room');
      } else {
        toast.error('로그인이 필요한 서비스입니다.', <GoAlert />);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <>
        {status === 'pending' ? (
          <LoadingMain>
            <img src={Spinner} alt="loading" className="w-8 h-8 animate-spin" />
          </LoadingMain>
        ) : mergedData.length === 0 ? (
          // mergedData가 비어 있는 경우
          <NoResults>채팅방이 없습니다</NoResults>
        ) : (
          <StyledSlider {...settings}>
            {mergedData.map((room) => (
              <StyleChatRoomsGrid key={room.id}>
                <ChatRoom key={room.id} room={room} />
              </StyleChatRoomsGrid>
            ))}
          </StyledSlider>
        )}
      </>
      <HomeDivider />
      <MakeChatRoomButton onClick={navigateToMakeRoom}>
        방 만들기
      </MakeChatRoomButton>

      {/* 사용자 추천 순 채팅방 무한 스크롤 */}
      <ChatRoomGrid />
    </MainContainer>
  );
}

export default Home;
