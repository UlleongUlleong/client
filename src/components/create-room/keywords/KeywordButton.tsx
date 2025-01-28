import React from 'react';
import styled from 'styled-components';

interface KeywordButtonProps {
  keyword: string;
  id: number;
  onClick: () => void;
  isSelected: boolean;
  size: 'small' | 'large';
}

const KeywordButton = ({
  keyword,
  onClick,
  isSelected,
  size,
}: KeywordButtonProps) => {
  return (
    <KeywordButtonStyle onClick={onClick} isSelected={isSelected} size={size}>
      {keyword}
    </KeywordButtonStyle>
  );
};

interface KeywordButtonStyleProps {
  isSelected: boolean;
  size: 'small' | 'large';
}

const KeywordButtonStyle = styled.button<KeywordButtonStyleProps>`
  border: solid;
  border-radius: 30px;
  padding: 5px 15px;
  font-size: ${({ size }) => (size === 'small' ? '0.9rem' : '1rem')};
  background: ${({ isSelected }) => (isSelected ? '#e8f0fe' : '#f5f4f4')};
  border-color: ${({ isSelected }) => (isSelected ? '#273ec2' : '#bcbcbc')};
  border-width: 1px;
  color: ${({ isSelected }) => (isSelected ? '#273ec2' : '#000')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#d7e4fc' : '#e0e0e0')};
  }
`;

export default KeywordButton;
