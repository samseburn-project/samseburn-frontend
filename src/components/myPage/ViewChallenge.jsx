import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import { Grid, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MyChallengeCard from "./MyChallengeCard";
import { customMedia } from "../../GlobalStyles";

const ViewChallenge = ({ userToken, userChallengeList }) => {
	const [loading, setLoading] = useState(true);
	const joinScrollRef = useRef();
	const retryScrollRef = useRef();
	const completeScrollRef = useRef();

	const handleJoinScroll = () => {
		joinScrollRef.current.scrollIntoView({ behavior: "smooth" });
	};

	const handleRetryScroll = () => {
		retryScrollRef.current.scrollIntoView({ behavior: "smooth" });
	};

	const handleCompleteScroll = () => {
		completeScrollRef.current.scrollIntoView({ behavior: "smooth" });
	};

	const joinChallenges = userChallengeList.filter(
		(item) => item.challengeStatus === "JOIN"
	);
	const retryChallenges = userChallengeList.filter(
		(item) => item.challengeStatus === "RETRY"
	);
	const completeChallenges = userChallengeList.filter(
		(item) => item.challengeStatus === "COMPLETE"
	);

	useEffect(() => {
		setLoading(false);
	}, []);

	// mui card responsive layout
	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 375,
				md: 480,
				lg: 768,
				xl: 1200,
				// mobile: 0,
				// lg: 375,
				// tablet: 480,
				// desktop: 768,
			},
		},
	});

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<CircularProgress size={30} color="warning" />
				</SpinnerContainer>
			) : (
				<ViewChallengeBox>
					<Row>
						<Title>챌린지 현황</Title>
						<CountContainer>
							<CountCard name="join" onClick={handleJoinScroll}>
								<CountNumber>{joinChallenges.length}</CountNumber>
								<CountText>참가중</CountText>
							</CountCard>
							<CountCard name="retry" onClick={handleRetryScroll}>
								<CountNumber>{retryChallenges.length}</CountNumber>
								<CountText>재도전 가능</CountText>
							</CountCard>
							<CountCard name="complete" onClick={handleCompleteScroll}>
								<CountNumber>{completeChallenges.length}</CountNumber>
								<CountText>완료</CountText>
							</CountCard>
						</CountContainer>
					</Row>
					<Row>
						<Title ref={joinScrollRef}>참가중인 챌린지</Title>
						{joinChallenges.length === 0 ? (
							<EmptyContainer>참가중인 챌린지가 없습니다</EmptyContainer>
						) : (
							<ThemeProvider theme={theme}>
								<Grid container>
									{joinChallenges.map((challenge, i) => (
										<Grid item xs={12} sm={12} md={12} lg={6} xl={6} key={i}>
											<MyChallengeCard
												id={challenge.challengeId}
												title={challenge.title}
												category={challenge.category}
												locationType={challenge.locationType}
												challengeStartDate={challenge.challengeStartDate}
												challengeEndDate={challenge.challengeEndDate}
												certiCount={challenge.certiCount}
												retryCount={challenge.retryCount}
												imgUrl={challenge.imgUrl}
												challengeStatus={challenge.challengeStatus}
												firstWeekMission={challenge.firstWeekMission}
											/>
										</Grid>
									))}
								</Grid>
							</ThemeProvider>
						)}
					</Row>
					<Row>
						<Title ref={retryScrollRef}>재도전 가능 챌린지</Title>
						{retryChallenges.length === 0 ? (
							<EmptyContainer>재도전 가능한 챌린지가 없습니다</EmptyContainer>
						) : (
							<ThemeProvider theme={theme}>
								<Grid container>
									{retryChallenges.map((challenge, i) => (
										<Grid item xs={12} sm={12} md={12} lg={6} xl={6} key={i}>
											<MyChallengeCard
												userToken={userToken}
												id={challenge.challengeId}
												title={challenge.title}
												category={challenge.category}
												locationType={challenge.locationType}
												challengeStartDate={challenge.challengeStartDate}
												challengeEndDate={challenge.challengeEndDate}
												certiCount={challenge.certiCount}
												retryCount={challenge.retryCount}
												imgUrl={challenge.imgUrl}
												challengeStatus={challenge.challengeStatus}
												firstWeekMission={challenge.firstWeekMission}
											/>
										</Grid>
									))}
								</Grid>
							</ThemeProvider>
						)}
					</Row>
					<Row>
						<Title ref={completeScrollRef}>완료한 챌린지</Title>
						{completeChallenges.length === 0 ? (
							<EmptyContainer>완료한 챌린지가 없습니다</EmptyContainer>
						) : (
							<ThemeProvider theme={theme}>
								<Grid container>
									{completeChallenges.map((challenge, i) => (
										<Grid item xs={12} sm={12} md={12} lg={6} xl={6} key={i}>
											<MyChallengeCard
												id={challenge.challengeId}
												title={challenge.title}
												category={challenge.category}
												locationType={challenge.locationType}
												challengeStartDate={challenge.challengeStartDate}
												challengeEndDate={challenge.challengeEndDate}
												certiCount={challenge.certiCount}
												retryCount={challenge.retryCount}
												imgUrl={challenge.imgUrl}
												challengeStatus={challenge.challengeStatus}
												firstWeekMission={challenge.firstWeekMission}
											/>
										</Grid>
									))}
								</Grid>
							</ThemeProvider>
						)}
					</Row>
				</ViewChallengeBox>
			)}
		</>
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
  
  ${customMedia.lessThan("mobile")`
    font-size: 1.4rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.4rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1.6rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 2rem;
  `}
`;

const CountContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
`;

const CountCard = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	cursor: pointer;
	flex-basis: 17.7rem;

	width: 17.7rem;
	height: 9.3rem;
	box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
	margin-bottom: 6rem;
	border-radius: 0.5rem;
  
  ${customMedia.lessThan("mobile")`
    justify-content: flex-start;
    flex: 0.3;
    height: 7rem;
    margin-bottom: 0;
  `}

	${customMedia.between("mobile", "lgMobile")`
    justify-content: flex-start;
    flex: 0.3;
    height: 7rem;
    margin-bottom: 0;
  `}

	${customMedia.between("lgMobile", "tablet")`
    justify-content: flex-start;
    flex: 0.3;
    height: 7rem;
    margin-bottom: 0;
  `}
`;

const CountNumber = styled.div`
  font-size: 3.4rem;
  font-weight: bold;
  color: #eb3901;
  
  ${customMedia.lessThan("mobile")`
    font-size: 2rem;
    padding-left: 1.5rem;
    padding-right: 1rem;
  `}
  
  ${customMedia.between("mobile", "lgMobile")`
    font-size: 2rem;
    padding-left: 1.5rem;
    padding-right: 1rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 2.4rem;
    padding-left: 2rem;
    padding-right: 1rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 3rem;
  `}
`;

const CountText = styled.div`
	font-size: 1.6rem;
	font-weight: bold;
	color: #959595;

	${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
    word-spacing: 2rem;
  `}
  
  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
    word-spacing: 2rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.4rem;
  `}
`;

const SpinnerContainer = styled.div`
	width: 100%;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
