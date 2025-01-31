import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat-room/Chat';
import ChatHeader from '../../components/chat-room/ChatHeader';

import { VideoService } from '../../api/videoChat';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  // const [roomData, setRoomData] = useState<any>(null);

  const { roomId } = useParams();
  useEffect(() => {
    const handleJoinRoom = async () => {
      try {
        await VideoService.joinRoom(roomId, 'viewer');
        // setRoomData(data);
      } catch (e) {
        console.error(e);
      }
    };
    handleJoinRoom();
  });

  return (
    <ChatRoomStyle>
      <ChatHeader />
      <div className="chat-container">
        <div className="members-container">
          <div className="members">
            {
              // 다른 컴포넌트 들어올 곳
            }
          </div>
        </div>
        <div className="chatting">
          <Chat />
        </div>
      </div>
    </ChatRoomStyle>
  );
};

const ChatRoomStyle = styled.div`
  background: url('/assets/image/chatTheme/theme02.png') no-repeat center center;
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

    .members {
      background: gray;
      width: 100%;
      height: 80%;
    }
  }

  .chatting {
    width: 30%;
    min-width: 300px;
  }
`;

export default ChatRoom;
