import React from "react";

import styled from "styled-components";

import { FormControl, Select, MenuItem } from "@mui/material";

const SortFilter = ({ ...props }) => {
	const handleSortByChange = (e) => {
		props.onSortBy(e.target.value);
	};

	return (
		<FormControl sx={{ minWidth: 150 }}>
			<StyledSelect
				name="sortBy"
				value={props.sortBy}
				onChange={handleSortByChange}
				displayEmpty
			>
				<StyledMenuItem value={""} disabled>
					정렬 필터
				</StyledMenuItem>
				<StyledMenuItem value={"createdAt"}>최신순</StyledMenuItem>
				<StyledMenuItem value={"inProgress"}>진행중인 챌린지</StyledMenuItem>
			</StyledSelect>
		</FormControl>
	);
};

export default SortFilter;

const StyledSelect = styled(Select)`
	font-size: 1.4rem;

	& .MuiOutlinedInput-input {
		padding: 1rem 0 1rem 1.5rem;
	}
`;

const StyledMenuItem = styled(MenuItem)`
	font-size: 1.4rem;
`;
