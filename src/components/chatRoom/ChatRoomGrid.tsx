import React, { useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import { IChatRoom } from '../../models/chatRoom';
import { StyleChatRoomsGrid } from '../../styles/ChatRoomGrid';
import Spinner from '../../assets/Spinner.gif';
import { useChatRoomsWithCursor } from '../../hooks/getChatroom';
import { useInView } from 'react-intersection-observer';
import { LoadingMain } from '../../views/pages/Reviews';
import { ICategory } from '../../models/categories';
import Dropdown from '../SortDropDown.tsx';
import { GridTopBar } from '../../views/pages/Home';
import { CategoryTitle } from '../../styles/ChatRoomGrid';
import { sortChatRoomOptions } from '../../models/dropDownOption';
import { NoResults } from '../../styles/Alcohol.ts';
import { getProfile } from '../../api/profileApi.ts';
function ChatRoomGrid() {
  const [chatRoomData, setChatRoomData] = useState<IChatRoom[]>([]);
  const [userMoodCategory, setUserMoodCategory] = useState<ICategory[]>([]);
  const [userAlcoholCategory, setUserAlcoholCategory] = useState<ICategory[]>(
    [],
  );
  const [sortChatRooms, setSortChatRooms] = useState(() => {
    const pageKey = `selectedOption_${window.location.pathname}`;
    const savedOption = localStorage.getItem(pageKey);
    return savedOption || 'participantCount';
  });
  useEffect(() => {
    const getUserCategory = async () => {
      const user = await getProfile();
      if (user) {
        setUserMoodCategory(user.moodCategories);
        setUserAlcoholCategory(user.alcoholCategories);
      }
    };
    getUserCategory();
  }, []);

  const { ref, inView } = useInView();
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useChatRoomsWithCursor(
    userMoodCategory,
    userAlcoholCategory,
    6,
    sortChatRooms,
  );

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
    const pageKey = `selectedOption_${window.location.pathname}`;
    localStorage.setItem(pageKey, value);
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
        {userMoodCategory.length > 0 || userAlcoholCategory.length > 0 ? (
          <CategoryTitle>사용자 추천 순</CategoryTitle>
        ) : (
          <CategoryTitle> 기본 순</CategoryTitle>
        )}
        <Dropdown onSelect={handleSort} sortOptions={sortChatRoomOptions} />
      </GridTopBar>

      {chatRoomData.length === 0 ? (
        <NoResults>채팅방이 없습니다.</NoResults>
      ) : (
        <StyleChatRoomsGrid>
          {chatRoomData.map((room: IChatRoom) => (
            <ChatRoom key={room.id} room={room} />
          ))}
          {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
        </StyleChatRoomsGrid>
      )}

      {isError && <div>{error}</div>}
    </>
  );
}

export default ChatRoomGrid;
