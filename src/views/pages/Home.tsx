import { useEffect, useRef, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Spinner from '../../assets/Spinner.gif';
import ChatRoom from '../../components/ChatRoom.tsx';
import { IChatRoom } from '../../components/ChatRoom.tsx';
import React from 'react';
import { dummyChatRooms } from '../../components/ChatRoom.tsx';
import {
  MainContainer,
  TopBar,
  StyledTextField,
  LoginButton,
  ChatRoomsGrid,
  StyledSlider,
  SliderContainer,
  CategoryTitle,
  Category,
  Loading,
} from '../../components/styles/Home.ts';
function Home() {
  const featuredRooms = dummyChatRooms.slice(0, 6); // 최신 9개 방 (3개씩 보여줄 것)

  // 무한스크롤 채팅방 상태
  const [scrollRooms, setScrollRooms] = useState<IChatRoom[]>(
    dummyChatRooms.slice(0, 6),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const lastRoomElementRef = useRef<HTMLDivElement>(null);

  const user_category = ['소주', '맥주', '시끌시끌'];
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 2400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1957,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1585,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 858,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // 슬라이더 이동 함수

  // 더미 데이터를 가져오는 함수 (실제로는 API 호출)
  const fetchMoreRooms = async () => {
    setLoading(true);
    try {
      // 실제 API 호출 대신 더미 데이터 생성
      const newRooms = Array(6)
        .fill(null)
        .map((_, index) => ({
          ...dummyChatRooms[index % dummyChatRooms.length],
          id: Number(Date.now()) + index, // 유니크한 ID 생성
        }));
      setScrollRooms((prev) => [...prev, ...newRooms]);
      setHasMore(newRooms.length > 0);
    } catch (error) {
      console.error('Error fetching more rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer 설정
  useEffect(() => {
    if (loading) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMoreRooms();
      }
    });

    if (lastRoomElementRef.current) {
      observer.current.observe(lastRoomElementRef.current);
      //관측 시작
    }

    return () => observer.current?.disconnect();
  }, [loading, hasMore]);
  return (
    <MainContainer>
      <TopBar>
        <StyledTextField />
        <IconButton sx={{ margin: '20px' }}>
          <SearchOutlinedIcon sx={{ color: 'black' }} />
        </IconButton>
        <LoginButton>Login</LoginButton>
      </TopBar>
      <Category>
        <CategoryTitle title="최신 순">최신 순</CategoryTitle>
        <Link className="view_all" to="/chatlist" state={{ data: 'hihihi' }}>
          더보기
        </Link>
      </Category>
      <SliderContainer>
        <StyledSlider {...settings}>
          {featuredRooms.map((room) => (
            <ChatRoom key={room.id} room={room}></ChatRoom>
          ))}
        </StyledSlider>
      </SliderContainer>
      {user_category.length > 0 ? (
        <CategoryTitle>사용자 추천 순</CategoryTitle>
      ) : (
        <CategoryTitle> 기본 순</CategoryTitle>
      )}

      <ChatRoomsGrid>
        {scrollRooms.map((room) => (
          <ChatRoom key={room.id} room={room}></ChatRoom>
        ))}
        {loading && (
          <Loading>
            <img src={Spinner}></img>
          </Loading>
        )}
      </ChatRoomsGrid>
    </MainContainer>
  );
}

export default Home;
