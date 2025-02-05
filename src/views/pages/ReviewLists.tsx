import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/SortDropDown';
import { sortReviewOptions } from '../../models/dropDownOption';
import { useParams } from 'react-router-dom';
import { ReviewsMainContainer } from '../../styles/Reviews';
import SearchBar from '../../components/SearchBar';
import AlcoholGrid from '../../components/AlcoholGrid';
import { GridTopBar } from './Home';
import { CategoryTitle } from '../../styles/ChatRoomGrid';
import { useInView } from 'react-intersection-observer';
import { useAlcoholsQuery } from '../../hooks/getAlcoholsByCategory';
import { Loading } from '../../styles/Home';
import { IAlcohol } from '../../models/alcohol';
import Spinner from '../../assets/Spinner.gif';
import { LoadingMain } from './Reviews';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useLocation } from 'react-router-dom';
function ReviewLists() {
  const [sort, setSort] = useState(() => {
    const pageKey = `selectedOption_${window.location.pathname}`;
    const savedOption = localStorage.getItem(pageKey);
    return savedOption || 'name';
  });
  const category = useCategoryStore((state) => state.alcoholCategories);
  const [alcoholsData, setAlcoholsData] = useState<IAlcohol[]>([]);
  const { id } = useParams();
  const location = useLocation();
  const { categoryName } = location.state;
  //검색 시 location state로 넘어와서 관리
  const categoryId = Number(id);
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

  useEffect(() => {
    const pageKey = `selectedOption_${window.location.pathname}`;
    const savedOption = localStorage.getItem(pageKey);
    if (savedOption) {
      setSort(savedOption);
    }
  }, []); //초기 렌더링
  const handleSort = (value: string) => {
    if (value !== sort) {
      setSort(value);
      setAlcoholsData([]);
      const pageKey = `selectedOption_${window.location.pathname}`;
      localStorage.setItem(pageKey, value);
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
    return <p>Error: {error.message}</p>;
  }

  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />
      <GridTopBar>
        <CategoryTitle>
          {categoryName === '평점 TOP 10' ? '전체' : categoryName}
        </CategoryTitle>
        <Dropdown onSelect={handleSort} sortOptions={sortReviewOptions} />
      </GridTopBar>
      <AlcoholGrid alcohols={alcoholsData} />
      {isFetchingNextPage && <Loading />}
      {isError && <div>{error}</div>}
      {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
    </ReviewsMainContainer>
  );
}
export default ReviewLists;
