// import React from 'react';

// function SearchBar() {
//   const [search, setSearch] = React.useState('');
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   return (
//
//       <StyledTextFields>
//         <form action="/search" method="get">
//           <input className="text" type="search"></input>
//           <div className="img" onClick={(e) => handleChange(e)}>
//             <KeyboardArrowDownIcon />
//           </div>
//         </form>
//       </StyledTextFields>

//       <IconButton sx={{ margin: '20px' }}>
//         <SearchIcon sx={{ color: 'black' }} />
//       </IconButton>
//       <LoginButton>Login</LoginButton>
//     </TopBar>
//   );
// }

// export default SearchBar;

import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown, Search } from 'lucide-react';
import {
  TopBar,
  StyledTextField,
  LoginButton,
  StyledTextFields,
} from '../styles/Home.ts';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import IconButton from '@mui/material/IconButton';
interface Category {
  id: number;
  name: string;
}

interface SearchBarProps {
  onSearch: (categories: Category[], searchText: string) => void;
}

const categories: Category[] = [
  { id: 1, name: '혼술' },
  { id: 2, name: '반주' },
  { id: 3, name: '시끌시끌' },
  { id: 4, name: '조용한' },
  { id: 5, name: '고민상담' },
  { id: 6, name: '레시피공유' },
  { id: 7, name: '소주' },
  { id: 8, name: '맥주' },
  { id: 9, name: '와인' },
  { id: 10, name: '칵테일' },
  { id: 11, name: '하이볼' },
  { id: 12, name: '전통주' },
  { id: 13, name: '위스키' },
];

const Container = styled.div`
  position: relative;
  width: 50%;
  max-width: 800px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 4px;
  background: white;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  width: 100%;
  outline: none;
  margin: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  display: flex;
  align-items: center;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
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

const SelectedTagsSection = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const CategoryTag = styled.span`
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

const DeleteIcon = styled.span`
  font-size: 16px;
  position: relative;
  line-height: 1;
  bottom: 1px;
`;

const CategorySection = styled.div`
  padding: 5px 16px;
`;

const SectionTitle = styled.div`
  font-size: 11px;
  color: #666;
  margin-bottom: 5px;
`;

const CategoryGrid = styled.div`
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

const CategoryItem = styled.div`
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

const ConfirmButton = styled.button`
  padding: 6px 16px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  margin: 6px 0px;
  cursor: pointer;
  float: right;

  &:hover {
    background: #0056b3;
  }
`;
const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState('');

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some((cat) => cat.id === category.id);
      if (isSelected) {
        return prev.filter((cat) => cat.id !== category.id);
      }
      return [...prev, category];
    });
  };

  const handleSearch = () => {
    onSearch(selectedCategories, searchText);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <TopBar>
      <Container>
        <SearchWrapper>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <ChevronDown size={20} />
          </IconButton>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <IconButton onClick={handleSearch}>
            <Search size={20} />
          </IconButton>
        </SearchWrapper>

        <Dropdown isOpen={isOpen}>
          {/* 선택된 태그 섹션 */}
          <SelectedTagsSection>
            {selectedCategories.map((cat) => (
              <CategoryTag key={cat.id} onClick={() => toggleCategory(cat)}>
                {cat.name}
                <DeleteIcon>×</DeleteIcon>
              </CategoryTag>
            ))}
          </SelectedTagsSection>

          {/* 카테고리 선택 섹션 */}
          <CategorySection>
            <SectionTitle>카테고리 선택</SectionTitle>
            <CategoryGrid>
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  onClick={() => toggleCategory(category)}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.some(
                      (cat) => cat.id === category.id,
                    )}
                    readOnly
                  />
                  <span>{category.name}</span>
                </CategoryItem>
              ))}
            </CategoryGrid>
            <ConfirmButton onClick={handleConfirm}>선택</ConfirmButton>
          </CategorySection>
        </Dropdown>
      </Container>
    </TopBar>
  );
};

export default SearchBar;
