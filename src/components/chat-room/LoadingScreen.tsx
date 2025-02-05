import React from 'react';
import styled from 'styled-components';

const LoadingScreen = () => {
  return (
    <LoadingScreenStyle>
      <img src="/assets/image/gif/loading-trans.gif" alt="로딩" />
      <div>Loading...</div>
    </LoadingScreenStyle>
  );
};

const LoadingScreenStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #303030;
  color: white;

  img {
    width: 80px;
  }

  div {
    font-size: 1.4rem;
  }
`;

export default LoadingScreen;
