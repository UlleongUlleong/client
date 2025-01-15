import styled from 'styled-components';
import { useState } from 'react';
import React from 'react';
interface DropdownProps {
  onSelect: (value: string) => void;
}

const DropdownContainer = styled.div`
  position: relative;
  top: 45px;
  right: 30px;
  font-family: 'Noto Sans KR', serif;
  position: relative;
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

const DropdownButton = styled.div<{ isOpen: boolean }>`
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

const DropdownList = styled.ul<{ isOpen: boolean }>`
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

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const sortOptions = [
  { value: 'date', label: '생성일 순' },
  { value: 'members', label: '인원 순' },
];

const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const handleSelect = (option: (typeof sortOptions)[0]) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <DropdownContainer>
      <DropdownButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption.label}
      </DropdownButton>
      <DropdownList isOpen={isOpen}>
        {sortOptions.map((option) => (
          <DropdownItem key={option.value} onClick={() => handleSelect(option)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;
