import React from 'react';
import styled from 'styled-components';
import KeywordButton from './keywords/KeywordButton';

const SelectKeywords = () => {
  return (
    <SelectKeywordsStyle>
      <h4>키워드 선택</h4>
      <div>
        <div className="section">
          <div className="section-title">*주제/분위기</div>
          <div className="keywords-btn">
            <KeywordButton keyword="혼술" />
            <KeywordButton keyword="반주" />
            <KeywordButton keyword="시끌시끌" />
            <KeywordButton keyword="조용한" />
            <KeywordButton keyword="고민상담" />
            <KeywordButton keyword="레시피공유" />
          </div>
        </div>
        <div className="section">
          <div className="section-title">*주종</div>
          <div className="keywords-btn">
            <KeywordButton keyword="소주" />
            <KeywordButton keyword="맥주" />
            <KeywordButton keyword="와인" />
            <KeywordButton keyword="칵테일" />
            <KeywordButton keyword="하이볼" />
            <KeywordButton keyword="전통주" />
            <KeywordButton keyword="위스키" />
          </div>
        </div>
      </div>
    </SelectKeywordsStyle>
  );
};

const SelectKeywordsStyle = styled.div`
  position: relative;
  left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  h4 {
    font-size: 1.2rem;
  }

  .section {
    width: 100%;
    padding: 10px 0;

    .section-title {
      padding-bottom: 8px;
      font-size: 0.9rem;
      font-weight: light;
    }
  }

  .keywords-btn {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export default SelectKeywords;
