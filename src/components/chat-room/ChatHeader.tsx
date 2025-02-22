import React from 'react';
import styled from 'styled-components';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  title: string;
  setIsExisting: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader = ({ title, setIsExisting }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const onClickOutButton = () => {
    setIsExisting(true);
    sessionStorage.removeItem('userId');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <ChatHeaderStyle>
      <span className="chat-title">{title}</span>
      <button className="chat-out" type="button" onClick={onClickOutButton}>
        <MdLogout />
      </button>
    </ChatHeaderStyle>
  );
};

const ChatHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6%;
  max-height: 54px;
  background: #303030;
  opacity: 0.8;

  .chat-title,
  .chat-out {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    padding: 0 20px;
    opacity: 1;
  }

  .chat-out {
    background: none;
    border: none;
  }
`;

export default ChatHeader;
