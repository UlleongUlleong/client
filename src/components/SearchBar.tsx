import React, { useState } from 'react';

import { ChevronDown, ChevronUp, Search } from 'lucide-react';
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
import { CategoryType, ICategory } from '../types/Category.ts';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { dummyChatRooms } from './ChatRoom.tsx';

const moodTypeCategories: ICategory[] = [
  { id: 1, name: '혼술', type: 'mood' },
  { id: 2, name: '반주', type: 'mood' },
  { id: 3, name: '시끌시끌', type: 'mood' },
  { id: 4, name: '조용한', type: 'mood' },
  { id: 5, name: '고민상담', type: 'mood' },
  { id: 6, name: '레시피공유', type: 'mood' },
];
interface searchBarProps {
  isMoodCategories: boolean;
}
const alcoholTypeCategories: ICategory[] = [
  { id: 7, name: '소주', type: 'alcohol' },
  { id: 8, name: '맥주', type: 'alcohol' },
  { id: 9, name: '와인', type: 'alcohol' },
  { id: 10, name: '칵테일', type: 'alcohol' },
  { id: 11, name: '하이볼', type: 'alcohol' },
  { id: 12, name: '전통주', type: 'alcohol' },
  { id: 13, name: '위스키', type: 'alcohol' },
];

const SearchBar = ({ isMoodCategories }: searchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const toggleCategory = (category: ICategory) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some((cat) => cat.id === category.id);
      if (isSelected) {
        return prev.filter((cat) => cat.id !== category.id);
      }
      return [...prev, category];
    });
  };

  const handleSearch = () => {
    navigate('/chatlist', {
      state: {
        chatRoom: dummyChatRooms,
        sort: '검색 결과',
        category: selectedCategories,
      },
    });

    onSearch(selectedCategories, searchText);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <TopBar>
      <Container>
        <SearchWrapper>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <ChevronUp size={20} color="black" />
            ) : (
              <ChevronDown size={20} color="black" />
            )}
          </IconButton>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <IconButton onClick={handleSearch}>
            <Search size={20} color="black" />
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
            {isMoodCategories ? (
              <>
                <CategoryGrid>
                  {moodTypeCategories.map((category) => (
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
              </>
            ) : (
              <></>
            )}

            <CategoryGrid>
              {alcoholTypeCategories.map((category) => (
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

      <LoginButton onClick={navigateToLogin}>로그인</LoginButton>
    </TopBar>
  );
};

export default SearchBar;
