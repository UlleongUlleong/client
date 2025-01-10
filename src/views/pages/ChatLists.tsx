import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MainContainer } from '../../components/styles/Home';
function ChatLists() {
  const location = useLocation();
  useEffect(() => {});
  const { data } = location.state;
  return <MainContainer>{data}</MainContainer>;
}

export default ChatLists;
