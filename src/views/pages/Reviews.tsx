import React from 'react';
import SearchBar from '../../components/SearchBar';
import { ReviewsMainContainer } from '../../styles/Reviews';
import AlcoholEachCategory from './AlcoholEachCategory';
import { useAlcoholsByCategory } from '../../hooks/getAlcoholsByCategory';
import { categoryForFetch } from '../../models/categories';
import Spinner from '../../assets/Spinner.gif';
import styled from 'styled-components';
import { NoResults } from '../../styles/Alcohol';

export const LoadingMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
//리뷰 메인 페이지
function Reviews() {
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

      {categoryForFetch.map((category) => (
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
