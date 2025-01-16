import React from 'react';
import SearchBar from '../../components/SearchBar';
import { ReviewsMainContainer } from '../../styles/Reviews';
import styled from 'styled-components';
import Alcohol from '../../components/Alcohol';
import { IAlcohol } from '../../models/alcohol';
import Dropdown from '../../components/Dropdown';
import { CategoryTitle } from '../../styles/ChatRoomGrid';
import { GridTopBar } from './Home';
import { sortReviewOptions } from '../../models/dropDownOption';
export const StyleAlcoholReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  justify-content: space-around;
  padding: 10px;
  margin-top: 30px;
  &::after {
    content: '';
    grid-column: 1 / -1;
    height: 0;
  }

  @media (max-width: 468px) {
    grid-template-columns: repeat(auto-fill, 150px);
  }
`;

const dummyData: IAlcohol[] = [
  {
    name: '콥케 파인 토니 포트 와인',
    image:
      'https://cafe24.poxo.com/ec01/letsdowine/fYw07Q+e08011Z5Qzbz30yC0JvqcXWvQcBdvn52sOz689E+Ww8NvS3kIz1BovuxPSD13RAqqxECLxwIolL8rLg==/_/web/product/big/202308/62efaf4fd26fe0f92fb321fcdaf1d7b5.jpg',
    star: 4,
    reviewers: 4,
  },
  {
    name: '레돔화이트스파클링와인',
    image:
      'https://cafe24.poxo.com/ec01/lavande65/0jJurf5+JqL2mXn6P+LWO4+ah+knlQDiTPehHkjQhdrHMqR/yJODeiUWVPDdFGeaE2COPmIXMX440F09BTcleA==/_/web/product/big/202109/6176971b9ec65be37840a6d55cd10b6a.jpg',
    star: 3,
    reviewers: 10,
  },
  {
    name: '콥케 파인 토니 포트 와인',
    image:
      'https://cafe24.poxo.com/ec01/letsdowine/fYw07Q+e08011Z5Qzbz30yC0JvqcXWvQcBdvn52sOz689E+Ww8NvS3kIz1BovuxPSD13RAqqxECLxwIolL8rLg==/_/web/product/big/202308/62efaf4fd26fe0f92fb321fcdaf1d7b5.jpg',
    star: 4,
    reviewers: 4,
  },
  {
    name: '레돔화이트스파클링와인',
    image:
      'https://cafe24.poxo.com/ec01/lavande65/0jJurf5+JqL2mXn6P+LWO4+ah+knlQDiTPehHkjQhdrHMqR/yJODeiUWVPDdFGeaE2COPmIXMX440F09BTcleA==/_/web/product/big/202109/6176971b9ec65be37840a6d55cd10b6a.jpg',
    star: 3,
    reviewers: 10,
  },
];

function Reviews() {
  const handleSort = (value: string) => {
    console.log(value);
  };
  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />

      <GridTopBar>
        <Dropdown onSelect={handleSort} sortOptions={sortReviewOptions} />
        <CategoryTitle>사용자 추천 순</CategoryTitle>
      </GridTopBar>
      <StyleAlcoholReviewsGrid>
        {dummyData.map((data, index) => (
          <Alcohol key={index} alcol={data} />
        ))}
      </StyleAlcoholReviewsGrid>
    </ReviewsMainContainer>
  );
}

export default Reviews;
