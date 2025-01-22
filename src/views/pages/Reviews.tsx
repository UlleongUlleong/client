import React from 'react';
import SearchBar from '../../components/SearchBar';
import { ReviewsMainContainer } from '../../styles/Reviews';
import { IAlcohol } from '../../models/alcohol';

import { CategoryTitle } from '../../styles/ChatRoomGrid';
import { GridTopBar } from './Home';
import { sortReviewOptions } from '../../models/dropDownOption';
import AlocholGird from '../../components/AlocholGrid';
import { Category } from '../../styles/ChatRoomGrid';
import { Link } from 'react-router-dom';
import AlcoholEachCategory from './AlcoholEachCategory';
import { useAlcoholsByCategory } from '../../hooks/getAlcoholsByCategory';
import { categoryForFetch } from '../../models/categories';

export const dummyData: IAlcohol[] = [
  {
    id: 1,
    name: '콥케 파인 토니 포트 와인',
    imageUrl:
      'https://cafe24.poxo.com/ec01/letsdowine/fYw07Q+e08011Z5Qzbz30yC0JvqcXWvQcBdvn52sOz689E+Ww8NvS3kIz1BovuxPSD13RAqqxECLxwIolL8rLg==/_/web/product/big/202308/62efaf4fd26fe0f92fb321fcdaf1d7b5.jpg',
    scoreAverage: 4,
    reviewCount: 4,
  },
  {
    id: 2,
    name: '레돔화이트스파클링와인',
    imageUrl:
      'https://cafe24.poxo.com/ec01/lavande65/0jJurf5+JqL2mXn6P+LWO4+ah+knlQDiTPehHkjQhdrHMqR/yJODeiUWVPDdFGeaE2COPmIXMX440F09BTcleA==/_/web/product/big/202109/6176971b9ec65be37840a6d55cd10b6a.jpg',
    scoreAverage: 3,
    reviewCount: 10,
  },
  {
    id: 3,
    name: '콥케 파인 토니 포트 와인',
    imageUrl:
      'https://cafe24.poxo.com/ec01/letsdowine/fYw07Q+e08011Z5Qzbz30yC0JvqcXWvQcBdvn52sOz689E+Ww8NvS3kIz1BovuxPSD13RAqqxECLxwIolL8rLg==/_/web/product/big/202308/62efaf4fd26fe0f92fb321fcdaf1d7b5.jpg',
    scoreAverage: 4,
    reviewCount: 4,
  },
  {
    id: 4,
    name: '레돔화이트스파클링와인',
    imageUrl:
      'https://cafe24.poxo.com/ec01/lavande65/0jJurf5+JqL2mXn6P+LWO4+ah+knlQDiTPehHkjQhdrHMqR/yJODeiUWVPDdFGeaE2COPmIXMX440F09BTcleA==/_/web/product/big/202109/6176971b9ec65be37840a6d55cd10b6a.jpg',
    scoreAverage: 3,
    reviewCount: 10,
  },
];

function Reviews() {
  const { categoriesData, isLoading, isError } = useAlcoholsByCategory();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  console.log(categoriesData[0], 'once');
  const handleSort = (value: string) => {
    console.log(value);
  };

  if (isError) return <div>에러 발생</div>;
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
