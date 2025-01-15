import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainContainer } from '../../styles/Home';
import { CategoryTitle, StyleChatRoomsGrid } from '../../styles/ChatRoomGrid';
import ChatRoom, { dummyChatRooms } from '../../components/ChatRoom';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
const BASE_URL = 'http://localhost:8080';
import { IChatRoom } from '../../components/ChatRoom';
function ChatLists() {
  const location = useLocation();
  const { data } = location.state; //정렬 값
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>(data);
  useEffect(() => {
    loadChatRooms('creationDate');
  }, []);

  const loadChatRooms = async (sortType: string) => {
    console.log(sortType);
    try {
      // const response = await fetch(
      //   `${BASE_URL}/api/chatrooms?sort=${sortType}`,
      //   {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
      // const sortedData = await response.json();
      // setChatRooms(sortedData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MainContainer>
      <SearchBar />
      <CategoryTitle>{data}</CategoryTitle>
      <Dropdown onSelect={loadChatRooms}></Dropdown>
      <StyleChatRoomsGrid>
        {dummyChatRooms.map((rooms, index) => {
          return <ChatRoom room={rooms} key={index} />;
        })}
      </StyleChatRoomsGrid>
    </MainContainer>
  );
}

export default ChatLists;
