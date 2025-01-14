import styled from 'styled-components';

export const TopBar = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  height: 130px;

  @media (max-width: 468px) {
    min-width: 200px;
  }
`;

export const StyledTextFields = styled.form`
  width: 50%;
  max-width: 650px;
  font-family: 'Noto Sans KR', serif;
  .input {
    width: 90%;
    border: 1px solid #bbb;
    border-radius: 5px;
    padding: 10px 12px;
    font-size: 14px;
  }
  .icon {
    position: relative;
    margin: 0;
  }
`;

export const LoginButton = styled.button`
  width: 60px;
  height: 30px;
  font-family: 'Noto Sans KR', serif;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  position: absolute;
  right: 20px;
  cursor: pointer;
`;

export const Container = styled.div`
  position: relative;
  width: 50%;
  max-width: 800px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 15px;
  background: white;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  width: 100%;
  outline: none;
  margin: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  display: flex;
  align-items: center;
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
  z-index: 1;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SelectedTagsSection = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

export const CategoryTag = styled.span`
  background: #e9e9e9;
  color: black;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background: #2b2b2b;
  }
`;

export const DeleteIcon = styled.span`
  font-size: 16px;
  position: relative;
  line-height: 1;
  bottom: 1px;
`;

export const CategorySection = styled.div`
  padding: 5px 16px;
`;

export const SectionTitle = styled.div`
  font-size: 11px;
  color: #666;
  margin-bottom: 5px;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  max-height: 250px;
  overflow-y: auto;

  @media (max-width: 1589px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1356px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1087px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 617px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  border-radius: 4px;
  @media (max-width: 470px) {
    font-size: 12px;
  }
  &:hover {
    background: #f5f5f5;
  }

  input[type='checkbox'] {
    margin-right: 8px;
  }
`;

export const ConfirmButton = styled.button`
  padding: 6px 16px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 6px;
  margin: 6px 0px;
  cursor: pointer;
  float: right;

  &:hover {
    background: #0056b3;
  }
`;
