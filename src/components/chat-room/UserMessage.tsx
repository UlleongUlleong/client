import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  nickname: string;
  message: string;
  id: string;
}

const formatMessage = (text: string) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

const Message = ({ nickname, message, id }: MessageProps) => {
  const userId = sessionStorage.getItem('userId');

  return (
    <MessageStyle $me={userId === id}>
      {userId !== id && <div className="nickname">{nickname}</div>}
      <div className="user-message">{formatMessage(message)}</div>
    </MessageStyle>
  );
};

interface MessageStyleProps {
  $me: boolean;
}

const MessageStyle = styled.div<MessageStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $me }) => ($me ? 'flex-end' : 'flex-start')};

  padding: 14px;

  .nickname {
    font-size: 0.75rem;
    font-weight: medium;
    margin-bottom: 4px;
    color: white;
  }

  .user-message {
    background: ${({ $me }) => ($me ? '#D9D9D9' : '#D0D5F3')};
    width: auto;
    max-width: 90%;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    border-radius: 4px;
    padding: 6px;
    font-size: 0.9rem;
  }
`;

export default Message;
