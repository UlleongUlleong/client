import React from 'react';
import ChatRoomGrid from '../../components/chatRoom/ChatRoomGrid';
import { MainContainer } from '../../styles/Home';
import SearchBar from '../../components/SearchBar';
import ChatRoom, { dummyChatRooms } from '../../components/chatRoom/ChatRoom';

function ChatSearchList() {
  return (
    <MainContainer>
      <SearchBar isMoodCategories={true} />
      <ChatRoom room={dummyChatRooms} />
    </MainContainer>
  );
}

export default ChatSearchList;
