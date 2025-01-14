import styled from 'styled-components';
export const StyleChatRoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 340px);
  gap: 20px;
  justify-content: center;
  width: 100%;

  &::after {
    content: '';
    grid-column: 1 / -1;
    height: 0;
  }

  @media (max-width: 468px) {
    grid-template-columns: repeat(auto-fill, 245px);
    gap: 15px;
    padding: 10px;
  }
`;

export const Category = styled.div`
  .more {
    font-family: 'Noto Sans KR', serif;
    text-decoration: underline;
    font-size: 14px;
    z-index: 1;
    float: right;
    position: relative;
    right: 30px;
    top: 30px;
    cursor: pointer;
    color: black;
    &:visited {
      color: gray;
    }
    &:hover {
      color: gray;
    }
  }
`;

export const CategoryTitle = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-size: 16px;
  position: relative;
  left: 3%;
  top: 20px;
  font-weight: 600;
  border-radius: 2px;
`;
