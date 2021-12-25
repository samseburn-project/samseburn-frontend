import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';

import { Box, Grid, CircularProgress } from '@mui/material';
import Hero from './Hero';
import HowToUse from './HowToUse';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import ChallengeCard from './ChallengeCard';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [categoryName, setCategoryName] = useState('All');
  const [totalCount, setTotalCount] = useState();
  const [searchChallenges, setSearchChallenges] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get('https://api.samseburn.site/challenges', {
        params: {
          kind: categoryName,
          page: page,
          sortBy: sortBy,
        },
      });

      const { challengeList, totalCount } = res.data;

      setChallenges([...challenges, ...challengeList]);
      setTotalCount(totalCount);
      setHasMore(true);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const onCategory = (name) => {
    setCategoryName(name === '전체' ? 'All' : name);
    setPage(1);
    setChallenges([]);
  };

  const onSortBy = (option) => {
    setSortBy(option);
    setPage(1);
    setChallenges([]);
  };

  const refresh = () => {
    setPage(1);
    setChallenges([]);
  };

  const onSearchSubmit = async (searchKeyword) => {
    try {
      // const res = await axios.get(
      // 	"https://api.samseburn.site/challenges/search",
      // 	{
      // 		params: {
      // 			search: searchKeyword,
      // 		},
      // 	}
      // );

      const res = await axios.get(
        'https://api.samseburn.site/challenges/search',
        {
          params: {
            search: searchKeyword,
            page: 1,
          },
        }
      );

      if (res.status === 200) {
        console.log(res.data);
        setIsSearch(true);
        setSearchChallenges(res.data.challengeList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSearchBar = (bool) => {
    setIsSearch(bool);
  };

  useEffect(() => {
    let controller = new AbortController();
    if (totalCount === challenges.length || challenges === []) {
      setHasMore(false);
      return;
    }
    fetchChallenges();
    setLoading(false);

    return () => controller.abort();
  }, [page, sortBy, categoryName]);

  return (
    <>
      {loading ? (
        <SpinnerContainer>
          <CircularProgress size={70} color="warning" />
        </SpinnerContainer>
      ) : (
        <>
          <Hero />
          <HowToUse />
          <Wrapper>
            <Title>챌린지 리스트</Title>
            <SearchBarRow>
              <SearchBar
                onSearchSubmit={onSearchSubmit}
                onSearchBar={onSearchBar}
              />
            </SearchBarRow>
            {isSearch && (
              <SearchListContainer sx={{ width: '100%' }}>
                {searchChallenges.length ? (
                  <Grid container spacing={4}>
                    {searchChallenges.map((challenge) => (
                      <Grid item xs={4} key={challenge.challengeId}>
                        <ChallengeCard
                          key={challenge.challengeId}
                          challenge={challenge}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <EmptyContainer>검색 결과가 없습니다.</EmptyContainer>
                )}
              </SearchListContainer>
            )}
            {!isSearch && (
              <>
                <FilterRow>
                  <CategoryFilter onCategory={onCategory} />
                  <SortFilter sortBy={sortBy} onSortBy={onSortBy} />
                </FilterRow>
                <InfiniteScroll
                  dataLength={challenges.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <Loading>
                      <CircularProgress />
                    </Loading>
                  }
                  refreshFunction={refresh}
                >
                  <ListContainer sx={{ width: '100%' }}>
                    <Grid container spacing={4}>
                      {challenges.map((challenge, i) => (
                        <Grid item xs={4} key={i}>
                          <ChallengeCard
                            key={challenge.challengeId}
                            challenge={challenge}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </ListContainer>
                </InfiniteScroll>
              </>
            )}
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Main;

const Wrapper = styled.section`
  width: 104rem;
  margin: 10rem auto;
  flex: 1;
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8rem;
`;

const SearchBarRow = styled.div`
  margin-top: 3.7rem;
  display: flex;
  justify-content: center;
`;

const ListContainer = styled(Box)`
  margin-top: 6rem;
  margin-bottom: 18rem;
`;

const Loading = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
`;

const SearchListContainer = styled(Box)`
  margin-top: 6rem;
  margin-bottom: 18rem;
`;

const EmptyContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin: 8rem 0;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
