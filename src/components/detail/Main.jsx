import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

import { Divider, Grid } from "@mui/material";

import Intro from "./Intro";
import Participant from "./Participant";
import PlaceMap from "./PlaceMap";

const Main = () => {
	const params = useParams();
	const challengeId = Number(params.id);
	const [challenge, setChallenge] = useState();
	const [participants, setParticipants] = useState([]);
	const [userChallenge, setUserChallenge] = useState({});
	const [dialogOpen, setDialogOpen] = useState(false);
	const userToken = localStorage.getItem("token");

	const fetchChallenge = async () => {
		try {
			const { data } = await axios.get(`/challenges/${challengeId}`);
			setChallenge(data);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchParticipants = async () => {
		try {
			const { data } = await axios.get(`/challenges/${challengeId}/users`);
			setParticipants(data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchUserChallenge = async () => {
		try {
			const { status, data } = await axios.get(
				`/challenges/${challengeId}/user`,
				{
					headers: { Authorization: `Bearer ${userToken}` },
				}
			);

			if (status === 200) {
				setUserChallenge(data);
			} else {
				console.log("참여중인 챌린지가 아닙니다.");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleChallengeJoin = async () => {
		try {
			await axios.post(`/challenges/${challengeId}/join`, {
				headers: { Authorization: `Bearer ${userToken}` },
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleChallengeCancel = async () => {
		try {
			const res = await axios.delete(`/challenges/${challengeId}/join`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			if (res.status === 200) setUserChallenge();
		} catch (err) {
			console.log(err);
		}
	};

	const handleChallengeContinue = async () => {
		try {
			await axios.put(`/challenges/${challengeId}/continue`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleChallengeStop = async () => {
		try {
			await axios.delete(`challenges/${challengeId}/continue`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchChallenge();
		fetchParticipants();
		fetchUserChallenge();
	}, []);

	return (
		<>
			<Intro
				challenge={challenge}
				userChallenge={userChallenge}
				handleChallengeJoin={handleChallengeJoin}
				handleChallengeCancel={handleChallengeCancel}
				handleChallengeContinue={handleChallengeContinue}
				handleChallengeStop={handleChallengeStop}
				dialogOpen={dialogOpen}
				handleDialogOpen={handleDialogOpen}
				handleDialogClose={handleDialogClose}
			/>
			<Wrapper>
				<Row>
					<Title>챌린지 설명</Title>
					<Text>{challenge?.description}</Text>
				</Row>
				<Row>
					<Title>챌린지 참가 장소</Title>

					{challenge?.address ? (
						<>
							<AddressText>📌 도로명 주소 : {challenge?.address}</AddressText>
							<MapContainer>
								<PlaceMap address={challenge.address} />
							</MapContainer>
						</>
					) : (
						<OnlineText>본 챌린지는 온라인으로 진행됩니다.</OnlineText>
					)}
				</Row>
				<Divider />
				<Row>
					<Title>챌린지 참가 현황</Title>
					<Grid container rowSpacing={3}>
						{participants.map((participant) => (
							<Grid item key={participant.id}>
								<Participant
									participant={participant}
									challenge={challenge}
									userChallengeId={userChallenge?.userId}
								/>
							</Grid>
						))}
					</Grid>
				</Row>
			</Wrapper>
		</>
	);
};

export default Main;

const Wrapper = styled.section`
	width: 104rem;
	margin: 0 auto;
	padding-bottom: 20rem;
	flex: 1;
`;

const Row = styled.div`
	margin: 6rem 0;
`;

const Title = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
	margin-bottom: 3rem;
`;

const AddressText = styled.div`
	font-size: 2rem;
	margin-bottom: 2rem;
	text-align: center;
`;

const Text = styled.div`
	font-size: 1.6rem;
	line-height: 2.8rem;
	white-space: pre-wrap;
	margin-bottom: 10rem;
`;

const MapContainer = styled.div`
	width: 86.2rem;
	height: 30rem;
	margin: 0 auto;

	#map {
		border-radius: 0.5rem;
	}
`;

const OnlineText = styled.div`
	margin: 8rem 0;
	font-size: 2rem;
	text-align: center;
`;
