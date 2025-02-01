import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  nickname: string;
  message: string;
}

const Message = ({ nickname, message }: MessageProps) => {
  return (
    <MessageStyle>
      <div className="nickname">{nickname}</div>
      <div className="message">{message}</div>
    </MessageStyle>
  );
};

const MessageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: 16px;

  .nickname {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .message {
    background: #d0d5f3;
    width: 50%;
    border-radius: 4px;
    padding: 6px;
  }
`;

export default Message;
