import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useSocketStore } from '../../create-room/socket/useSocketStore';
import { useParams } from 'react-router-dom';
import Message from './Message';

interface MessageContent {
  userId: number;
  nickname: string;
  message: string;
  createdAt: string;
}

const Chat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const numericRoomId = roomId ? parseInt(roomId, 10) : null;
  const socket = useSocketStore((state) => state.socket);
  const [messages, setMessages] = useState<MessageContent[]>([]);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState<MessageContent | null>(
    null,
  );
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId || !socket) return;

    socket.emit('join_room', { numericRoomId });

    socket.on('room_joined', (response) => {
      console.log(`유저 방 참가 완료:`, response);
    });

    socket.on('user_joined', (response) => {
      console.log('전체 메세지 새로운 유저 방에 참여', response);
    });

    socket.on('user_left', (response) => {
      console.log('전체메세지 유저 방 나감', response);
    });

    socket.on('new_message', (response) => {
      console.log('새로운 메세지 도착', response.data);
      setMessages((prev) => [...prev, response.data]);
    });

    socket.on('error', (response) => {
      console.log('error', response);
    });

    return () => {
      socket.off('room_joined');
      socket.off('new_message');
    };
  }, []);

  const showScrollBar = () => {
    if (chatRef.current) {
      chatRef.current.style.scrollbarWidth = 'thin'; // Firefox용
      chatRef.current.style.setProperty('--scrollbar-opacity', '1');
    }
  };

  const hideScrollBar = () => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.style.setProperty('--scrollbar-opacity', '0');
      }
    }, 1500); // 1.5초 후 사라짐
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendMsg = {
      message,
    };

    socket.emit('send_message', sendMsg);
    console.log('메세지 전송', sendMsg);

    socket.on('message_sent', (response) => {
      console.log('메세지 전송 완료 응답', response);
    });

    socket.on('error', (response) => {
      console.log('send message error', response);
    });

    setMessage('');
  };

  return (
    <ChatStyle>
      <div
        className="chat"
        ref={chatRef}
        onMouseEnter={showScrollBar}
        onMouseLeave={hideScrollBar}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <Message message={msg.message} nickname={msg.nickname} />
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="input-box">
        <textarea
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-btn" type="submit" disabled={message === ''}>
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

  .chat {
    overflow-y: auto;
    --scrollbar-opacity: 0; /* 기본적으로 스크롤바 숨김 */
    transition:
      scrollbar-color 0.3s,
      opacity 0.3s;

    /* Chrome, Safari */
    &::-webkit-scrollbar {
      width: 8px;
      opacity: var(--scrollbar-opacity);
      transition: opacity 0.3s ease-in-out;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(180, 180, 180, var(--scrollbar-opacity));
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: rgba(180, 180, 180, var(--scrollbar-opacity)) transparent;
  }

  .input-box {
    width: 100%;
    padding: 20px 10px;
    display: flex;
    gap: 8px;
    overflow-y: auto;

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
