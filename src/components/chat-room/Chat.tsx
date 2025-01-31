import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useSocketStore } from '../create-room/socket/useSocketStore';

interface RoomInfo {
  name: string;
  maxParticipants: number;
  description: string;
  themeId: number;
  moods: number[];
  alcohols: number[];
}

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const { roomId } = useParams();
  const socket = useSocketStore((state) => state.socket);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit('방정보 요청 이벤트', { roomId }); // 방정보 요청
    console.log('방 정보 요청 전송:', roomId);

    socket.on('요청에 대한 듣기 이벤트', (data: RoomInfo) => {
      console.log('방 정보 수신:', data);
      setRoomInfo(data);
      setLoading(false);
    });

    return () => {
      socket.off('방 정보 수신 이벤트'); // 방 정보 수신 이벤트 정리
    };
  }, [socket, roomId]);

  if (loading) return <p>🔄 방 정보를 불러오는 중...</p>;
  if (!roomInfo) return <p>❌ 방 정보를 찾을 수 없습니다.</p>;
  return (
    <ChatStyle>
      <div className="chat">
        {
          // 여기
        }
      </div>
      <form className="input-box">
        <textarea
          className="input"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-btn" type="button" onClick={() => {}}>
          <FiSend />
        </button>
      </form>
    </ChatStyle>
  );
};

const ChatStyle = styled.div`
  width: 100%;
  height: 100%;
  background: #303030;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .input-box {
    width: 100%;
    padding: 20px 10px;
    display: flex;
    gap: 8px;

    .input {
      width: 100%;
      height: 80px;
      border: none;
      border-radius: 6px;
      padding: 10px;
      resize: none;
    }

    .send-btn {
      padding: 10px;
      border: none;
      border-radius: 6px;
      background: #bcbcbc;
      font-size: 18px;
    }
  }
`;

export default Chat;
