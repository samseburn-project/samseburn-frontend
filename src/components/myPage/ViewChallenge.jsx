import React from "react";

import styled from "styled-components";

import { Grid } from "@mui/material";
import MyChallengeCard from "./MyChallengeCard";

const ViewChallenge = ({ userToken, userChallengeList }) => {
	const joinChallenges = userChallengeList.filter(
		(item) => item.challengeStatus === "JOIN"
	);
	const retryChallenges = userChallengeList.filter(
		(item) => item.challengeStatus === "RETRY"
	);
	const completeChallenges = userChallengeList.filter(
		(item) => item.challengeStatus === "COMPLETE"
	);

	return (
		<ViewChallengeBox>
			<Row>
				<Title>챌린지 현황</Title>
				<CountContainer>
					<CountCard>
						<CountNumber>{joinChallenges.length}</CountNumber>
						<CountText>참가중</CountText>
					</CountCard>
					<CountCard>
						<CountNumber>{retryChallenges.length}</CountNumber>
						<CountText>재도전 가능</CountText>
					</CountCard>
					<CountCard>
						<CountNumber>{completeChallenges.length}</CountNumber>
						<CountText>완료</CountText>
					</CountCard>
				</CountContainer>
			</Row>
			<Row>
				<Title>참가중인 챌린지</Title>
				{joinChallenges.length === 0 ? (
					<EmptyContainer>참가중인 챌린지가 없습니다</EmptyContainer>
				) : (
					<Grid container>
						{joinChallenges.map((challenge, i) => (
							<Grid item xs={6} key={i}>
								<MyChallengeCard
									id={challenge.challengeId}
									title={challenge.title}
									category={challenge.category}
									locationType={challenge.locationType}
									challengeStartDate={challenge.challengeStartDate}
									challengeEndDate={challenge.challengeEndDate}
									certiCount={challenge.certiCount}
									imgUrl={challenge.imgUrl}
									challengeStatus={challenge.challengeStatus}
									firstWeekMission={challenge.firstWeekMission}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</Row>
			<Row>
				<Title>재도전 가능 챌린지</Title>
				{retryChallenges.length === 0 ? (
					<EmptyContainer>재도전 가능한 챌린지가 없습니다</EmptyContainer>
				) : (
					<Grid container>
						{retryChallenges.map((challenge, i) => (
							<Grid item xs={6} key={i}>
								<MyChallengeCard
									userToken={userToken}
									id={challenge.challengeId}
									title={challenge.title}
									category={challenge.category}
									locationType={challenge.locationType}
									challengeStartDate={challenge.challengeStartDate}
									challengeEndDate={challenge.challengeEndDate}
									certiCount={challenge.certiCount}
									imgUrl={challenge.imgUrl}
									challengeStatus={challenge.challengeStatus}
									firstWeekMission={challenge.firstWeekMission}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</Row>
			<Row>
				<Title>완료한 챌린지</Title>
				{completeChallenges.length === 0 ? (
					<EmptyContainer>완료한 챌린지가 없습니다</EmptyContainer>
				) : (
					<Grid container>
						{completeChallenges.map((challenge, i) => (
							<Grid item xs={6} key={i}>
								<MyChallengeCard
									id={challenge.challengeId}
									title={challenge.title}
									category={challenge.category}
									locationType={challenge.locationType}
									challengeStartDate={challenge.challengeStartDate}
									challengeEndDate={challenge.challengeEndDate}
									certiCount={challenge.certiCount}
									imgUrl={challenge.imgUrl}
									challengeStatus={challenge.challengeStatus}
									firstWeekMission={challenge.firstWeekMission}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</Row>
		</ViewChallengeBox>
	);
};

export default ViewChallenge;

const ViewChallengeBox = styled.div`
	padding-bottom: 20rem;
`;

const Row = styled.div`
	margin: 0;
`;

const EmptyContainer = styled.div`
	width: 100%;
	text-align: center;
	font-size: 2rem;
	margin: 8rem 0;
`;

const Title = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
	margin: 5rem 0 2rem 0;
`;

const CountContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

const CountCard = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	cursor: pointer;

	width: 17.7rem;
	height: 9.3rem;
	box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
	margin-bottom: 6rem;
	border-radius: 0.5rem;
`;

const CountNumber = styled.div`
	font-size: 3.4rem;
	font-weight: bold;
	color: #eb3901;
`;

const CountText = styled.div`
	font-size: 1.6rem;
	font-weight: bold;
	color: #959595;
`;
