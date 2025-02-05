import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getProfile } from '../../api/profileApi';
import VideoRoom from '../../components/Video/VideoRoom';
import Chat from '../../components/chat-room/Chat';
import ChatHeader from '../../components/chat-room/ChatHeader';
import { getRoomInfo } from '../../api/roomApi';
import { useSocketStore } from '../../components/create-room/socket/useSocketStore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoAlert } from 'react-icons/go';
import axios, { AxiosError } from 'axios';

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <h2>채팅방 로딩 중...</h2>
    </LoadingContainer>
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
  const [userName, setUserName] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [themeId, setThemeId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket || !roomId) return;

    fetchRoomInfo();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 시간 줄이기

    return () => clearTimeout(timer);
  }, [socket, roomId]);

  useEffect(() => {
    const getUserName = async () => {
      try {
        console.log('👤 유저 정보 불러오는 중...');
        const profile = await getProfile();
        if (profile) {
          setUserName(profile.nickname);
        } else {
          toast.error('로그인 하시면 방에 입장이 가능합니다.', {
            icon: <GoAlert />,
          });
          navigate('/login');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.log('401에러');
          }
        }
      }
    };
    getUserName();
  }, []);

  const fetchRoomInfo = async () => {
    try {
      if (!roomId) return;
      const response = await getRoomInfo({ roomId });

      if (response.data) {
        setRoomInfo(response.data);
        setRoomName(response.data.name);
        setThemeId(response.data.themeId);
      }
    } catch (error: any) {
      console.error('❌ 방 정보를 불러오는 중 오류 발생:', error);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <ChatRoomStyle $img={themeId}>
      <ChatHeader title={roomName || '로딩 중...'} />
      <div className="chat-container">
        <div className="members-container">
          {userName ? (
            <VideoRoom userName={userName} />
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

interface ChatRoomStyleProps {
  $img: string | null;
}

const ChatRoomStyle = styled.div<ChatRoomStyleProps>`
  background: url('/assets/image/chatTheme/theme0${({ $img }) =>
      $img || '1'}.jpg')
    no-repeat center center;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 1.5rem;
`;

export default ChatRoom;
