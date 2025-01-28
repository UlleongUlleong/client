import React from 'react';
import styled from 'styled-components';
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go';

const SelectTheme = () => {
  return (
    <SelectThemeStyle>
      <div className="container">
        <div className="title">테마 선택</div>
        <div className="theme">
          <div className="btn">
            <button onClick={() => {}}>
              <GoTriangleLeft />
            </button>
          </div>
          <div>
            <img src="src/assets/images/theme-sample1.png" />
          </div>
          <div className="btn">
            <button onClick={() => {}}>
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

      img {
        width: 100%;
        height: auto;
        border-radius: 4px;
      }

      svg {
        font-size: 40px;
      }
    }
  }
`;

export default SelectTheme;
