import React, { useEffect, useState } from "react";
import axios from "axios";

import { Grid } from "@mui/material";
import ChallengeCard from "./ChallengeCard";

const ChallengeList = () => {
	const [list, setList] = useState([]);

	const fetchChallenges = async () => {
		try {
			const { data } = await axios.get("/challenges?kind=All");
			setList(data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchChallenges();
	}, []);

	return (
		<Grid container spacing={4}>
			{list.map((challenge) => (
				<Grid item xs={4} key={challenge.challengeId}>
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
	);
};

export default ChallengeList;
