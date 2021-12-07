import React, { useState } from "react";
import styled from "styled-components";
import { FormControl, Select, MenuItem } from "@mui/material";

const SortFilter = () => {
	const [sortBy, setSortBy] = useState("");

	const handleChange = (e) => {
		setSortBy(e.target.value);
	};

	return (
		<FormControl sx={{ minWidth: 150 }}>
			<StyledSelect
				name="sortBy"
				value={sortBy}
				onChange={handleChange}
				displayEmpty
			>
				<StyledMenuItem value={""} disabled>
					정렬 필터
				</StyledMenuItem>
				<StyledMenuItem value={"newest"}>최신순</StyledMenuItem>
				<StyledMenuItem value={"in-progress"}>진행중인 챌린지</StyledMenuItem>
			</StyledSelect>
		</FormControl>
	);
};

export default SortFilter;

const StyledSelect = styled(Select)`
	font-size: 1.4rem;

	.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
		padding: 1rem 0 1rem 1.5rem;
	}
`;

const StyledMenuItem = styled(MenuItem)`
	font-size: 1.4rem;
`;
