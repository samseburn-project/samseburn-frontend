import React from "react";

import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";

import styled from "styled-components";

import sample from "../../assets/sample.png";
import calendar from "../../assets/icons/calendar.png";

const ChallengeCard = () => {
	return (
		<StyledCard>
			<CardActionArea>
				<CardMedia component="img" image={sample} />
				<StyledCardContent>
					<CardTitle>챌린지 이름</CardTitle>
					<Row>
						<CardCategory>카테고리</CardCategory>
						<CardCategory>카테고리</CardCategory>
					</Row>
					<Row>
						<CardIcon>
							<img src={calendar} alt="Calendar icon" />
						</CardIcon>
						<CardDate>2021. 01. 01 ~ 2021. 12. 31</CardDate>
					</Row>
					<CardMember>현재 00/10 명이 참여중입니다.</CardMember>
				</StyledCardContent>
			</CardActionArea>
		</StyledCard>
	);
};

export default ChallengeCard;

const StyledCard = styled(Card)`
	height: 36.3rem;
	box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);

	img {
		height: 18.15rem;
	}

	.css-46bh2p-MuiCardContent-root {
		padding: 2rem;
		cursor: pointer;
	}
`;

const StyledCardContent = styled(CardContent)`
	height: 18.15rem;
	box-sizing: border-box;
`;

const CardTitle = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 0.7rem;
`;

const Row = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1rem;
`;

const CardCategory = styled.span`
	font-size: 1.2rem;
	color: #8f8f8f;
	background-color: #e5e5e5;
	border-radius: 2rem;
	padding: 0.5rem 1rem;
	letter-spacing: 0.2px;
`;

const CardDate = styled.div`
	font-size: 1.4rem;
	letter-spacing: 0.2px;
`;

const CardIcon = styled.div`
	width: 1.6rem;
	height: 1.6rem;

	img {
		width: 100%;
		height: 100%;
	}
`;

const CardMember = styled.div`
	font-size: 1.6rem;
	margin-top: 3rem;
`;
