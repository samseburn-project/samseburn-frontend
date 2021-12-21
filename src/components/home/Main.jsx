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

	const fetchChallenges = async (pageNum) => {
		try {
			const { data } = await axios.get("/challenges", {
				params: {
					kind: "All",
					page: pageNum,
				},
			});
			setChallenges((prev) => [...prev, ...data]);
			setHasMore(true);
		} catch (e) {
			console.error(e);
		}
	};

	const fetchFilter = async () => {
		try {
			await axios.get("/challenges/filter", {
				params: {
					sortBy: sortBy,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	const fetchMoreData = () => {
		setPage((prev) => prev + 1);
	};

	useEffect(() => {
		fetchChallenges(page);
		fetchFilter();

		return () => {
			setHasMore(false);
		};
	}, [page, sortBy]);

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
					<CategoryFilter />
					<SortFilter sortBy={sortBy} setSortBy={setSortBy} />
				</FilterRow>
				<ListContainer sx={{ width: "100%" }}>
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
						<Grid container spacing={4}>
							{challenges.map((challenge) => (
								<Grid item xs={4} key={challenge.challengeId}>
									<ChallengeCard
										key={challenge.challengeId}
										challengeId={challenge.challengeId}
										title={challenge.title}
										category={challenge.category.name}
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
					</InfiniteScroll>
				</ListContainer>
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
