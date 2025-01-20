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

export const dummyData: IAlcohol[] = [
  {
    id: 1,
    name: '콥케 파인 토니 포트 와인',
    image:
      'https://cafe24.poxo.com/ec01/letsdowine/fYw07Q+e08011Z5Qzbz30yC0JvqcXWvQcBdvn52sOz689E+Ww8NvS3kIz1BovuxPSD13RAqqxECLxwIolL8rLg==/_/web/product/big/202308/62efaf4fd26fe0f92fb321fcdaf1d7b5.jpg',
    star: 4,
    reviewers: 4,
  },
  {
    id: 2,
    name: '레돔화이트스파클링와인',
    image:
      'https://cafe24.poxo.com/ec01/lavande65/0jJurf5+JqL2mXn6P+LWO4+ah+knlQDiTPehHkjQhdrHMqR/yJODeiUWVPDdFGeaE2COPmIXMX440F09BTcleA==/_/web/product/big/202109/6176971b9ec65be37840a6d55cd10b6a.jpg',
    star: 3,
    reviewers: 10,
  },
  {
    id: 3,
    name: '콥케 파인 토니 포트 와인',
    image:
      'https://cafe24.poxo.com/ec01/letsdowine/fYw07Q+e08011Z5Qzbz30yC0JvqcXWvQcBdvn52sOz689E+Ww8NvS3kIz1BovuxPSD13RAqqxECLxwIolL8rLg==/_/web/product/big/202308/62efaf4fd26fe0f92fb321fcdaf1d7b5.jpg',
    star: 4,
    reviewers: 4,
  },
  {
    id: 4,
    name: '레돔화이트스파클링와인',
    image:
      'https://cafe24.poxo.com/ec01/lavande65/0jJurf5+JqL2mXn6P+LWO4+ah+knlQDiTPehHkjQhdrHMqR/yJODeiUWVPDdFGeaE2COPmIXMX440F09BTcleA==/_/web/product/big/202109/6176971b9ec65be37840a6d55cd10b6a.jpg',
    star: 3,
    reviewers: 10,
  },
];

function Reviews() {
  const { categoriesData, isLoading, isError } = useAlcoholsByCategory();

  const handleSort = (value: string) => {
    console.log(value);
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="grid grid-cols-2 gap-2">
                {Array(4)
                  .fill(0)
                  .map((_, j) => (
                    <div key={j} className="h-20 bg-gray-200 rounded" />
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (isError) return <div>에러 발생</div>;
  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />

      <GridTopBar>
        <CategoryTitle>별점 TOP10</CategoryTitle>
        <Category>
          <Link
            to="/alcohol-list"
            className="more"
            state={{ alcoholsData: dummyData, categoryName: '별점 TOP10' }}
          >
            더보기
          </Link>
        </Category>
      </GridTopBar>

      {/* 나중에 복구  {categoriesData.map(({ categoryName, alcoholsData }) => (
        <AlcoholEachCategory
          key={categoryName}
          categoryName={categoryName}
          alcoholsData={alcoholsData}
        />
      ))} */}
      <AlocholGird alcohols={dummyData} />

      <GridTopBar>
        <CategoryTitle>와인</CategoryTitle>
        <Category>
          <Link
            to="/alcohol-list"
            className="more"
            state={{ alcoholsData: dummyData, categoryName: '와인' }}
          >
            더보기
          </Link>
        </Category>
      </GridTopBar>
      <AlocholGird alcohols={dummyData} />
    </ReviewsMainContainer>
  );
}

export default Reviews;
