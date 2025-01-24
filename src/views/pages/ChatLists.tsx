import React, { useEffect, useState } from 'react';
import { MainContainer } from '../../styles/Home';
import { CategoryTitle, StyleChatRoomsGrid } from '../../styles/ChatRoomGrid';
import ChatRoom from '../../components/chatRoom/ChatRoom';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import { IChatRoom } from '../../models/chatRoom';
import { GridTopBar } from './Home';
import { sortChatRoomOptions } from '../../models/dropDownOption';
import { useInView } from 'react-intersection-observer';
import { useFetchRecentChatRooms } from '../../hooks/getChatroom';
import { LoadingMain } from './Reviews';
import Spinner from '../../assets/Spinner.gif';
function ChatLists() {
  const sortName = '최신순';
  const [chatRoomData, setChatRoomData] = useState<IChatRoom[]>([]);
  const { ref, inView } = useInView();
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useFetchRecentChatRooms(6);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const mergedData = data.pages.flatMap((page) => page.data);
      setChatRoomData(mergedData);
    }
  }, [data]);

  const handleSort = (value: string) => {
    setChatRoomData([]);
  };
  if (status === 'pending') {
    return (
      <LoadingMain>
        <img src={Spinner} alt="loading" className="w-8 h-8 animate-spin" />
      </LoadingMain>
    );
  }
  if (status === 'error') {
    return <LoadingMain>Error: {error.message}</LoadingMain>;
  }

  return (
    <MainContainer>
      <SearchBar isMoodCategories={true} />
      <GridTopBar>
        <CategoryTitle>{sortName ? sortName : null}</CategoryTitle>
        <Dropdown
          onSelect={handleSort}
          sortOptions={sortChatRoomOptions}
        ></Dropdown>
      </GridTopBar>

      <StyleChatRoomsGrid>
        {chatRoomData.map((rooms, index) => {
          return <ChatRoom room={rooms} key={index} />;
        })}
        {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
      </StyleChatRoomsGrid>
    </MainContainer>
  );
}

export default ChatLists;
