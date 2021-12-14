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
	const id = Number(params.id);
	const [challenge, setChallenge] = useState();

	const fetchChallenge = async () => {
		try {
			const { data } = await axios.get(`/challenges/${id}`);
			setChallenge(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchChallenge();
	}, []);

	return (
		<>
			<Intro challenge={challenge} />
			<Wrapper>
				<Row>
					<Title>챌린지 설명</Title>
					<Text>{challenge?.description}</Text>
				</Row>
				<Row>
					<Title>챌린지 참가 장소</Title>
					<AddressText>{challenge?.address}</AddressText>
					{challenge?.address ? (
						<MapContainer>
							<PlaceMap />
						</MapContainer>
					) : (
						<OnlineText>본 챌린지는 온라인으로 진행됩니다.</OnlineText>
					)}
				</Row>
				<Divider />
				<Row>
					<Title>챌린지 참가 현황</Title>
					<Grid container rowSpacing={3}>
						<Grid item>
							<Participant />
						</Grid>
						<Grid item>
							<Participant />
						</Grid>
						<Grid item>
							<Participant />
						</Grid>
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
