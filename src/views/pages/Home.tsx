import { useEffect, useRef, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from '../../assets/Spinner.gif';
import React from 'react';
import {
  MainContainer,
  TopBar,
  StyledTextField,
  LoginButton,
  ChatRoomsGrid,
  ChatRoom,
  ChatImage,
  ChatTitleBox,
  Category,
  Title,
  ChatDescription,
  Text,
  StyledSlider,
  SliderContainer,
  CategoryTitle,
  Loading,
} from '../../styles/Home.ts';

//text 30자 넘으면 ..으로 표시하게
export interface ChatRoom {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  theme: Theme;
  maxParticipants: number;
  alcoholCategory: AlcoholCategory[];
}

export interface Theme {
  id: number;
  url: string;
}

export interface AlcoholCategory {
  id: number;
  name: string;
}

export const dummyChatRooms: ChatRoom[] = [
  {
    id: 1,
    ownerId: 1,
    name: '혼술',
    description: '혼 술 같이 하실 분... 3명은 소주 마십니다.',
    theme: {
      id: 1,
      url: 'https://www.qplace.kr/content/images/2023/03/1316-------------.jpg',
    },
    maxParticipants: 4,
    alcoholCategory: [{ id: 1, name: '소주' }],
  },
  {
    id: 2,
    ownerId: 2,
    name: '위스키 모임',
    description: '시끌시끌 떠는 분위기로 혼술해요! 최소 2시간 머물 사람만',
    theme: {
      id: 2,
      url: 'https://www.qplace.kr/content/images/2023/03/1316-------------.jpg',
    },
    maxParticipants: 6,
    alcoholCategory: [{ id: 2, name: '위스키' }],
  },
  {
    id: 3,
    ownerId: 3,
    name: '와인 모임',
    description: '와인 한잔하면서 대화해요',
    theme: {
      id: 3,
      url: 'https://www.qplace.kr/content/images/2023/03/1316-------------.jpg',
    },
    maxParticipants: 5,
    alcoholCategory: [{ id: 3, name: '와인' }],
  },
  {
    id: 4,
    ownerId: 4,
    name: '맥주 번개',
    description: '퇴근 후 가볍게 맥주 한잔 하실 분',
    theme: {
      id: 4,
      url: 'https://www.qplace.kr/content/images/2023/03/1316-------------.jpg',
    },
    maxParticipants: 8,
    alcoholCategory: [{ id: 4, name: '맥주' }],
  },
  {
    id: 5,
    ownerId: 5,
    name: '칵테일 파티',
    description: '취미로 칵테일 만드는 분들과 함께해요',
    theme: {
      id: 5,
      url: 'https://www.qplace.kr/content/images/2023/03/1316-------------.jpg',
    },
    maxParticipants: 10,
    alcoholCategory: [{ id: 5, name: '칵테일' }],
  },
  {
    id: 6,
    ownerId: 6,
    name: '막걸리 한잔',
    description: '전통주 좋아하시는 분들 모여요',
    theme: {
      id: 6,
      url: 'https://www.qplace.kr/content/images/2023/03/1316-------------.jpg',
    },
    maxParticipants: 6,
    alcoholCategory: [
      { id: 6, name: '막걸리' },
      { id: 7, name: '전통주' },
    ],
  },
  {
    id: 7,
    ownerId: 7,
    name: '막걸리 두잔',
    description: '전모여요',
    theme: {
      id: 6,
      url: 'https://www.qplace.kr/content/images/2023/03/1316-------------.jpg',
    },
    maxParticipants: 6,
    alcoholCategory: [
      { id: 6, name: '막걸리' },
      { id: 7, name: '전통주' },
    ],
  },
];

function Home() {
  const featuredRooms = dummyChatRooms.slice(0, 6); // 최신 9개 방 (3개씩 보여줄 것)

  // 무한스크롤 채팅방 상태
  const [scrollRooms, setScrollRooms] = useState<ChatRoom[]>(
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
        {}
        <CategoryTitle title="최신 순">최신 순</CategoryTitle>
        <a className="view_all" href="/chatLists">
          전체보기
        </a>
      </Category>
      <SliderContainer>
        <StyledSlider {...settings}>
          {featuredRooms.map((room) => (
            <ChatRoom key={room.id}>
              <ChatImage>
                <img src={room.theme.url} alt={room.name} />
              </ChatImage>
              <ChatTitleBox>
                <Title>{room.name}</Title>
              </ChatTitleBox>
              <ChatDescription>
                <Text>{room.description}</Text>
              </ChatDescription>
            </ChatRoom>
          ))}
        </StyledSlider>
      </SliderContainer>
      {user_category.length > 0 ? (
        <CategoryTitle>사용자 추천 순</CategoryTitle>
      ) : (
        <CategoryTitle> 기본 순</CategoryTitle>
      )}

      <ChatRoomsGrid>
        {scrollRooms.map((room, index) => (
          <ChatRoom
            key={room.id}
            ref={index === scrollRooms.length - 1 ? lastRoomElementRef : null}
          >
            <ChatImage>
              <img src={room.theme.url} alt={room.name} />
            </ChatImage>
            <ChatTitleBox>
              <Title>{room.name}</Title>
            </ChatTitleBox>
            <ChatDescription>
              <Text>{room.description}</Text>
            </ChatDescription>
          </ChatRoom>
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
