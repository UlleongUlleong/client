import React from 'react';
import styled from 'styled-components';

const Divider = () => {
  return (
    <DividerStyle>
      <span>간편 로그인</span>
    </DividerStyle>
  );
};

const DividerStyle = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #9b9b9b;
  font-size: 0.8rem;
  margin: 20px 0;

  &::before {
    content: '';
    flex: 1;
    border-bottom: 1px solid #9b9b9b;
    margin-right: 8px;
  }

  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #9b9b9b;
    margin-left: 8px;
  }
`;

export default Divider;
