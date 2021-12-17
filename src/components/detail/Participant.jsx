import React from "react";

import styled from "styled-components";

import { Grid } from "@mui/material";

import FeedCarousel from "./FeedCarousel";

import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as FirstMedal } from "../../assets/icons/1st-medal-icon.svg";
import { ReactComponent as SecondMedal } from "../../assets/icons/2nd-medal-icon.svg";
import { ReactComponent as ThirdMedal } from "../../assets/icons/3rd-medal-icon.svg";

const Participant = ({ ...props }) => {
	const renderMedal = (count) => {
		if (count < 5) {
			return null;
		} else if (count < 10) {
			return <ThirdMedal />;
		} else if (count < 15) {
			return <SecondMedal />;
		} else {
			return <FirstMedal />;
		}
	};

	return (
		<Grid container spacing={2.5}>
			<Grid item>
				<ProfileBox>
					<ProfileImg>
						<img
							src={
								props.participant.imgUrl ? props.participant.imgUrl : <User />
							}
							alt="Profile"
						/>
					</ProfileImg>
					<ProfileContainer>
						<ProfileId>{props.participant.username}</ProfileId>
						<ProfileText>
							{props.firstWeekMission === "YES"
								? `${props.participant.certiCount}회 인증 ${renderMedal(
										props.participant.certiCount
								  )}`
								: "1주차 진행중"}
						</ProfileText>
					</ProfileContainer>
				</ProfileBox>
			</Grid>
			<Grid item>
				<FeedCarousel certifies={props.participant.certifies} />
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

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
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
