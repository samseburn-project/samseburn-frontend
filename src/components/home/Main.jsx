import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import styled from "styled-components";

import { customMedia } from "../../GlobalStyles";
import { Box, Grid, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Hero from "./Hero";
import HowToUse from "./HowToUse";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import ChallengeCard from "./ChallengeCard";

const Main = () => {
	const [loading, setLoading] = useState(true);
	const [challengeList, setChallengeList] = useState([]);
	const [challenges, setChallenges] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState("createdAt");
	const [categoryName, setCategoryName] = useState("All");
	const [totalCount, setTotalCount] = useState();
	const [searchChallenges, setSearchChallenges] = useState([]);
	const [isSearch, setIsSearch] = useState(false);
	const [searchPage, setSearchPage] = useState(1);
	const [searchHasMore, setSearchHasMore] = useState(false);
	const [searchTotalCount, setSearchTotalCount] = useState();
	const [searchKeyword, setSearchKeyword] = useState("");

	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 375,
				md: 480,
				lg: 768,
				xl: 1200,
			},
		},
	});

	const fetchMoreData = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const refreshData = () => {
		setChallenges([]);
		setHasMore(true);
		setPage(1);
	};

	const onCategory = (name) => {
		setCategoryName(name === "전체" ? "All" : name);
		refreshData();
	};

	const onSortBy = (option) => {
		setSortBy(option);
		refreshData();
	};

	const fetchSearchChallenges = async (searchKeyword) => {
		try {
			const res = await axios.get(
				"https://api.samseburn.site/challenges/search",
				{
					params: {
						search: searchKeyword,
						page: searchPage,
					},
				}
			);

			if (res.status === 200) {
				const { challengeList, totalCount } = res.data;
				setIsSearch(true);
				setSearchChallenges([...searchChallenges, ...challengeList]);
				setSearchTotalCount(totalCount);
			}
			setSearchHasMore(true);
		} catch (err) {
			console.error(err);
		}
	};

	const onSearchSubmit = async (keyword) => {
		setSearchKeyword(keyword);
		setSearchPage(1);
		setSearchChallenges([]);
		fetchSearchChallenges(keyword);
		try {
			const res = await axios.get(
				"https://api.samseburn.site/challenges/search",
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

	const fetchMoreSearchData = () => {
		setSearchPage((prevPage) => prevPage + 1);
	};

	const refreshSearch = () => {
		setSearchChallenges([]);
		setSearchPage(1);
	};

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		const fetchChallenges = async () => {
			try {
				const res = await axios.get(
					"https://api.samseburn.site/challenges",
					{
						params: {
							kind: categoryName,
							page: page,
							sortBy: sortBy,
						},
					},
					{ signal }
				);

				const { challengeList, totalCount } = res.data;

				setChallengeList(challengeList);
				setChallenges([...challenges, ...challengeList]);
				setTotalCount(totalCount);
			} catch (e) {
				console.error(e);
			}
		};

		if (isSearch) {
			if (
				searchTotalCount <= searchChallenges.length ||
				searchChallenges === []
			) {
				setSearchHasMore(false);
			}
			fetchSearchChallenges(searchKeyword);
		} else {
			if (totalCount <= challenges.length || challengeList === []) {
				setHasMore(false);
			}
			fetchChallenges();
		}

		setLoading(false);

		return () => {
			controller.abort();
		};
	}, [page, categoryName, sortBy, isSearch, searchKeyword, hasMore]);

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<CircularProgress size={70} color="warning" />
				</SpinnerContainer>
			) : (
				<MainWrapper>
					<Hero />
					<HowToUse />
					<SubWrapper>
						<Title>챌린지 리스트</Title>
						<SearchBarRow>
							<SearchBar
								onSearchSubmit={onSearchSubmit}
								onSearchBar={onSearchBar}
							/>
						</SearchBarRow>
						{isSearch &&
							(searchChallenges.length ? (
								<InfiniteScroll
									dataLength={searchChallenges.length}
									next={fetchMoreSearchData}
									hasMore={searchHasMore}
									loader={
										<Loading>
											<CircularProgress />
										</Loading>
									}
									refreshFunction={refreshSearch}
								>
									<SearchListContainer sx={{ width: "100%" }}>
										<ThemeProvider theme={theme}>
											<Grid container spacing={4}>
												{searchChallenges.map((challenge, i) => (
													<Grid item xs={12} sm={12} lg={6} xl={4} key={i}>
														<ChallengeCard
															key={challenge.challengeId}
															challenge={challenge}
														/>
													</Grid>
												))}
											</Grid>
										</ThemeProvider>
									</SearchListContainer>
								</InfiniteScroll>
							) : (
								<EmptyContainer>검색 결과가 없습니다.</EmptyContainer>
							))}
						{!isSearch && (
							<>
								<FilterRow>
									<CategoryFilter
										onCategory={onCategory}
										refreshData={refreshData}
									/>
									<SortFilter
										sortBy={sortBy}
										onSortBy={onSortBy}
										refreshData={refreshData}
									/>
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
								>
									<ListContainer sx={{ width: "100%" }}>
										<ThemeProvider theme={theme}>
											<Grid container spacing={4}>
												{challenges.map((challenge, i) => (
													<Grid item xs={12} sm={12} lg={6} xl={4} key={i}>
														<ChallengeCard
															key={challenge.challengeId}
															challenge={challenge}
														/>
													</Grid>
												))}
											</Grid>
										</ThemeProvider>
									</ListContainer>
								</InfiniteScroll>
								{loading && <CircularProgress size="small" />}
							</>
						)}
					</SubWrapper>
				</MainWrapper>
			)}
		</>
	);
};

export default Main;

const MainWrapper = styled.section`
	width: 100%;
	flex: 1;
`;

const SubWrapper = styled.article`
  width: 104rem;
  margin: 10rem auto;

  ${customMedia.lessThan("mobile")`
    width: 31.5rem;
	  margin: 4rem auto;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 31.5rem;
	  margin: 4rem auto;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    width: 42rem;
	  margin: 6rem auto;
  `}
  
	${customMedia.between("tablet", "desktop")`
    width: 66.8rem;
	  margin: 8rem auto;
  `}
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: bold;

  ${customMedia.lessThan("mobile")`
    font-size: 2rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 2rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    font-size: 2rem;
  `}
`;

const SearchListContainer = styled(Box)`
	margin-top: 6rem;
	margin-bottom: 18rem;
`;

const SearchBarRow = styled.div`
	margin-top: 3.7rem;
	display: flex;
	justify-content: center;
`;

const FilterRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 8rem;
`;

const ListContainer = styled(Box)`
	margin-top: 6rem;
	margin-bottom: 10rem;
`;

const Loading = styled.div`
	margin: 2rem 0;
	display: flex;
	justify-content: center;
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
