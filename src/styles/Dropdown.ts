import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  top: 25px;
  right: 30px;
  font-family: 'Noto Sans KR', serif;
  width: 100px;
  font-size: 14px;
  user-select: none;
  z-index: 4;
  float: right;
  height: 20px;
  @media (max-width: 468px) {
    right: 10px;
  }
`;

export const DropdownButton = styled.div<{ isOpen: boolean }>`
  padding: 8px 11px;
  background-color: #ffffff;
  border: 1px solid ${(props) => (props.isOpen ? '#000000' : '#e0e0e0')};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  z-index: 4;
  &:hover {
    border-color: #000000;
  }

  &::after {
    content: '';
    border: solid #000000;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: ${(props) =>
      props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: transform 0.2s ease;
  }
`;

export const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: relative;

  left: 0;
  right: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transform: ${(props) =>
    props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
  z-index: 1;
`;

export const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;
