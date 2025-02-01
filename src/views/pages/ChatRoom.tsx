import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat-room/chat/Chat';
import ChatHeader from '../../components/chat-room/ChatHeader';
import { getRoomInfo } from '../../api/roomApi';
import { useSocketStore } from '../../components/create-room/socket/useSocketStore';
import { useParams } from 'react-router-dom';

interface RoomInfo {
  id: number;
  name: string;
  description: string;
  maxParticipants: number;
  theme: string;
  participants: number;
}

const ChatRoom = () => {
  const { roomId } = useParams();
  const socket = useSocketStore((state) => state.socket);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRoomInfo = async () => {
    try {
      if (!roomId) return;

      const response = await getRoomInfo({ roomId });
      setRoomInfo(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error('❌ 방 정보를 불러오는 중 오류 발생:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket || !roomId) return;
    fetchRoomInfo();
  }, [socket, roomId]);

  // if (loading) return <p>🔄 방 정보를 불러오는 중...</p>;

  return (
    <ChatRoomStyle>
      <ChatHeader />
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

// interface ChatRoomStyleProps {
//   $img: string;
// }

const ChatRoomStyle = styled.div`
  background: url('/assets/image/chatTheme/theme06.jpg') no-repeat center center;
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
    // background: gray;
  }

  .chatting {
    width: 30%;
    min-width: 300px;
  }
`;

export default ChatRoom;
