import React from 'react';
import { IAlcohol } from '../../models/alcohol';
import { GridTopBar } from './Home';
import { Category, CategoryTitle } from '../../styles/ChatRoomGrid';
import { Link } from 'react-router-dom';
import AlocholGird from '../../components/AlocholGrid';
interface AlcoholEachCategoryProps {
  alcoholsData: IAlcohol[];
  categoryName: string;
}

function AlcoholEachCategory({
  alcoholsData,
  categoryName,
}: AlcoholEachCategoryProps) {
  return (
    <>
      <GridTopBar>
        <CategoryTitle>{categoryName}</CategoryTitle>
        <Category>
          <Link
            to="/alcohol-list"
            className="more"
            state={{ alcoholsData: alcoholsData, categoryName: categoryName }}
          >
            더보기
          </Link>
        </Category>
      </GridTopBar>
      <AlocholGird alcohols={alcoholsData} />
    </>
  );
}

export default AlcoholEachCategory;
