import React from 'react';
import styled from 'styled-components';
import KeywordButton from './keywords/KeywordButton';

interface SelectKeywordsProps {
  title: string;
}

const SelectKeywords = ({ title }: SelectKeywordsProps) => {
  const headTitle =
    title === 'register' ? '관심 키워드를 선택해주세요.(선택)' : '키워드 선택';

  const buttonSize = title === 'register' ? 'small' : 'large';

  return (
    <SelectKeywordsStyle $title={title}>
      <h4>{headTitle}</h4>
      <div>
        <div className="section">
          <div className="section-title">*주제/분위기</div>
          <div className="keywords-btn">
            <KeywordButton size={buttonSize} keyword="혼술" />
            <KeywordButton size={buttonSize} keyword="반주" />
            <KeywordButton size={buttonSize} keyword="시끌시끌" />
            <KeywordButton size={buttonSize} keyword="조용한" />
            <KeywordButton size={buttonSize} keyword="고민상담" />
            <KeywordButton size={buttonSize} keyword="레시피공유" />
          </div>
        </div>
        <div className="section">
          <div className="section-title">*주종</div>
          <div className="keywords-btn">
            <KeywordButton size={buttonSize} keyword="소주" />
            <KeywordButton size={buttonSize} keyword="맥주" />
            <KeywordButton size={buttonSize} keyword="와인" />
            <KeywordButton size={buttonSize} keyword="칵테일" />
            <KeywordButton size={buttonSize} keyword="하이볼" />
            <KeywordButton size={buttonSize} keyword="전통주" />
            <KeywordButton size={buttonSize} keyword="위스키" />
          </div>
        </div>
        {title === 'register' && (
          <>
            <div className="section">
              <div className="section-title">*기타</div>
              <div className="keywords-btn">
                <KeywordButton size={buttonSize} keyword="선택안함" />
              </div>
            </div>
          </>
        )}
      </div>
    </SelectKeywordsStyle>
  );
};

interface SelectKeywordsStyleProps {
  $title: string;
}

const SelectKeywordsStyle = styled.div<SelectKeywordsStyleProps>`
  position: relative;
  left: ${({ $title }) => ($title === 'register' ? '0%' : '10%')};
  width: ${({ $title }) => ($title === 'register' ? '100%' : '80%')};
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  h4 {
    font-size: ${({ $title }) => ($title === 'register' ? '1rem' : '1.2rem')};
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
