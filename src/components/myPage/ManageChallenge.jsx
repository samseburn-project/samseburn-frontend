import React from "react";

import styled from "styled-components";

import { Grid } from "@mui/material";
import RegisterChallengeCard from "./RegisterChallengeCard";

function ManageChallenge({ ...props }) {
	return (
		<ManageChallengeBox>
			{props?.userCreateChallengeList.length === 0 ? (
				<EmptyContainer>개설한 챌린지가 없습니다</EmptyContainer>
			) : (
				<Grid container>
					{props?.userCreateChallengeList.map((challenge) => (
						<Grid item xs={6} key={challenge.challengeId}>
							<RegisterChallengeCard
								key={challenge.challengeId}
								challengeId={challenge.challengeId}
								title={challenge.title}
								imgUrl={challenge.imgUrl}
								category={challenge.category}
								locationType={challenge.locationType}
								challengeStartDate={challenge.challengeStartDate}
								challengeEndDate={challenge.challengeEndDate}
								dialogOpen={props?.dialogOpen}
								handleDialogOpen={props?.handleDialogOpen}
								handleDialogClose={props?.handleDialogClose}
							/>
						</Grid>
					))}
				</Grid>
			)}
		</ManageChallengeBox>
	);
}

export default ManageChallenge;

const ManageChallengeBox = styled.div`
	padding-bottom: 20rem;
`;

const EmptyContainer = styled.div`
	width: 100%;
	text-align: center;
	font-size: 2rem;
	margin: 8rem 0;
`;
