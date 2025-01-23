import React from 'react';

import PersonIcon from '@mui/icons-material/Person';
import {
  ChatRoomContainer,
  ChatImage,
  ChatTitleBox,
  Title,
  ChatDescription,
  Text,
  ChatRoomParty,
} from '../../styles/ChatRoom';
import { useNavigate } from 'react-router-dom';
export interface IChatRoom {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  theme: Theme;
  maxParticipants: number;
  joinedParticipants: number;
  alcoholCategory: AlcoholCategory[];
  createdAt: string;
}

export interface Theme {
  id: number;
  url: string;
}

export interface AlcoholCategory {
  id: number;
  name: string;
}

export const dummyChatRooms: IChatRoom[] = [
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
    joinedParticipants: 3,
    alcoholCategory: [{ id: 1, name: '소주' }],
    createdAt: '2025-01-01T00:00:00.000Z',
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
    joinedParticipants: 4,
    alcoholCategory: [{ id: 2, name: '위스키' }],
    createdAt: '2025-01-02T00:00:00.000Z',
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
    joinedParticipants: 2,
    alcoholCategory: [{ id: 3, name: '와인' }],
    createdAt: '2025-01-03T00:00:00.000Z',
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
    joinedParticipants: 6,
    alcoholCategory: [{ id: 4, name: '맥주' }],
    createdAt: '2025-01-03T14:00:00.000Z',
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
    joinedParticipants: 1,
    alcoholCategory: [{ id: 5, name: '칵테일' }],
    createdAt: '2025-01-04T00:00:00.000Z',
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
    joinedParticipants: 2,
    alcoholCategory: [
      { id: 6, name: '막걸리' },
      { id: 7, name: '전통주' },
    ],
    createdAt: '2025-01-05T00:00:00.000Z',
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
    joinedParticipants: 6,
    alcoholCategory: [
      { id: 6, name: '막걸리' },
      { id: 7, name: '전통주' },
    ],
    createdAt: '2025-01-06T00:00:00.000Z',
  },
];
function ChatRoom({ room }: { room: IChatRoom }) {
  const partyNumber = room.joinedParticipants;
  const isFull = partyNumber === room.maxParticipants;
  const FULL = 'FULL';
  const navigate = useNavigate();
  const handleChatRoomClick = () => {
    navigate(`/chat/${room.id}`);
  };
  return (
    <ChatRoomContainer key={room.id} onClick={handleChatRoomClick}>
      <ChatRoomParty isFull={isFull}>
        <PersonIcon
          sx={{
            position: 'relative',
            fontSize: '24px',
          }}
        />
        <div className="number">{isFull ? FULL : partyNumber}</div>
      </ChatRoomParty>
      <ChatImage>
        <img src={room.theme.url} alt={room.name} />
      </ChatImage>
      <ChatTitleBox>
        <Title>{room.name}</Title>
      </ChatTitleBox>
      <ChatDescription>
        <Text>{room.description}</Text>
      </ChatDescription>
    </ChatRoomContainer>
  );
}

export default ChatRoom;
