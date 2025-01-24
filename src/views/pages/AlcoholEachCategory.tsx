import React from 'react';
import { IAlcohol } from '../../models/alcohol';
import { GridTopBar } from './Home';
import { Category, CategoryTitle } from '../../styles/ChatRoomGrid';
import { Link, useParams } from 'react-router-dom';
import AlocholGird from '../../components/AlcoholGrid';

interface AlcoholEachCategoryProps {
  alcoholsData: IAlcohol[];
  categoryName: string;
  categoryId: number;
}

function AlcoholEachCategory({
  alcoholsData,
  categoryName,
  categoryId,
}: AlcoholEachCategoryProps) {
  return (
    <>
      <GridTopBar>
        <CategoryTitle>{categoryName}</CategoryTitle>
        <Category>
          <Link to={`/alcohol-lists/${categoryId}`} className="more">
            더보기
          </Link>
        </Category>
      </GridTopBar>

      <AlocholGird alcohols={alcoholsData} />
    </>
  );
}

export default AlcoholEachCategory;
