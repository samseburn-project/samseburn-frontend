import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

import { Box, Grid } from "@mui/material";
import ChallengeCard from "./ChallengeCard";

const ChallengeList = () => {
	const [list, setList] = useState([]);

	const fetchChallenges = async () => {
		try {
			const { data } = await axios.get("/challenges?kind=All");
			console.log(data);
			setList(data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchChallenges();
	}, []);

	return (
		<ListContainer sx={{ width: "100%" }}>
			<Grid container spacing={4}>
				{list.map((challenge) => (
					<Grid item xs={4}>
						<ChallengeCard
							key={challenge.challengeId}
							id={challenge.challengeId}
							title={challenge.title}
							category={challenge.category.name}
							locationType={challenge.locationType}
							startDate={challenge.startDate}
							endDate={challenge.endDate}
							imgUrl={challenge.imgUrl}
							limitPerson={challenge.limitPerson}
							participants={challenge.participants}
						/>
					</Grid>
				))}
			</Grid>
		</ListContainer>
	);
};

export default ChallengeList;

const ListContainer = styled(Box)`
	margin-top: 6rem;
`;
