import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import { sortReviewOptions } from '../../models/dropDownOption';
import { useParams } from 'react-router-dom';
import { ReviewsMainContainer } from '../../styles/Reviews';
import SearchBar from '../../components/SearchBar';
import AlocholGrid from '../../components/AlocholGrid';
import { GridTopBar } from './Home';
import { CategoryTitle } from '../../styles/ChatRoomGrid';

import { useInView } from 'react-intersection-observer';
import { useAlcoholsQuery } from '../../hooks/getAlcoholsByCategory';
import { Loading } from '../../styles/Home';
import { categoryForIndex } from '../../models/categories';
import { IAlcohol } from '../../models/alcohol';

function ReviewLists() {
  const [sort, setSort] = useState('scoreAverage');
  const [cursor, setCursor] = useState(0);
  const [alcoholsData, setAlcoholsData] = useState<IAlcohol[]>([]);
  const { id } = useParams();
  const categoryId = Number(id) || 0;
  const { ref, inView } = useInView();

  const fetchData = async () => {
    try {
      const response = await useAlcoholsQuery(categoryId, cursor, sort);
    } catch (error) {
      console.error(error);
    }
  };
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
    if (inView && hasNextPage) {
      fetchNextPage();
      setAlcoholsData(data?.pages.flatMap((page) => page.data));
    }
  }, [inView, hasNextPage, fetchNextPage, sort]);

  const handleSort = (value: string) => {
    setSort(value);
    setCursor(0);
    setAlcoholsData([]);
  };
  if (status === 'pending') {
    return <Loading />;
  }
  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  const allAlcohols = data?.pages.flatMap((page) => page.data);
  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />
      <GridTopBar>
        <CategoryTitle>{categoryName}</CategoryTitle>
        <Dropdown onSelect={handleSort} sortOptions={sortReviewOptions} />
      </GridTopBar>
      <AlocholGrid alcohols={alcoholsData} />
      {isFetchingNextPage && <Loading />}
      {isError && <div>{error}</div>}
      {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
    </ReviewsMainContainer>
  );
}
export default ReviewLists;
