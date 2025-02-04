import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat-room/Chat';
import ChatHeader from '../../components/chat-room/ChatHeader';
import { useLocation, useParams } from 'react-router-dom';
import { joinRoom } from '../../api/videoChat';
import VideoRoom from '../../components/Video/VideoRoom';
import { getProfile } from '../../api/profileApi';
import { useSocketStore } from '../../components/create-room/socket/useSocketStore';
const ChatRoom = () => {
  const { socket, connectSocket } = useSocketStore();
  const [userName, setUserName] = useState<string>('');
  const [token, setToken] = useState<string>();
  const { roomId } = useParams();
  const location = useLocation();
  const newToken = location.state as { token: string };
  // useEffect(() => {
  //   if (newToken?.token) {
  //     setToken(newToken.token);
  //   }
  // }, [newToken]);
  const handleRoomJoined = (response) => {
    console.log('room_joined event: 토큰을 받아옵니다.', response.data);
    if (response.message) {
      console.log('입장 메시지', response.message);
    }
    // 현재 토큰 상태를 확인하여 없을 때만 업데이트
    setToken((currentToken) => {
      if (!currentToken) {
        return response.data.token;
      }
      return currentToken;
    });
  };

  // useEffect(() => {
  //   if (!socket) {
  //     console.log('소켓이 연결되지 않음. 연결 시도...');
  //     connectSocket();
  //     return;
  //   }
  //   socket.emit('join_room', { roomId: roomId });
  //   console.log(' 성공! ');

  //   socket?.on('room_joined', handleRoomJoined);
  //   console.log('👥 새로운 유저가 방에 참여:', handleRoomJoined);
  // }, []);

  // useEffect(() => {
  //   console.log('방 입장 성공! ');

  //   socket?.on('room_joined', handleRoomJoined);

  //   return () => {
  //     socket?.off('room_joined', handleRoomJoined);
  //   };
  // }, [socket]);

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
          {token && userName ? (
            <VideoRoom sessionId={roomId} token={token} userName={userName} />
          ) : (
            <div>비디오 연결 요청 중...</div>
          )}
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
