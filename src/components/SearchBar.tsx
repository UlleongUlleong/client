import React, { useEffect, useState } from 'react';

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
import { ICategory } from '../models/categories.ts';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { isLogin } from '../api/user.ts';

import { useCategoryStore } from '../store/useCategoryStore.ts';
import { logoutApi } from '../api/users/loginApi.ts';
interface searchBarProps {
  isMoodCategories: boolean;
}

//isMoodCategories가 true면 moodTypeCategories도 보여주고
// false면 alcoholTypeCategories만 사용한다.
const SearchBar = ({ isMoodCategories }: searchBarProps) => {
  const alcoholCategories = useCategoryStore(
    (state) => state.alcoholCategories,
  );
  const moodCategories = useCategoryStore((state) => state.moodCategories);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMoodCategories, setSelectedMoodCategories] = useState<
    ICategory[]
  >([]);
  const [selectedAlcoholCategories, setSelectedAlcoholCategories] = useState<
    ICategory[]
  >([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const getUserLogin = async () => {
      const user = await isLogin();
      setUserLogin(user);
    };

    getUserLogin(); // Call the async function
  }, []);
  const toggleAlcoholCategory = (category: ICategory) => {
    if (isMoodCategories) {
      setSelectedAlcoholCategories((prev) => {
        const isSelected = prev.some((cat) => cat.name === category.name);
        if (isSelected) {
          return prev.filter((cat) => cat.name !== category.name);
        }
        return [...prev, category];
      });
    } else {
      setSelectedAlcoholCategories((prev) => {
        if (prev.some((cat) => cat.id === category.id)) {
          return [];
        }
        return [category];
      });
    }
  };
  const toggleMoodCategory = (category: ICategory) => {
    setSelectedMoodCategories((prev) => {
      const isSelected = prev.some((cat) => cat.name === category.name);
      if (isSelected) {
        return prev.filter((cat) => cat.name !== category.name);
      }
      return [...prev, category];
    });
  };

  const handleSearch = () => {
    if (isMoodCategories) {
      navigate('/chat-lists/results', {
        state: {
          alcoholCategory: selectedAlcoholCategories,
          moodCategory: selectedMoodCategories,
          searchText: searchText,
        },
      });
    } else {
      const categoryId = selectedAlcoholCategories[0]?.id || 0;
      navigate('/alcohol-lists/results', {
        state: {
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
  const navigateToLogout = () => {
    logoutApi();
    setUserLogin(false);
    navigate('/');
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

        <Dropdown $isOpen={isOpen}>
          {/* 선택된 태그 섹션 */}
          <SelectedTagsSection>
            {[...selectedMoodCategories].map((cat) => (
              <CategoryTag
                key={cat.name}
                onClick={() => toggleMoodCategory(cat)}
              >
                {cat.name}
                <DeleteIcon>×</DeleteIcon>
              </CategoryTag>
            ))}{' '}
            {[...selectedAlcoholCategories].map((cat) => (
              <CategoryTag
                key={cat.name}
                onClick={() => toggleAlcoholCategory(cat)}
              >
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
                  {moodCategories.map((category) => (
                    <CategoryItem
                      key={category.name}
                      onClick={() => toggleMoodCategory(category)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMoodCategories.some(
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
              {alcoholCategories.map((category) => (
                <CategoryItem
                  key={category.name}
                  onClick={() => toggleAlcoholCategory(category)}
                >
                  <input
                    type="checkbox"
                    checked={selectedAlcoholCategories.some(
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

      {userLogin ? (
        <LoginButton onClick={navigateToLogout}>로그아웃</LoginButton>
      ) : (
        <LoginButton onClick={navigateToLogin}>로그인</LoginButton>
      )}
    </TopBar>
  );
};

export default SearchBar;
