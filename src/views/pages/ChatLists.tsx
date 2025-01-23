import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MainContainer } from '../../styles/Home';
import { CategoryTitle, StyleChatRoomsGrid } from '../../styles/ChatRoomGrid';
import ChatRoom, { dummyChatRooms } from '../../components/chatRoom/ChatRoom';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import { IChatRoom } from '../../components/chatRoom/ChatRoom';
import { GridTopBar } from './Home';
import { sortChatRoomOptions } from '../../models/dropDownOption';

const BASE_URL = 'http://localhost:8080';
function ChatLists() {
  const location = useLocation();

  const { newChatRooms, sortName, sortValue, category, searchText } =
    location.state; //정렬 값
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);

  useEffect(() => {
    loadChatRooms('creationDate');
  }, []);

  const loadChatRooms = async (sortType: string) => {
    let requestApi = '';
    if (category) {
      console.log(category);

      requestApi = `${BASE_URL}/api/chatrooms?&category=${category}`;
    }
    if (newChatRooms) {
      setChatRooms(newChatRooms);
    }
    if (sortValue) {
      requestApi = `${BASE_URL}/api/chatrooms?&sort=${sortValue}`;
    }
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
      <SearchBar isMoodCategories={true} />
      <GridTopBar>
        <CategoryTitle>{sortName ? sortName : null}</CategoryTitle>
        <Dropdown
          onSelect={loadChatRooms}
          sortOptions={sortChatRoomOptions}
        ></Dropdown>
      </GridTopBar>

      <StyleChatRoomsGrid>
        {dummyChatRooms.map((rooms, index) => {
          return <ChatRoom room={rooms} key={index} />;
        })}
      </StyleChatRoomsGrid>
    </MainContainer>
  );
}

export default ChatLists;
