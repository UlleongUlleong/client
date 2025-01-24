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
import {
  ICategory,
  moodTypeCategories,
  alcoholTypeCategories,
} from '../models/categories.ts';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
interface searchBarProps {
  isMoodCategories: boolean;
}

//isMoodCategories가 true면 moodTypeCategories도 보여주고
// false면 alcoholTypeCategories만 사용한다.
const SearchBar = ({ isMoodCategories }: searchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const toggleCategory = (category: ICategory) => {
    setSelectedCategories((prev) => {
      //단일 선택
      if (!isMoodCategories) {
        if (prev.some((cat) => cat.id === category.id)) {
          return [];
        }
        return [category];
      } else {
        //다중 선택
        const isSelected = prev.some((cat) => cat.name === category.name);
        if (isSelected) {
          return prev.filter((cat) => cat.name !== category.name);
        }
        return [...prev, category];
      }
    });
  };

  const handleSearch = () => {
    // const alcoholCategories = selectedCategories.filter(
    //   (category) => category.type === 'alcohol',
    // );
    // const alcoholCategoryId = alcoholCategories.map((category) => category.id);
    // const moodCategories = selectedCategories.filter(
    //   (category) => category.type === 'mood',
    // );
    // const moodCategoryId = moodCategories.map((category) => category.id);
    if (isMoodCategories) {
      navigate('/chat-lists/results', {
        state: {
          selectedCategories,
          searchText: searchText,
        },
      });
    } else {
      const categoryId = selectedCategories[0].id;
      navigate('/alcohol-lists/results', {
        state: {
          sort: 'name',
          categoryId: categoryId,
          searchText,
        },
      });
    }
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
              <CategoryTag key={cat.name} onClick={() => toggleCategory(cat)}>
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
                      key={category.name}
                      onClick={() => toggleCategory(category)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.some(
                          (cat) => cat.name === category.name,
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
                  key={category.name}
                  onClick={() => toggleCategory(category)}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.some(
                      (cat) => cat.name === category.name,
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
