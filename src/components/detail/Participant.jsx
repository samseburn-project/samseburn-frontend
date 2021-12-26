import React from "react";

import styled from "styled-components";

import { customMedia } from "../../GlobalStyles";
import { Grid } from "@mui/material";

import FeedCarousel from "./FeedCarousel";

import { ReactComponent as User } from "../../assets/user.svg";
// import { ReactComponent as FirstMedal } from "../../assets/icons/1st-medal-icon.svg";
// import { ReactComponent as SecondMedal } from "../../assets/icons/2nd-medal-icon.svg";
// import { ReactComponent as ThirdMedal } from "../../assets/icons/3rd-medal-icon.svg";

const Participant = ({ ...props }) => {
	// const renderMedal = (count) => {
	// 	if (count >= 15) {
	// 		return <FirstMedal />;
	// 	} else if (count >= 10) {
	// 		return <SecondMedal />;
	// 	} else if (count >= 5) {
	// 		return <ThirdMedal />;
	// 	} else return "";
	// };

	return (
		<Grid container spacing={2.5}>
			<Grid item>
				<ProfileBox>
					<ProfileImg>
						<img
							src={
								props.participant?.imgUrl ? props.participant?.imgUrl : <User />
							}
							alt="Profile"
						/>
					</ProfileImg>
					<ProfileContainer>
						<ProfileId>{props.participant?.username}</ProfileId>
						<ProfileText>
							{props?.participant?.firstWeekMission === "YES"
								? `${props?.participant?.certiCount}회 인증`
								: "1주차 진행중"}
						</ProfileText>
					</ProfileContainer>
				</ProfileBox>
			</Grid>
			<Grid item>
				<FeedCarousel
					certifies={props.participant?.certifies}
					challengeId={props.challenge?.challengeId}
					userChallengeId={props?.userChallengeId}
				/>
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
	align-items: center;
  gap: 2.6rem;
  
  ${customMedia.lessThan("mobile")`
    width: 31.5rem;
    height: 10rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 31.5rem;
    height: 10rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    width: 8rem;
    height: 10rem;
    display: inline-block;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 16rem;
    height: 15rem;
    display: inline-block;
  `}
`;

const ProfileImg = styled.div`
	width: 13rem;
	height: 13rem;
  padding-left: 4rem;
  
  ${customMedia.lessThan("mobile")`
    width: 8rem;
    height: 8rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 8rem;
    height: 8rem;
  `}
    
  ${customMedia.between("lgMobile", "tablet")`
    width: 4rem;
    height: 4rem;
    padding: 0.7rem 0 0 2rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 6rem;
    height: 6rem;
    padding: 1.5rem 0 0 5rem;
  `}

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
  
  ${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1.2rem;
    text-align: center;
    margin: 2rem 0 0.5rem 0;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 1.6rem;
    text-align: center;
    margin: 3rem 0 0.5rem 0;
  `}
`;

const ProfileText = styled.div`
  font-size: 1.6rem;
  
  ${customMedia.lessThan("mobile")`
    font-size: 1rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1rem;
    text-align: center;

  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 1.2rem;
    text-align: center;
  `}
`;
