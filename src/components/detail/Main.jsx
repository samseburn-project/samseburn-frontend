import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

import styled from "styled-components";

import { Divider, Grid, CircularProgress } from "@mui/material";

import Intro from "./Intro";
import Participant from "./Participant";
import PlaceMap from "./PlaceMap";

const Main = () => {
	const [loading, setLoading] = useState(true);
	const [challenge, setChallenge] = useState();
	const [participants, setParticipants] = useState([]);
	const [userChallenge, setUserChallenge] = useState({});
	const params = useParams();
	const challengeId = Number(params.id);
	const userToken = localStorage.getItem("token");

	const { enqueueSnackbar } = useSnackbar();

	const fetchChallenge = async () => {
		try {
			const { data } = await axios.get(
				`https://api.samseburn.site/challenges/${challengeId}`
			);
			setChallenge(data);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchParticipants = async () => {
		try {
			const { data } = await axios.get(
				`https://api.samseburn.site/challenges/${challengeId}/users`
			);
			setParticipants(data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchUserChallenge = async () => {
		try {
			const res = await axios.get(
				`https://api.samseburn.site/challenges/${challengeId}/user`,
				{
					headers: { Authorization: `Bearer ${userToken}` },
				}
			);

			const { status, data } = res;

			if (status === 200) {
				setUserChallenge(data);
			}
		} catch (err) {
			if (
				err.response.data.message === "해당 챌린지를 찾을 수 없습니다." ||
				err.response.status === 500
			) {
				console.log("참여중인 챌린지가 아닙니다.");
			}
		}
	};

	const handleChallengeJoin = async () => {
		console.log(userToken);
		try {
			const res = await axios.post(
				`https://api.samseburn.site/challenges/${challengeId}/join`,
				null,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			if (res.status !== 200) {
				enqueueSnackbar("챌린지에 참여 신청에 실패했습니다.", {
					variant: "success",
					autoHideDuration: 2000,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleChallengeCancel = async () => {
		try {
			const res = await axios.delete(
				`https://api.samseburn.site/challenges/${challengeId}/join`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			if (res.status === 200) setUserChallenge();
		} catch (err) {
			console.log(err);
		}
	};

	const handleChallengeContinue = async () => {
		try {
			const res = await axios.put(
				`https://api.samseburn.site/challenges/${challengeId}/continue`,
				null,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			if (res.status !== 200) {
				enqueueSnackbar("챌린지 계속하기에 실패했습니다.", {
					variant: "error",
					autoHideDuration: 2000,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleChallengeStop = async () => {
		try {
			const res = await axios.delete(
				`https://api.samseburn.site/challenges/${challengeId}/continue`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			if (res.status !== 200) {
				enqueueSnackbar("챌린지 그만두기에 실패했습니다.", {
					variant: "error",
					autoHideDuration: 2000,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchChallenge();
		fetchParticipants();

		if (userToken) {
			fetchUserChallenge();
		}

		setLoading(false);
	}, []);

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<CircularProgress size={70} color="warning" />
				</SpinnerContainer>
			) : (
				<>
					<Intro
						challenge={challenge}
						userChallenge={userChallenge}
						handleChallengeJoin={handleChallengeJoin}
						handleChallengeCancel={handleChallengeCancel}
						handleChallengeContinue={handleChallengeContinue}
						handleChallengeStop={handleChallengeStop}
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
									<AddressText>
										📌 도로명 주소 : {challenge?.address}
									</AddressText>
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
			)}
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
	font-size: 2rem;
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

const SpinnerContainer = styled.div`
	width: 100%;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
