import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainContainer } from '../../components/styles/Home';
function ChatLists() {
  const location = useLocation();

  const { data } = location.state;
  console.log(data);
  return <MainContainer>{data}</MainContainer>;
}

export default ChatLists;
