import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainContainer } from '../../styles/Home';
import { CategoryTitle, StyleChatRoomsGrid } from '../../styles/ChatRoomGrid';
import ChatRoom, { dummyChatRooms } from '../../components/ChatRoom';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import { IChatRoom } from '../../components/ChatRoom';
import { GridTopBar } from './Home';
import { sortChatRoomOptions } from '../../models/dropDownOption';

const BASE_URL = 'http://localhost:8080';
function ChatLists() {
  const location = useLocation();

  const { newChatRooms, sort, category } = location.state; //정렬 값
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);

  useEffect(() => {
    loadChatRooms('creationDate');
  }, []);

  const loadChatRooms = async (sortType: string) => {
    console.log(sortType);
    let requestApi = '';
    if (category) {
      console.log(category);

      requestApi = `${BASE_URL}/api/chatrooms?&category=${category}`;
    }
    if (newChatRooms) {
      setChatRooms(newChatRooms);
    }
    if (sort) {
      requestApi = `${BASE_URL}/api/chatrooms?&sort=${sort}`;
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
      <SearchBar />
      <GridTopBar>
        <CategoryTitle>{sort ? sort : null}</CategoryTitle>
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
