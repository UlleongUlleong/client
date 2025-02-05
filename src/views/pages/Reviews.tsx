import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import { ReviewsMainContainer } from '../../styles/Reviews';
import AlcoholEachCategory from './AlcoholEachCategory';
import { useAlcoholsByCategory } from '../../hooks/getAlcoholsByCategory';
import Spinner from '../../assets/Spinner.gif';
import styled from 'styled-components';
import { NoResults } from '../../styles/Alcohol';

import { useCategoryStore } from '../../store/useCategoryStore';
import { fetchAlcoholsTop10 } from '../../api/alcohol';

import { IAlcohol } from '../../models/alcohol';
export const LoadingMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

interface AlcoholTop10 {
  alcohols: IAlcohol[];
}

//리뷰 메인 페이지
function Reviews() {
  const [top10, setTop10] = useState<AlcoholTop10>(null);

  useEffect(() => {
    const fetchAlcohols = async (top: number) => {
      const top10Data = await fetchAlcoholsTop10(top);
      setTop10(top10Data);
    };
    fetchAlcohols(10);
  }, []);

  const category = useCategoryStore((state) => state.alcoholCategories);

  // const alcoholCategories = [{ id: 0, name: '평점 TOP 10' }, ...category];
  const { categoriesData, isLoading, isError } = useAlcoholsByCategory();
  if (isLoading)
    return (
      <LoadingMain>
        <img src={Spinner} alt="loading" className="w-8 h-8 animate-spin" />
      </LoadingMain>
    );

  if (isError) return <NoResults>에러 발생</NoResults>;
  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />
      <AlcoholEachCategory
        key={0}
        categoryId={0}
        categoryName={'평점 TOP 10'}
        alcoholsData={top10.alcohols.data}
      />
      {category.map((category) => (
        <AlcoholEachCategory
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
          alcoholsData={categoriesData[category.id]?.alcohols.data}
        />
      ))}
    </ReviewsMainContainer>
  );
}

export default Reviews;
