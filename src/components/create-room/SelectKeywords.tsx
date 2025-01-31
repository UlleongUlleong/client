import React from 'react';
import styled from 'styled-components';
import KeywordButton from './keywords/KeywordButton';

interface SelectKeywordsProps {
  title: string;
  moods: number[];
  setMoods: React.Dispatch<React.SetStateAction<number[]>>;
  alcohols: number[];
  setAlcohols: React.Dispatch<React.SetStateAction<number[]>>;
}

const SelectKeywords = ({
  title,
  moods,
  setMoods,
  alcohols,
  setAlcohols,
}: SelectKeywordsProps) => {
  const headTitle =
    title === 'register' ? '관심 키워드를 선택해주세요.(선택)' : '키워드 선택';

  const buttonSize = title === 'register' ? 'small' : 'large';

  // useEffect(() => {
  //   console.log(moods, alcohols);
  // }, [moods, alcohols]);

  const handleKeywordClick = (id: number, type: 'mood' | 'alcohol') => {
    if (type === 'mood') {
      setMoods((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    } else if (type === 'alcohol') {
      setAlcohols((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    }
  };

  return (
    <SelectKeywordsStyle $title={title}>
      <h4>{headTitle}</h4>
      <div>
        <div className="section">
          <div className="section-title">*주제/분위기</div>
          <div className="keywords-btn">
            <KeywordButton
              size={buttonSize}
              keyword="혼술"
              id={1}
              onClick={() => handleKeywordClick(1, 'mood')}
              isSelected={moods.includes(1)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="반주"
              id={2}
              onClick={() => handleKeywordClick(2, 'mood')}
              isSelected={moods.includes(2)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="시끌시끌"
              id={3}
              onClick={() => handleKeywordClick(3, 'mood')}
              isSelected={moods.includes(3)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="조용한"
              id={4}
              onClick={() => handleKeywordClick(4, 'mood')}
              isSelected={moods.includes(4)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="고민상담"
              id={5}
              onClick={() => handleKeywordClick(5, 'mood')}
              isSelected={moods.includes(5)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="레시피공유"
              id={6}
              onClick={() => handleKeywordClick(6, 'mood')}
              isSelected={moods.includes(6)}
            />
          </div>
        </div>
        <div className="section">
          <div className="section-title">*주종</div>
          <div className="keywords-btn">
            <KeywordButton
              size={buttonSize}
              keyword="소주"
              id={1}
              onClick={() => handleKeywordClick(1, 'alcohol')}
              isSelected={alcohols.includes(1)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="맥주"
              id={2}
              onClick={() => handleKeywordClick(2, 'alcohol')}
              isSelected={alcohols.includes(2)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="와인"
              id={3}
              onClick={() => handleKeywordClick(3, 'alcohol')}
              isSelected={alcohols.includes(3)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="칵테일"
              id={4}
              onClick={() => handleKeywordClick(4, 'alcohol')}
              isSelected={alcohols.includes(4)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="하이볼"
              id={5}
              onClick={() => handleKeywordClick(5, 'alcohol')}
              isSelected={alcohols.includes(5)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="전통주"
              id={6}
              onClick={() => handleKeywordClick(6, 'alcohol')}
              isSelected={alcohols.includes(6)}
            />
            <KeywordButton
              size={buttonSize}
              keyword="위스키"
              id={7}
              onClick={() => handleKeywordClick(7, 'alcohol')}
              isSelected={alcohols.includes(7)}
            />
          </div>
        </div>
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
    display: flex;
    font-size: ${({ $title }) => ($title === 'register' ? '1rem' : '1.2rem')};
  }

  .section {
    width: 100%;
    padding: 10px 0;

    .section-title {
      display: flex;
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
