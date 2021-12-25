import React from "react";

import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import { FormControl, Select, MenuItem } from "@mui/material";

const SortFilter = ({ ...props }) => {
	const handleSortByChange = (e) => {
		props.onSortBy(e.target.value);
	};

	return (
		<FormControl sx={{ minWidth: 150 }}>
			<StyledSelect
				labelId="sortBy-select-label"
				id="sortBy-select-label"
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
	height: 4rem;
	font-size: 1.4rem;

	${customMedia.lessThan("mobile")`
    height: 3.2rem;
    font-size: 1.2rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    height: 3.2rem;
    font-size: 1.2rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    height: 3.2rem;
    font-size: 1.2rem;
  `}
`;

const StyledMenuItem = styled(MenuItem)`
	font-size: 1.4rem;

	${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.2rem;
  `}
`;
