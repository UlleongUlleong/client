import React from 'react';
import styled from 'styled-components';
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go';

interface SelecteThemeProps {
  themeId: number;
  setThemeId: React.Dispatch<React.SetStateAction<number>>;
}

const SelectTheme = ({ themeId, setThemeId }: SelecteThemeProps) => {
  const handleClickButton = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setThemeId((prev) => (prev === 1 ? 9 : prev - 1));
    } else {
      setThemeId((prev) => (prev === 9 ? 1 : prev + 1));
    }
  };

  return (
    <SelectThemeStyle>
      <div className="container">
        <div className="title">테마 선택</div>
        <div className="theme">
          <div className="btn">
            <button onClick={() => handleClickButton('left')}>
              <GoTriangleLeft />
            </button>
          </div>
          <div className="img-container">
            <img src={`/assets/image/chatTheme-small/theme0${themeId}.webp`} />
          </div>
          <div className="btn">
            <button onClick={() => handleClickButton('right')}>
              <GoTriangleRight />
            </button>
          </div>
        </div>
      </div>
    </SelectThemeStyle>
  );
};

const SelectThemeStyle = styled.div`
  display: flex;
  justify-content: center;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  .title {
    display: flex;
    position: relative;
    left: 10%;
    font-size: 1.2rem;
    font-weight: bold;
    padding-bottom: 10px;
  }

  .container {
    width: 100%;
    position: relative;

    .theme {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .btn {
        flex-shrink: 0;
        width: 10%;
      }

      svg {
        font-size: 40px;
      }
    }
  }

  .img-container {
    width: 80%;

    img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
  }
`;

export default SelectTheme;
