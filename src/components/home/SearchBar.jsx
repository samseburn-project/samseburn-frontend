import React from "react";

import { InputBase } from "@mui/material";
import { IconButton } from "@mui/material";

import styled from "styled-components";

import { ReactComponent as Search } from "../../assets/icons/search.svg";

const SearchBar = () => {
	return (
		<SearchBarContainer>
			<StyledInputBase placeholder="참여하고 싶은 챌린지를 검색해보세요." />
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
