import React, { useState } from 'react';

import styled from 'styled-components';

import { InputBase } from '@mui/material';
import { IconButton } from '@mui/material';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as SearchDelete } from '../../assets/icons/input-delete-button.svg';

const SearchBar = ({ ...props }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    props.onSearchSubmit(searchKeyword);
  };

  const onSearchBarHandler = () => {
    setSearchKeyword('');
    props.onSearchBar(false);
  };

  return (
    <SearchBarContainer onSubmit={onSubmitHandler}>
      <StyledInputBase
        placeholder="참여하고 싶은 챌린지를 검색해보세요."
        value={searchKeyword}
        onChange={({ target: { value } }) => setSearchKeyword(value)}
      />
      {searchKeyword && (
        <IconButton onClick={onSearchBarHandler}>
          <SearchDelete
            alt="Search delete icon"
            style={{ width: '2rem', height: '2rem' }}
          />
        </IconButton>
      )}
      <IconButton type="submit">
        <Search alt="Search icon" />
      </IconButton>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.form`
  width: 40rem;
  background-color: #f6f6f6;
  border-radius: 2rem;
  display: flex;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  font-size: 1.6rem;
  padding-left: 2rem;
`;
