import React, { useState } from 'react';
import styled from 'styled-components';

interface KeywordButtonProps {
  keyword: string;
  size: 'small' | 'large';
}

const KeywordButton = ({ keyword, size }: KeywordButtonProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onClickBtn = () => {
    setIsClicked(!isClicked);
  };

  return (
    <KeywordButtonStyle isClicked={isClicked} onClick={onClickBtn} $size={size}>
      {keyword}
    </KeywordButtonStyle>
  );
};

interface KeywordButtonStyleProps {
  isClicked: boolean;
  $size: string;
}

const KeywordButtonStyle = styled.button<KeywordButtonStyleProps>`
  border: solid;
  border-radius: 30px;
  padding: 5px 15px;
  font-size: ${({ $size }) => ($size === 'small' ? '0.9rem' : '1rem')};
  background: ${(props) => (props.isClicked ? '#e8f0fe' : '#f5f4f4')};
  border-color: ${(props) => (props.isClicked ? '#273ec2' : '#bcbcbc')};
  border-width: 1px;
  color: ${(props) => (props.isClicked ? '#273ec2' : '#000')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #e0e0e0;
  }
`;

// ${(props) => (props.isClicked ? '2px' : '1px')};
export default KeywordButton;
