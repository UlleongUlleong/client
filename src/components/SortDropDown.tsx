import {
  DropdownButton,
  DropdownContainer,
  DropdownItem,
  DropdownList,
} from '../styles/Dropdown';
import { useState } from 'react';
import React from 'react';
import { ISortOption } from '../models/dropDownOption';
interface DropdownProps {
  onSelect: (sortType: string) => void;
}

interface DropdownProps {
  onSelect: (sortType: string) => void;
  sortOptions: ISortOption[];
}

const Dropdown: React.FC<DropdownProps> = ({
  onSelect,
  sortOptions,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pageKey = `selectedOption_${window.location.pathname}`;
  const [selectedOption, setSelectedOption] = useState(() => {
    const defaultOption = sortOptions[0];
    const savedOption = localStorage.getItem(pageKey);
    return savedOption
      ? sortOptions.find((option) => option.value === savedOption) ||
          defaultOption
      : defaultOption;
  });

  const handleSelect = (option: (typeof sortOptions)[0]) => {
    setSelectedOption(option);
    setIsOpen(false);
    localStorage.setItem(pageKey, option.value);
    onSelect(option.value);
  };

  const filteredOptions = sortOptions.filter(
    (option) => option.value !== selectedOption?.value,
  );

  return (
    <DropdownContainer>
      <DropdownButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption.label}
      </DropdownButton>
      <DropdownList isOpen={isOpen}>
        {filteredOptions.map((option) => (
          <DropdownItem key={option.value} onClick={() => handleSelect(option)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;
