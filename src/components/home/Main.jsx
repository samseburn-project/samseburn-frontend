import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import styled from "styled-components";

import { Box, Grid, CircularProgress } from "@mui/material";
import Hero from "./Hero";
import HowToUse from "./HowToUse";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import ChallengeCard from "./ChallengeCard";

const Main = () => {
	const [challenges, setChallenges] = useState([]);
	const [sortBy, setSortBy] = useState("createdAt");
	const [hasMore, setHasMore] = useState(false);
	const [page, setPage] = useState(1);
	const [categoryName, setCategoryName] = useState("All");
	const [totalCount, setTotalCount] = useState();

	const fetchChallenges = async (page) => {
		try {
			const res = await axios.get("/challenges", {
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
		setCategoryName(name === "전체" ? "All" : name);
		// setPage(1);
		setChallenges([]);
	};

	const refresh = () => {
		setChallenges([]);
		setPage(1);
	};

	useEffect(() => {
		if (totalCount === challenges.length) {
			setHasMore(false);
			console.log("api end");
			return;
		}
		fetchChallenges(page);
	}, [page]);

	console.log(challenges);
	console.log(hasMore);

	return (
		<>
			<Hero />
			<HowToUse />
			<Wrapper>
				<Title>챌린지 리스트</Title>
				<SearchBarRow>
					<SearchBar />
				</SearchBarRow>
				<FilterRow>
					<CategoryFilter onCategory={onCategory} />
					<SortFilter sortBy={sortBy} setSortBy={setSortBy} />
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
					<ListContainer sx={{ width: "100%" }}>
						<Grid container spacing={4}>
							{challenges.map((challenge) => (
								<Grid item xs={4} key={challenge.challengeId}>
									<ChallengeCard
										key={challenge.challengeId}
										challengeId={challenge.challengeId}
										title={challenge.title}
										category={challenge.category}
										locationType={challenge.locationType}
										challengeStartDate={challenge.challengeStartDate}
										challengeEndDate={challenge.challengeEndDate}
										imgUrl={challenge.imgUrl}
										limitPerson={challenge.limitPerson}
										participants={challenge.participants}
									/>
								</Grid>
							))}
						</Grid>
					</ListContainer>
				</InfiniteScroll>
			</Wrapper>
		</>
	);
};

export default Main;

const Wrapper = styled.section`
	width: 104rem;
	margin: 10rem auto;
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
