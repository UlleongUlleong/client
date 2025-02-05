import styled from 'styled-components';
import React from 'react';

const formatMessage = (text: string) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

const text = `
ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
`;

const Test = () => {
  return (
    <TestStyle>
      <div className="nickname">{'테스트'}</div>
      <div className="user-message">{formatMessage(text)}</div>
    </TestStyle>
  );
};

const TestStyle = styled.div`
  .nickname {
    font-size: 0.75rem;
    font-weight: medium;
    margin-bottom: 4px;
    color: white;
  }

  .user-message {
    background: #D0D5F3
    width: auto;
    max-width: 90%;
    word-wrap: break-word; /* 단어가 길 경우 줄바꿈 */
    word-break: break-word; /* 영어 등 긴 단어가 있을 경우 강제 줄바꿈 */
    white-space: pre-wrap; /* 줄바꿈(\n) 적용 */
    border-radius: 4px;
    padding: 6px;
    font-size: 0.9rem;
  }
`;

export default Test;
