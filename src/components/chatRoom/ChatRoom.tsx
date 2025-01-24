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
import { IChatRoom } from '../../models/chatRoom';
import constructWithOptions from 'styled-components/dist/constructors/constructWithOptions';
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
    name: '혼술',
    description: '혼 술 같이 하실 분... 3명은 소주 마십니다.',
    theme: 'theme01.jpg',
    maxParticipants: 4,
    participants: 3,
  },
  {
    id: 2,
    name: '혼술',
    description: '혼 술 같이 하실 분... 3명은 소주 마십니다.',
    theme: 'theme02.jpg',
    maxParticipants: 5,
    participants: 5,
  },
  {
    id: 3,
    name: '혼술',
    description: '혼 술 같이 하실 분... 3명은 소주 마십니다.',
    theme: 'theme02.jpg',
    maxParticipants: 5,
    participants: 3,
  },
  {
    id: 4,
    name: '혼술',
    description: '혼 술 같이 하실 분... 3명은 소주 마십니다.',
    theme: 'theme02.jpg',
    maxParticipants: 5,
    participants: 3,
  },
];
function ChatRoom({ room }: { room: IChatRoom }) {
  const partyNumber = room.participants;
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
        {room.theme ? (
          <img src={`/assets/image/chatTheme/${room.theme}`} alt={room.theme} />
        ) : (
          <img src="/assets/image/default-image.png" alt="default-image" />
        )}
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
