import React, { useEffect, useState } from 'react';
import { StyledSlider } from '../../styles/Home';
import { StyleChatRoomsGrid } from '../../styles/ChatRoomGrid';
import ChatRoom from './ChatRoom';
import { IChatRoom } from '../../models/chatRoom';
import styled from 'styled-components';
import { UseInfiniteQueryResult } from '@tanstack/react-query';

interface FetchOffsetResponse {
  status: string;
  data: IChatRoom[];
  pagination: {
    total: number;
    pageSize: number;
    page: string;
    totalPages: number;
  };
  message: string;
}
interface ChatRoomSliderProps {
  data: IChatRoom[];
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const ChatRoomSlider: React.FC<ChatRoomSliderProps> = ({
  data,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (data.length) {
      fetchNextPage();
    }
  }, [fetchNextPage]);

  const settings = {
    initialSlide: 1, // Ensure first slide is visible by default
    defaultSlide: 1,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    beforeChange: (current, next) => {
      const nextPage = Math.floor(next / 3) + 1;
      if (nextPage > currentPage && hasNextPage) {
        fetchNextPage();
      } else if (nextPage < currentPage && hasPreviousPage) {
        fetchPreviousPage();
      }
      setCurrentPage(nextPage);
    },
    responsive: [
      {
        breakpoint: 2220,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1859,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1499,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1139,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Flatten pages for slider

  return (
    <StyledSlider {...settings}>
      {data.map((room) => (
        <StyleChatRoomsGrid key={room.name + room.id}>
          <ChatRoom room={room} />
        </StyleChatRoomsGrid>
      ))}
    </StyledSlider>
  );
};

export default ChatRoomSlider;
