import React from "react";

import Navbar from "../common/Navbar";
import Intro from "./Intro";
import Footer from "../common/Footer";

import { Divider, Grid } from "@mui/material";

import styled from "styled-components";
import Participant from "./Participant";

const Main = () => {
	return (
		<>
			<Navbar />
			<Intro />
			<Wrapper>
				<Row>
					<Title>챌린지 설명</Title>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, non
						eget et lectus at sed. Id viverra purus proin vitae. Fusce leo
						vestibulum condimentum in. Aliquet amet ut felis volutpat a. Libero,
						auctor nam est mauris dapibus neque. Nisi, eu convallis eget non eu.
						Bibendum faucibus pellentesque fusce justo mauris tristique congue.
						Sit id aliquet scelerisque lectus est commodo. Vitae in quisque
						volutpat vestibulum morbi netus pulvinar.
					</Text>
				</Row>
				<Row>
					<Title>챌린지 참가 장소</Title>
					<SubTitle>도로명 주소</SubTitle>
					<MapContainer />
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
			<Footer />
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

const SubTitle = styled.div`
	font-size: 2rem;
	margin-bottom: 2rem;
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
	border: 1px solid black;
	border-radius: 0.5rem;
`;
