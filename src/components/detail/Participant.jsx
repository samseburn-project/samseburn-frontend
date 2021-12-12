import React from "react";

import { Grid } from "@mui/material";

import styled from "styled-components";

import FeedCarousel from "./FeedCarousel";

import profileImg from "../../assets/profile-sample.png";

const Participant = () => {
	return (
		<Grid container spacing={2.5}>
			<Grid item>
				<ProfileBox>
					<ProfileImg>
						<img src={profileImg} alt="Profile" />
					</ProfileImg>
					<ProfileContainer>
						<ProfileId>참가자 아이디</ProfileId>
						<ProfileText>1주차 진행중</ProfileText>
					</ProfileContainer>
				</ProfileBox>
			</Grid>
			<Grid item>
				<FeedCarousel />
			</Grid>
		</Grid>
	);
};

export default Participant;

const ProfileBox = styled.div`
	width: 33rem;
	height: 20rem;
	border: 1px solid #e5e5e5;
	border-radius: 0.5rem;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2.6rem;
`;

const ProfileImg = styled.div`
	width: 13rem;
	height: 13rem;
	border-radius: 50%;
`;

const ProfileContainer = styled.div`
	display: flex column;
`;

const ProfileId = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 1rem;
`;

const ProfileText = styled.div`
	font-size: 1.6rem;
`;
