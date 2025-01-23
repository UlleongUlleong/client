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
import { Dropdown } from '../../styles/SearchBar';
import Spinner from '../../assets/Spinner.gif';
import { GridTopBar } from './Home';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IAlcohol } from '../../models/alcohol';

function SearchAlcohol() {
  const [sort, setSort] = useState('name');
  const [alcoholsData, setAlcoholsData] = useState<IAlcohol[]>([]);
  const { id } = useParams();
  //검색 시 location state로 넘어와서 관리
  const location = useLocation();
  const searchState = location.state as {
    categoryId?: number;
    searchText?: string;
    sort?: string;
  } | null;
  //
  const categoryId = id ? Number(id) : searchState?.categoryId;
  const searchText = searchState?.searchText;
  const { ref, inView } = useInView();
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useAlcoholsQuery(categoryId, 5, sort);

  const categoryName = categoryForIndex[categoryId];

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
      <Loading>
        <img src={Spinner} alt="loading" className="w-8 h-8 animate-spin" />
      </Loading>
    );
  }
  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />
      <GridTopBar>
        <CategoryTitle>{categoryName}</CategoryTitle>
        <Dropdown onSelect={handleSort} sortOptions={sortReviewOptions} />
      </GridTopBar>
      <AlcoholGrid alcohols={alcoholsData} />
      {isFetchingNextPage && <Loading />}
      {isError && <div>{error}</div>}
      {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
    </ReviewsMainContainer>
  );
}

export default SearchAlcohol;
