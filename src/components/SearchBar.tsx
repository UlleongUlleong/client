import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import { TopBar, StyledTextField, LoginButton } from './styles/Home';
function SearchBar() {
  return (
    <TopBar>
      <StyledTextField />
      <IconButton sx={{ margin: '20px' }}>
        <SearchOutlinedIcon sx={{ color: 'black' }} />
      </IconButton>
      <LoginButton>Login</LoginButton>
    </TopBar>
  );
}

export default SearchBar;
