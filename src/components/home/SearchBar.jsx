import React, { useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import { InputBase } from '@mui/material';
import { IconButton } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import ChallengeCard from './ChallengeCard';

const SearchBar = ({ ...props }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  //   const [challenges, setChallenges] = useState([]);

  //   const fetchSearchChallenges = async (searchKeyword) => {
  //     try {
  //       const res = await axios.get('/challenges/search', {
  //         params: {
  //           search: searchKeyword,
  //         },
  //       });

  //       if (res.status === 200) {
  //         console.log(res.data);
  //         setChallenges(res.data);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  const onSubmitHandler = (e) => {
    // submit시 새로고침되지 않도록 기본동작 막기
    e.preventDefault();

    props.onSearchSubmit(searchKeyword);

    // fetchSearchChallenges(searchKeyword);

    // 검색 결과가 빈 배열일 경우 '검색 결과가 없습니다' 문구 띄워주기
  };

  return (
    <SearchBarContainer onSubmit={onSubmitHandler}>
      <StyledInputBase
        placeholder="참여하고 싶은 챌린지를 검색해보세요."
        value={searchKeyword}
        onChange={({ target: { value } }) => setSearchKeyword(value)}
      />
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

const ListContainer = styled(Box)`
  margin-top: 6rem;
  margin-bottom: 18rem;
`;
