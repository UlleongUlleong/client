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
export interface Theme {
  id: number;
  url: string;
}

export interface AlcoholCategory {
  id: number;
  name: string;
}

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
