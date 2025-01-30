import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Socket, io } from 'socket.io-client';
import { FiSend } from 'react-icons/fi';

const SOCKET_SERVER_URL = 'https://api.sulleong.coderoom.site/chat';

const Chat = () => {
  // 소켓 유지를 위해 state에 소켓 인스턴스를 담아서 사용
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      path: '/socket.io',
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('WebSocket 연결 성공');
    });

    newSocket.on('message', (data) => {
      console.log('서버로부터 메시지 수신:', data);
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket 연결 종료');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      console.log('메시지 전송:', message);
      socket.emit('message', message); // 첫번째 인수는 이벤트 이름, 두번째 인수는 데이터
      setMessage('');
    }
  };

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
        <button className="send-btn" type="button" onClick={sendMessage}>
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
