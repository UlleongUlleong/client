import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useSocketStore } from '../create-room/socket/useSocketStore';
import { useParams } from 'react-router-dom';
import Message from './UserMessage';
import SystemMessage from './SystemMessage';

interface MessageContent {
  type: 'user' | 'system';
  userId: number;
  nickname: string;
  message: string;
  createdAt?: string;
}

const Chat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const numericRoomId = roomId ? parseInt(roomId, 10) : null;
  const { socket, connectSocket } = useSocketStore();
  const [messages, setMessages] = useState<MessageContent[]>([]);
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) {
      console.log('소켓이 연결되지 않음. 연결 시도...');
      connectSocket();
      return;
    }

    if (!roomId) {
      console.error('❌ 방 ID가 없음');
      return;
    }

    console.log('📢 방 참가 요청 전송:', numericRoomId);
    socket.emit('join_room', { roomId: numericRoomId });

    socket.on('room_joined', (response) => {
      console.log(`✅ 유저 방 참가 완료:`, response);
      sessionStorage.setItem('userId', response.data.userId);
    });

    socket.on('user_joined', (response) => {
      console.log('👥 새로운 유저가 방에 참여:', response);
      setMessages((prev) => [
        ...prev,
        {
          type: 'system',
          userId: response.data.userId,
          nickname: response.data.nickname,
          message: response.message,
        },
      ]);
    });

    socket.on('user_left', (response) => {
      console.log('👋 유저가 방을 떠남:', response);
      setMessages((prev) => [
        ...prev,
        {
          type: 'system',
          userId: response.data.userId,
          nickname: response.data.nickname,
          message: response.message,
        },
      ]);
    });

    socket.on('message_sent', (response) => {
      console.log('메세지 전송 완료 응답', response);
    });

    socket.on('new_message', (response) => {
      console.log('새로운 메세지 도착', response.data);
      setMessages((prev) => [
        ...prev,
        {
          type: 'user',
          userId: response.data.userId,
          nickname: response.data.nickname,
          message: response.data.message,
          createdAt: response.data.createdAt,
        },
      ]);
    });

    socket.on('error', (response) => {
      console.error('🚨 소켓 오류 발생:', response);
    });

    return () => {
      console.log('🚪 채팅방 나가기 처리');
      socket.emit('leave_room', { roomId: numericRoomId });
      socket.off('room_joined');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('new_message');
      socket.off('message_sent');
      socket.off('error');
    };
  }, [socket, roomId, connectSocket]);

  const showScrollBar = () => {
    if (chatRef.current) {
      chatRef.current.style.scrollbarWidth = 'thin';
      chatRef.current.style.setProperty('--scrollbar-opacity', '1');
    }
  };

  const hideScrollBar = () => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.style.setProperty('--scrollbar-opacity', '0');
      }
    }, 1500);
  };

  const sendMessage = () => {
    const sendMsg = {
      message,
    };

    socket.emit('send_message', sendMsg);
    console.log('💌 메세지 전송', sendMsg);

    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChatStyle>
      <div
        className="chat"
        ref={chatRef}
        onMouseEnter={showScrollBar}
        onMouseLeave={hideScrollBar}
      >
        {messages.map((msg, index) =>
          msg.type === 'system' ? (
            <SystemMessage key={index} message={msg.message} />
          ) : (
            <Message
              key={index}
              message={msg.message}
              nickname={msg.nickname!}
              id={String(msg.userId!)}
            />
          ),
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-box">
        <textarea
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
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
  background: rgba(48, 48, 48, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .chat {
    overflow-y: auto;
    --scrollbar-opacity: 0;
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
    opacity: 1 !important;

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
