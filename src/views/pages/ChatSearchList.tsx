import React, { useEffect, useState } from 'react';
import { MainContainer } from '../../styles/Home';
import SearchBar from '../../components/SearchBar';
import ChatRoom from '../../components/chatRoom/ChatRoom';
import { GridTopBar } from './Home';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useChatRoomsWithCursor } from '../../hooks/getChatroom';
import { ICategory } from '../../models/categories';
import { CategoryTitle, StyleChatRoomsGrid } from '../../styles/ChatRoomGrid';
import Dropdown from '../../components/Dropdown.tsx';
import { sortChatRoomOptions } from '../../models/dropDownOption';
import Spinner from '../../assets/Spinner.gif';
import { LoadingMain } from './Reviews.tsx';
import { IChatRoom } from '../../models/chatRoom.ts';
function ChatSearchList() {
  const location = useLocation();
  const [sort, setSort] = useState('participantCount');
  const [chatRoomData, setChatRoomData] = useState<IChatRoom[]>([]);
  const { ref, inView } = useInView();
  const { selectedCategories, searchText } = location.state as {
    selectedCategories?: ICategory[];
    searchText?: string;
  } | null;

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useChatRoomsWithCursor(selectedCategories, 6, sort, searchText);

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
    setSort(value);
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
        <CategoryTitle>검색 결과</CategoryTitle>
        <Dropdown onSelect={handleSort} sortOptions={sortChatRoomOptions} />
      </GridTopBar>
      <StyleChatRoomsGrid>
        {chatRoomData.length === 0 ? (
          <LoadingMain style={{ textAlign: 'center' }}>
            검색 결과가 없습니다.
          </LoadingMain>
        ) : (
          chatRoomData.map((room: IChatRoom) => (
            <ChatRoom key={room.id} room={room} />
          ))
        )}
        {isError && <LoadingMain>{error}</LoadingMain>}
        {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
      </StyleChatRoomsGrid>
    </MainContainer>
  );
}

export default ChatSearchList;
