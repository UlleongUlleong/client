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
import { toast } from 'react-toastify';
import { isLogin } from '../../api/user';
import { GoAlert } from 'react-icons/go';
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

  const handleChatRoomClick = async () => {
    try {
      const loginStatus = await isLogin();
      if (loginStatus) {
        navigate(`/chat/${room.id}`);
      } else {
        toast.error('로그인이 필요한 서비스입니다.', <GoAlert />);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChatRoomContainer key={room.id}>
      <ChatRoomParty $isFull={isFull}>
        <PersonIcon
          sx={{
            position: 'relative',
            fontSize: '24px',
          }}
        />
        <div className="number">{isFull ? FULL : partyNumber}</div>
      </ChatRoomParty>
      <ChatImage onClick={handleChatRoomClick}>
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
