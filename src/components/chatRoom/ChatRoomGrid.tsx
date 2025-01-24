import React, { useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import { IChatRoom } from '../../models/chatRoom';
import { StyleChatRoomsGrid } from '../../styles/ChatRoomGrid';
import Spinner from '../../assets/Spinner.gif';
import { useChatRoomsWithCursor } from '../../hooks/getChatroom';
import { useInView } from 'react-intersection-observer';
import { LoadingMain } from '../../views/pages/Reviews';
import { ICategory } from '../../models/categories';
import Dropdown from '../../components/Dropdown.tsx';
import { GridTopBar } from '../../views/pages/Home';
import { CategoryTitle } from '../../styles/ChatRoomGrid';
import { sortChatRoomOptions } from '../../models/dropDownOption';
function ChatRoomGrid() {
  const [chatRoomData, setChatRoomData] = useState<IChatRoom[]>([]);
  const [sortChatRooms, setSortChatRooms] = useState('participantCount');

  const user_category: ICategory[] = [
    { id: 1, name: '혼술', type: 'mood' },
    { id: 2, name: '반주', type: 'mood' },
    { id: 4, name: '칵테일', type: 'alcohol' },
    { id: 5, name: '전통주', type: 'alcohol' },
  ];
  const { ref, inView } = useInView();
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useChatRoomsWithCursor(user_category, 6, sortChatRooms);

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
    setSortChatRooms(value);
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
    <>
      <GridTopBar>
        {user_category.length > 0 ? (
          <CategoryTitle>사용자 추천 순</CategoryTitle>
        ) : (
          <CategoryTitle> 기본 순</CategoryTitle>
        )}
        <Dropdown onSelect={handleSort} sortOptions={sortChatRoomOptions} />
      </GridTopBar>
      <StyleChatRoomsGrid>
        {chatRoomData.map((room: IChatRoom) => {
          return <ChatRoom key={room.id} room={room} />;
        })}
        {isError && <div>{error}</div>}
        {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
      </StyleChatRoomsGrid>
    </>
  );
}

export default ChatRoomGrid;
