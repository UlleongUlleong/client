import React from 'react';
import Dropdown from '../../components/Dropdown';
import { sortReviewOptions } from '../../models/dropDownOption';
import { useLocation } from 'react-router-dom';
import { ReviewsMainContainer } from '../../styles/Reviews';
import SearchBar from '../../components/SearchBar';
import AlocholGrid from '../../components/AlocholGrid';
import { GridTopBar } from './Home';
import { CategoryTitle } from '../../styles/ChatRoomGrid';
function ReviewLists() {
  const handleSort = (value: string) => {};
  const location = useLocation();
  const { alcoholsData, categoryName, sort } = location.state;
  if (sort) {
    console.log(sort);
  }
  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />
      <GridTopBar>
        <CategoryTitle>{categoryName}</CategoryTitle>
        <Dropdown onSelect={handleSort} sortOptions={sortReviewOptions} />
      </GridTopBar>

      <AlocholGrid alcohols={alcoholsData} />
    </ReviewsMainContainer>
  );
}

export default ReviewLists;
