import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat-room/Chat';
import ChatHeader from '../../components/chat-room/ChatHeader';
import { useLocation, useParams } from 'react-router-dom';
import { joinRoom } from '../../api/videoChat';
import VideoRoom from '../../components/Video/VideoRoom';
import { getProfile } from '../../api/profileApi';

const ChatRoom = () => {
  console.log('ChatComponent 렌더링됨');
  const [token, setToken] = useState<string>();
  const { roomId } = useParams();
  useLocation();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const handleJoinRoom = async () => {
      try {
        const response = await joinRoom(roomId);
        console.log('response:', response.data.token);
        setToken(response.data.token);
      } catch (e) {
        console.error('Failed to join room:', e);
      }
    };
    handleJoinRoom();
  }, [roomId]);

  useEffect(() => {
    const getUserName = async () => {
      const profile = await getProfile();
      if (profile) {
        setUserName(profile.nickname);
      }
    };
    getUserName();
  }, []);

  return (
    <ChatRoomStyle>
      <ChatHeader />
      <div className="chat-container">
        <div className="members-container">
          <VideoRoom sessionId={roomId} token={token} userName={userName} />

          {/* {token && userName ? ( */}

          {/* ) : (
              <div>Loading video...</div>
            )} */}
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
    width: 70%;
    height: 100%;
  }

  .chatting {
    width: 30%;
    min-width: 300px;
  }
`;

export default ChatRoom;
