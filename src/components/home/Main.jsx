import React, { useState, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";

import { Grid, Box } from "@mui/material";
import Hero from "./Hero";
import Contents from "./Contents";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import ChallengeList from './ChallengeList';

const Main = () => {
	const [sortBy, setSortBy] = useState("createdAt");

	useEffect(() => {
		fetchData();
	}, [sortBy]);

	const fetchData = async () => {
		try {
			const res = await axios.get("/challenges/filter", {
				params: {
					sortBy: sortBy,
				},
			});
			console.log(res);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Hero />
			<Contents />
			<Wrapper>
				<Title>챌린지 리스트</Title>
				<SearchBarRow>
					<SearchBar />
				</SearchBarRow>
				<FilterRow>
					<CategoryFilter />
					<SortFilter sortBy={sortBy} setSortBy={setSortBy} />
				</FilterRow>
				<ChallengeList />
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

const ListRow = styled(Box)`
	margin-top: 6rem;
`;

const SearchBarRow = styled.div`
  margin-top: 3.7rem;
  display: flex;
  justify-content: center;
`;
