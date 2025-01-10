import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MainContainer,
  CategoryTitle,
  StyleChatRoomsGrid,
} from '../../styles/Home';
import ChatRoom, { dummyChatRooms } from '../../components/ChatRoom';
import SearchBar from '../../components/SearchBar';
function ChatLists() {
  const location = useLocation();
  useEffect(() => {});
  const { data } = location.state; //정렬 값
  return (
    <MainContainer>
      <SearchBar />
      <CategoryTitle>{data}</CategoryTitle>
      <StyleChatRoomsGrid>
        {dummyChatRooms.map((rooms, index) => {
          return <ChatRoom room={rooms} key={index} />;
        })}
      </StyleChatRoomsGrid>
    </MainContainer>
  );
}

export default ChatLists;
