import React, { useState } from "react";

import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import { InputBase, IconButton } from "@mui/material";

import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as SearchDelete } from "../../assets/icons/input-delete-button.svg";

const SearchBar = ({ ...props }) => {
	const [searchKeyword, setSearchKeyword] = useState("");

	const onSubmitHandler = (e) => {
		e.preventDefault();

		props.onSearchSubmit(searchKeyword);
	};

	const onSearchBarHandler = () => {
		setSearchKeyword("");
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
						className="home-search-delete"
						alt="Search delete icon"
						style={{ width: "2rem", height: "2rem" }}
					/>
				</IconButton>
			)}
			<IconButton type="submit">
				<Search className="home-search" alt="Search icon" />
			</IconButton>
		</SearchBarContainer>
	);
};

export default SearchBar;

const SearchBarContainer = styled.form`
	width: 50rem;
  padding: 0.3rem;
	background-color: #f6f6f6;
	border-radius: 2rem;
  display: flex;
  
  	${customMedia.lessThan("mobile")`
   	  width: 40rem;
    `}

  	${customMedia.between("mobile", "lgMobile")`
   	  width: 40rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
   	  width: 40rem;
    `}

    ${customMedia.between("tablet", "desktop")`
      width: 50rem;
      padding: 0.5rem;
    `}

	.home-search {
		${customMedia.lessThan("mobile")`
      width: 1.6rem;
      height: 1.6rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      width: 1.6rem;
      height: 1.6rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
      width: 1.8rem;
      height: 1.8rem;
    `}

  ${customMedia.between("tablet", "desktop")`
      width: 2rem;
      height: 2rem;
    `}
	}

	.home-search-delete {
		${customMedia.lessThan("mobile")`
      width: 1.6rem;
      height: 1.6rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      width: 1.6rem;
      height: 1.6rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
      width: 1.8rem;
      height: 1.8rem;
    `}

    ${customMedia.between("tablet", "desktop")`
      width: 2rem;
      height: 2rem;
    `}
	}
`;

const StyledInputBase = styled(InputBase)`
	flex: 1;
	font-size: 2rem;
	padding-left: 2rem;

	${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.4rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 1.6rem;
  `}
`;
