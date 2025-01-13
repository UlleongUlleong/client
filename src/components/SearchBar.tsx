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

import { ChevronDown, Search } from 'lucide-react';
import {
  TopBar,
  LoginButton,
  Container,
  ConfirmButton,
  SearchWrapper,
  Dropdown,
  SelectedTagsSection,
  CategoryTag,
  CategorySection,
  SectionTitle,
  CategoryGrid,
  CategoryItem,
  DeleteIcon,
  Input,
  IconButton,
} from '../styles/SearchBar.ts';

import Divider from '@mui/material/Divider';

interface Category {
  id: number;
  name: string;
}

interface SearchBarProps {
  onSearch: (categories: Category[], searchText: string) => void;
}

const moodcategories: Category[] = [
  { id: 1, name: '혼술' },
  { id: 2, name: '반주' },
  { id: 3, name: '시끌시끌' },
  { id: 4, name: '조용한' },
  { id: 5, name: '고민상담' },
  { id: 6, name: '레시피공유' },
];

const alchoholcategories: Category[] = [
  { id: 7, name: '소주' },
  { id: 8, name: '맥주' },
  { id: 9, name: '와인' },
  { id: 10, name: '칵테일' },
  { id: 11, name: '하이볼' },
  { id: 12, name: '전통주' },
  { id: 13, name: '위스키' },
];

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
              {moodcategories.map((category) => (
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
            <Divider />
            <CategoryGrid>
              {alchoholcategories.map((category) => (
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

      <LoginButton>Login</LoginButton>
    </TopBar>
  );
};

export default SearchBar;
