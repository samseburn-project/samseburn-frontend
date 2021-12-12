import React from "react";
import styled from "styled-components";

import Navbar from "../common/Navbar";
import Hero from "./Hero";
import Contents from "./Contents";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import ChallengeCard from "./ChallengeCard";

const Main = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<Contents />
			<Wrapper>
				<Title>챌린지 리스트</Title>
				<SearchBarRow>
					<SearchBar />
				</SearchBarRow>
				<FilterRow>
					<CategoryFilter />
					<SortFilter />
				</FilterRow>
				<ChallengeCard />
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
