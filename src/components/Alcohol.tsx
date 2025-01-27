import React from 'react';
import { IAlcohol } from '../models/alcohol';
import {
  CardContainer,
  CardBottom,
  ChatTitleBox,
  Title,
  ChatDescription,
  Star,
  ReviewPoint,
  AlcoholImage,
  Reviewer,
} from '../styles/Alcohol';
import { useNavigate } from 'react-router-dom';
function Alcohol({ alcohol: alcohol }: { alcohol: IAlcohol }) {
  const navigate = useNavigate();
  const gotoDetailPage = () => {
    navigate(`/alcohol/${alcohol.id}`);
  };
  const { imageUrl, name, reviewCount, scoreAverage } = alcohol;

  return (
    <CardContainer key={alcohol.name} onClick={gotoDetailPage}>
      <AlcoholImage>
        {
          <img
            src={imageUrl ? imageUrl : '/assets/image/default-image.png'}
            alt={name}
          />
        }
      </AlcoholImage>
      <CardBottom>
        <ChatTitleBox>
          <Title>{name}</Title>
        </ChatTitleBox>
        <ChatDescription>
          <Star>★★★★☆</Star>
          <Reviewer>{reviewCount}명의 평가</Reviewer>
          <ReviewPoint>{scoreAverage}</ReviewPoint>
        </ChatDescription>
      </CardBottom>
    </CardContainer>
  );
}

export default Alcohol;
