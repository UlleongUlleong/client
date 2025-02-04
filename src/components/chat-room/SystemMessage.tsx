import React from 'react';
import styled from 'styled-components';

interface SystemMessageProps {
  message: string;
}

const SystemMessage = ({ message }: SystemMessageProps) => {
  return (
    <SystemMessageStyle>
      <div className="system-message">{message}</div>
    </SystemMessageStyle>
  );
};

const SystemMessageStyle = styled.div`
  .system-message {
    color: white;
    font-weight: medium;
    font-size: 0.7rem;
    text-align: center;
    padding: 6px;
  }
`;

export default SystemMessage;
