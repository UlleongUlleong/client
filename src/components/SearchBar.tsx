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
import { dummyChatRooms } from './ChatRoom.tsx';
import { dummyData } from '../views/pages/Reviews.tsx';
import constructWithOptions from 'styled-components/dist/constructors/constructWithOptions';
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
      }
      //다중 선택
      const isSelected = prev.some((cat) => cat.id === category.id);
      if (isSelected) {
        return prev.filter((cat) => cat.id !== category.id);
      }
      return [...prev, category];
    });
  };

  const handleSearch = () => {
    //api 호출하고 그 값을 results에에 넘겨주면 될 것 같습니다.
    if (isMoodCategories) {
      navigate('/chat-lists', {
        state: {
          chatRooms: dummyChatRooms,
          sortName: '검색 결과',
          sortValue: searchText,
          category: selectedCategories,
        },
      });
    } else {
      console.log(selectedCategories[0].name);
      const name = selectedCategories[0].name;
      navigate('/alcohol-list', {
        state: {
          alcoholsData: dummyData,
          categoryName: name,
          sortValue: searchText,
          category: selectedCategories,
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
