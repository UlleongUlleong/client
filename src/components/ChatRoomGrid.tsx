import React, { useEffect, useRef, useState } from 'react';
import ChatRoom, { dummyChatRooms, IChatRoom } from './ChatRoom';
import { StyleChatRoomsGrid } from './styles/Home';
import Spinner from '../assets/Spinner.gif';
import { LastItemContainer } from './styles/Home';

function ChatRoomGrid() {
  const [scrollChatRooms, setScrollChatRooms] = useState<IChatRoom[]>(
    dummyChatRooms.slice(0, 6),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const lastChatRoomElementRef = useRef<HTMLDivElement>(null); //렌더링에 필요하지 않은 값을 참조할 수 있는 React 훅

  const fetchMoreChatRooms = async () => {
    setLoading(true);
    //API 호출로 대체하기
    try {
      const newChatRooms = Array(6)
        .fill(null)
        .map((_, index) => ({
          ...dummyChatRooms[index % dummyChatRooms.length],
          id: Number(Date.now()) + index, // 유니크한 ID 생성
        }));
      setScrollChatRooms((prev) => [...prev, ...newChatRooms]);
      setHasMore(newChatRooms.length > 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreChatRooms();
  }, []);

  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMoreChatRooms();
        }
      },
      { threshold: 0.5 },
    );
    if (lastChatRoomElementRef.current) {
      currentObserver.observe(lastChatRoomElementRef.current);
    }

    return () => {
      if (lastChatRoomElementRef.current) {
        currentObserver.unobserve(lastChatRoomElementRef.current);
      }
    };
  }, [loading, hasMore, lastChatRoomElementRef.current]);
  return (
    <StyleChatRoomsGrid>
      {scrollChatRooms.map((room: IChatRoom, index: number) => {
        if (scrollChatRooms.length === index + 1) {
          return (
            <LastItemContainer ref={lastChatRoomElementRef} key={room.id}>
              <ChatRoom room={room} />
            </LastItemContainer>
          );
        }
        return <ChatRoom key={room.id} room={room} />;
      })}
      {loading && (
        <LastItemContainer>
          <img src={Spinner} alt="loading" className="w-8 h-8 animate-spin" />
        </LastItemContainer>
      )}
    </StyleChatRoomsGrid>
  );
}

export default ChatRoomGrid;
