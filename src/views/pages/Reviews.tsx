import React from 'react';
import SearchBar from '../../components/SearchBar';
import { ReviewsMainContainer } from '../../styles/Reviews';

function Reviews() {
  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />
    </ReviewsMainContainer>
  );
}

export default Reviews;
