import React from 'react';
import { IAlcohol } from '../../models/alcohol';
import { GridTopBar } from './Home';
import { Category, CategoryTitle } from '../../styles/ChatRoomGrid';
import { Link } from 'react-router-dom';
import AlcoholSlider from '../../components/AlcoholSlider';

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

      <AlcoholSlider alcohols={alcoholsData} />
    </>
  );
}

export default AlcoholEachCategory;
