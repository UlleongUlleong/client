import React from 'react';

import { ReviewsMainContainer } from '../../styles/Reviews';
import { CategoryTitle } from '../../styles/ChatRoomGrid';
import SearchBar from '../../components/SearchBar';
import AlcoholGrid from '../../components/AlcoholGrid';
import { sortReviewOptions } from '../../models/dropDownOption';
import { useInView } from 'react-intersection-observer';
import { useAlcoholsQuery } from '../../hooks/getAlcoholsByCategory';
import { Loading } from '../../styles/Home';
import { categoryForIndex } from '../../models/categories';
import Dropdown from '../../components/Dropdown';
import Spinner from '../../assets/Spinner.gif';
import { GridTopBar } from './Home';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IAlcohol } from '../../models/alcohol';
import { LoadingMain } from './Reviews';
import { NoResults } from '../../styles/Alcohol';

function SearchAlcohol() {
  const [sort, setSort] = useState('name');
  const [alcoholsData, setAlcoholsData] = useState<IAlcohol[]>([]);
  //검색 시 location state로 넘어와서 관리
  const location = useLocation();
  const searchState = location.state as {
    categoryId?: number;
    searchText?: string;
    sort?: string;
  } | null;

  const searchText = searchState?.searchText;
  const categoryId = searchState?.categoryId;
  const limit = 6;
  const { ref, inView } = useInView();
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useAlcoholsQuery(categoryId, limit, sort, searchText);

  let categoryName = '';
  if (categoryId === 0) {
    categoryName = '전체';
  } else {
    categoryName = categoryForIndex[categoryId];
  }

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const mergedData = data.pages.flatMap((page) => page.data);
      setAlcoholsData(mergedData);
    }
  }, [data]);

  const handleSort = (value: string) => {
    if (value !== sort) {
      setSort(value);
      setAlcoholsData([]);
    }
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
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />
      <GridTopBar>
        <CategoryTitle>{categoryName} 검색결과</CategoryTitle>
        <Dropdown onSelect={handleSort} sortOptions={sortReviewOptions} />
      </GridTopBar>
      {alcoholsData.length === 0 ? (
        <NoResults>검색 결과가 없습니다.</NoResults>
      ) : (
        <AlcoholGrid alcohols={alcoholsData} />
      )}

      {isFetchingNextPage && <Loading />}
      {isError && <LoadingMain>{error}</LoadingMain>}
      {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
    </ReviewsMainContainer>
  );
}

export default SearchAlcohol;
