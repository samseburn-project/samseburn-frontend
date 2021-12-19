import React, { useState, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";

import { Box } from "@mui/material";
import Hero from "./Hero";
import HowToUse from "./HowToUse";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import ChallengeList from "./ChallengeList";

const Main = () => {
	const [challenges, setChallenges] = useState([]);
	const [sortBy, setSortBy] = useState("createdAt");

	const fetchChallenges = async () => {
		try {
			const { data } = await axios.get("/challenges?kind=All");
			setChallenges(data);
		} catch (e) {
			console.error(e);
		}
	};

	const fetchFillter = async () => {
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

	useEffect(() => {
		fetchChallenges();
		fetchFillter();
	}, [sortBy]);

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
					<ChallengeList challenges={challenges} />
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
