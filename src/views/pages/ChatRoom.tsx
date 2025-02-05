import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat-room/Chat';
import ChatHeader from '../../components/chat-room/ChatHeader';
import { getRoomInfo } from '../../api/roomApi';
import { useSocketStore } from '../../components/create-room/socket/useSocketStore';
import { useParams } from 'react-router-dom';

const LoadingScreen = () => {
  return (
    <LoadingScreenStyle>
      <img src="/assets/image/gif/loading-trans.gif" alt="로딩" />
      <div>Loading...</div>
    </LoadingScreenStyle>
  );
};

interface RoomDetailInfo {
  id: number;
  name: string;
  description: string;
  maxParticipants: number;
  themeId: string;
  participants: number;
}

const ChatRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { socket } = useSocketStore();
  const [roomInfo, setRoomInfo] = useState<RoomDetailInfo | null>(null);

  const [roomName, setRoomName] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socket || !roomId) return;

    fetchRoomInfo();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 시간 줄이기

    return () => clearTimeout(timer);
  }, [socket, roomId]);

  const fetchRoomInfo = async () => {
    try {
      if (!roomId) return;
      const response = await getRoomInfo({ roomId });

      if (response.data) {
        setRoomInfo(response.data);
        setRoomName(response.data.name);
        setTheme(response.data.theme);
        console.log('방정보패치', response);
      }
    } catch (error: any) {
      console.error('❌ 방 정보를 불러오는 중 오류 발생:', error);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <ChatRoomStyle $img={theme}>
      <ChatHeader title={roomName || '로딩 중...'} />
      <div className="chat-container">
        <div className="members-container">
          {
            // 다른 컴포넌트 들어올 곳
          }
        </div>
        <div className="chatting">
          <Chat />
        </div>
      </div>
    </ChatRoomStyle>
  );
};

interface ChatRoomStyleProps {
  $img: string | null;
}

const ChatRoomStyle = styled.div<ChatRoomStyleProps>`
  background: url('/assets/image/chatTheme/${({ $img }) => $img}') no-repeat
    center center;
  background-size: cover;
  height: 100%;

  .chat-container {
    display: flex;
    width: 100%;
    height: 94%;
  }

  .members-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
    padding: 0 40px;
  }

  .chatting {
    width: 30%;
    min-width: 300px;
  }
`;

const LoadingScreenStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #303030;
  color: white;

  img {
    width: 80px;
  }

  div {
    font-size: 1.4rem;
  }
`;

export default ChatRoom;
