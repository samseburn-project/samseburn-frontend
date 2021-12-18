import React from "react";

import styled from "styled-components";

import { Grid } from "@mui/material";
import ChallengeCard from "./ChallengeCard";
// import CurrentCard from './CurrentCard';
// import RetryCard from './RetryCard';
// import CompleteCard from './CompleteCard';

const ViewChallenge = () => {
	const currentChallenges = [
		{
			challengeId: 1,
			title: "아침 8시 일어나기dddddddddddddddddddddddd",
			description: "아침 기상을 인증하는 챌린지입니다",
			startDate: "2021-10-11",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 1,
			missionStatus: false,
			totalCnt: 3,

			retryLimit: 3,
			challengeStatus: "JOIN",
		},
		{
			challengeId: 2,
			title: "자기 전 스트레칭하기",
			description: "자기 전 스트레칭",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "운동",
			},
			participants: 2,
			missionStatus: true,
			totalCnt: 15,
			retryLimit: 3,
			challengeStatus: "JOIN",
		},
		{
			challengeId: 3,
			title: "과일 먹기",
			description: "챌린지 설명",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 5,
			missionStatus: false,
			totalCnt: 1,
			retryLimit: 3,
			challengeStatus: "JOIN",
		},
		{
			challengeId: 4,
			title: "책상 정리하기",
			description: "책상 정리",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 5,
			missionStatus: true,
			totalCnt: 7,
			retryLimit: 3,
			challengeStatus: "JOIN",
		},
	];

	const retryChallenges = [
		{
			challengeId: 1,
			title: "아침 8시 일어나기dddddddddddddddddddddddd",
			description: "아침 기상을 인증하는 챌린지입니다",
			startDate: "2021-10-11",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 1,
			missionStatus: false,
			totalCnt: 3,
			retryLimit: 3,
			challengeStatus: "RETRY",
		},
		{
			challengeId: 2,
			title: "자기 전 스트레칭하기",
			description: "자기 전 스트레칭",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "운동",
			},
			participants: 2,
			missionStatus: true,
			totalCnt: 15,
			retryLimit: 3,
			challengeStatus: "RETRY",
		},
		{
			challengeId: 3,
			title: "과일 먹기",
			description: "챌린지 설명",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 5,
			missionStatus: false,
			totalCnt: 1,
			retryLimit: 3,
			challengeStatus: "RETRY",
		},
		{
			challengeId: 4,
			title: "책상 정리하기",
			description: "책상 정리",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 5,
			missionStatus: true,
			totalCnt: 7,
			retryLimit: 3,
			challengeStatus: "RETRY",
		},
	];

	const completeChallenges = [
		{
			challengeId: 1,
			title: "아침 8시 일어나기dddddddddddddddddddddddd",
			description: "아침 기상을 인증하는 챌린지입니다",
			startDate: "2021-10-11",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 1,
			missionStatus: false,
			totalCnt: 3,
			retryLimit: 3,
			challengeStatus: "COMPLETE",
		},
		{
			challengeId: 2,
			title: "자기 전 스트레칭하기",
			description: "자기 전 스트레칭",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "운동",
			},
			participants: 2,
			missionStatus: true,
			totalCnt: 15,

			retryLimit: 3,
			challengeStatus: "COMPLETE",
		},
		{
			challengeId: 3,
			title: "과일 먹기",
			description: "챌린지 설명",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 5,
			missionStatus: false,
			totalCnt: 1,
			retryLimit: 3,
			challengeStatus: "COMPLETE",
		},
		{
			challengeId: 4,
			title: "책상 정리하기",
			description: "책상 정리",
			startDate: "2021-10-01",
			endDate: "2021-12-31",
			limitPerson: 10,
			locationType: "ONLINE",
			address: "",
			imgUrl:
				"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			category: {
				name: "생활",
			},
			participants: 5,
			missionStatus: true,
			totalCnt: 7,
			retryLimit: 3,
			challengeStatus: "COMPLETE",
		},
	];

	return (
		<ViewChallengeBox>
			<Row>
				<Title>챌린지 현황</Title>
				<CountContainer>
					<CountCard>
						<CountNumber>{currentChallenges.length}</CountNumber>
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
				{currentChallenges.length === 0 ? (
					<EmptyContainer>참가중인 챌린지가 없습니다</EmptyContainer>
				) : (
					<Grid container>
						{currentChallenges.map((challenge) => (
							<ChallengeCard
								key={challenge.challengeId}
								title={challenge.title}
								category={challenge.category.name}
								locationType={challenge.locationType}
								challengeStartDate={challenge.startDate}
								challengeEndDate={challenge.endDate}
								certiCount={challenge.totalCnt}
								imgUrl={challenge.imgUrl}
								challengeStatus={challenge.challengeStatus}
								missionStatus={challenge.missionStatus}
							/>
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
						{retryChallenges.map((challenge) => (
							<ChallengeCard
								key={challenge.challengeId}
								title={challenge.title}
								category={challenge.category.name}
								locationType={challenge.locationType}
								challengeStartDate={challenge.startDate}
								challengeEndDate={challenge.endDate}
								certiCount={challenge.totalCnt}
								imgUrl={challenge.imgUrl}
								challengeStatus={challenge.challengeStatus}
								missionStatus={challenge.missionStatus}
							/>
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
						{completeChallenges.map((challenge) => (
							<ChallengeCard
								key={challenge.challengeId}
								title={challenge.title}
								category={challenge.category.name}
								locationType={challenge.locationType}
								challengeStartDate={challenge.startDate}
								challengeEndDate={challenge.endDate}
								certiCount={challenge.totalCnt}
								imgUrl={challenge.imgUrl}
								challengeStatus={challenge.challengeStatus}
								missionStatus={challenge.missionStatus}
							/>
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
