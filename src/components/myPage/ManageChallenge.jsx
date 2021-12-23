import React, { useState } from "react";

import styled from "styled-components";

import { Grid } from "@mui/material";
import RegisterChallengeCard from "./RegisterChallengeCard";

function ManageChallenge({ ...props }) {
	const [openDialog, setOpenDialog] = useState("");
	const [open, setOpen] = useState(false);

	const handleOpenDialog = (targetId) => {
		setOpenDialog(targetId);
	};

	const handleOpenToggle = () => {
		setOpen(!open);
	};

	return (
		<ManageChallengeBox>
			{props?.userCreateChallengeList.length === 0 ? (
				<EmptyContainer>개설한 챌린지가 없습니다</EmptyContainer>
			) : (
				<Grid container>
					{props?.userCreateChallengeList.map((challenge) => (
						<Grid item xs={6} key={challenge.challengeId}>
							<RegisterChallengeCard
								id={challenge.challengeId}
								open={open}
								handleOpenToggle={handleOpenToggle}
								openDialog={openDialog}
								handleOpenDialog={handleOpenDialog}
								challenge={challenge}
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
