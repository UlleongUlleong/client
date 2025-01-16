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
function Alcohol({ alcol }: { alcol: IAlcohol }) {
  return (
    <CardContainer key={alcol.name}>
      <AlcoholImage>
        <img src={alcol.image} alt={alcol.name} />
      </AlcoholImage>
      <CardBottom>
        <ChatTitleBox>
          <Title>{alcol.name}</Title>
        </ChatTitleBox>
        <ChatDescription>
          <Star>★★★★☆</Star>
          <Reviewer>{alcol.reviewers}명의 평가</Reviewer>
          <ReviewPoint>{alcol.star}</ReviewPoint>
        </ChatDescription>
      </CardBottom>
    </CardContainer>
  );
}

export default Alcohol;
