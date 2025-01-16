import React from 'react';
import styled from 'styled-components';
import { IAlcohol } from '../models/alcohol';

export const CardContainer = styled.div`
  cursor: pointer;
  width: 200px;
  background-color: white;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const CardBottom = styled.div`
  flex-direction: column;
  padding: 10px;
  display: flex;
`;
export const AlcoholImage = styled.div`
  margin: 0 auto;
  height: 250px;
  @media (max-width: 468px) {
    height: 225px;
    width: 150px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }
`;

export const ChatTitleBox = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 20px;
  text-align: left;

  @media (max-width: 468px) {
    width: 210px;
  }
`;

export const Title = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-weight: 600;
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  color: #000000;
  @media (max-width: 468px) {
    font-size: 13px;
  }
`;

export const ChatDescription = styled.div`
  margin: 0 auto;
  width: 100%;

  @media (max-width: 468px) {
    width: 210px;
  }
`;

export const Text = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-size: 12px;
  color: #000000;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 468px) {
    font-size: 11px;
  }
`;

export const ReviewPoint = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-size: 12px;
  color: #000000;
  text-align: right;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 468px) {
    font-size: 11px;
  }
`;

function Alcohol({ alcol }: { alcol: IAlcohol }) {
  return (
    <>
      <CardContainer key={alcol.name}>
        <AlcoholImage>
          <img src={alcol.image} alt={alcol.name} />
        </AlcoholImage>
        <CardBottom>
          <ChatTitleBox>
            <Title>{alcol.name}</Title>
          </ChatTitleBox>
          <ChatDescription>
            <Text>★★★★☆</Text>
            <ReviewPoint>{alcol.star}점</ReviewPoint>
          </ChatDescription>
        </CardBottom>
      </CardContainer>
    </>
  );
}

export default Alcohol;
