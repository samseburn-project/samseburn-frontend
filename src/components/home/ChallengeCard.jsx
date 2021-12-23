import React from "react";
import { useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";

import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import Category from "../common/Category";

import { ReactComponent as Calendar } from "../../assets/icons/calender.svg";

const ChallengeCard = ({ ...props }) => {
	const challengeId = props.challenge?.challengeId;
	const navigate = useNavigate();

	return props.challenge?.challengeProgress === "STOP" ? (
		<>
			<StyledCard onClick={() => navigate(`/detail/${challengeId}`)}>
				<EndOverlay>
					<Text>챌린지 마감</Text>
				</EndOverlay>
				<CardActionArea>
					<CardMedia component="img" image={props.challenge?.imgUrl} />
					<StyledCardContent>
						<CardTitle>{props.challenge?.title}</CardTitle>
						<Row>
							<CardCategory locationType={props.challenge?.locationType}>
								{props.challenge?.locationType}
							</CardCategory>
							<CardCategory category={props.challenge?.category}>
								{props.challenge?.category})
							</CardCategory>
						</Row>
						<Row>
							<CardIcon>
								<Calendar alt="Calendar icon" />
							</CardIcon>
							<CardDate>
								{props.challenge?.challengeStartDate} ~{" "}
								{props.challenge?.challengeEndDate}
							</CardDate>
						</Row>
						<CardMember>
							현재 {props.challenge?.participants}/
							{props.challenge?.limitPerson} 명이 참여중입니다.
						</CardMember>
					</StyledCardContent>
				</CardActionArea>
			</StyledCard>
		</>
	) : (
		<StyledCard onClick={() => navigate(`/detail/${challengeId}`)}>
			<CardActionArea>
				<CardMedia component="img" image={props.challenge?.imgUrl} />
				<StyledCardContent>
					<CardTitle>{props.challenge?.title}</CardTitle>
					<Row>
						<CardCategory locationType={props.challenge?.locationType}>
							{props.challenge?.locationType}
						</CardCategory>
						<CardCategory category={props.challenge?.category}>
							{props.challenge?.category}
						</CardCategory>
					</Row>
					<Row>
						<CardIcon>
							<Calendar alt="Calendar icon" />
						</CardIcon>
						<CardDate>
							{props.challenge?.challengeStartDate} ~{" "}
							{props.challenge?.challengeEndDate}
						</CardDate>
					</Row>
					<CardMember>
						현재 {props.challenge?.participants}/{props.challenge?.limitPerson}{" "}
						명이 참여중입니다.
					</CardMember>
				</StyledCardContent>
			</CardActionArea>
		</StyledCard>
	);
};

export default ChallengeCard;

const StyledCard = styled(Card)`
	height: 36.3rem;
	box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
	position: relative;

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

const CardCategory = styled(Category)`
	font-size: 1.2rem;
	padding: 0.5rem 1rem;

	${(props) => {
		if (props.locationType === "온라인") {
			return css`
				color: #ffffff;
				background-color: #ff7539;
			`;
		} else if (props.locationType === "오프라인") {
			return css`
				color: #ffffff;
				background-color: #0057ff;
			`;
		} else if (props.category === "운동") {
			return css`
				color: #ffffff;
				background-color: #04c50c;
			`;
		} else if (props.category === "공부") {
			return css`
				color: #ffffff;
				background-color: #9900cf;
			`;
		} else if (props.category === "취미") {
			return css`
				color: #ffffff;
				background-color: #e2cd0f;
			`;
		} else if (props.category === "독서") {
			return css`
				color: #ffffff;
				background-color: #e71aad;
			`;
		} else if (props.category === "기타") {
			return css`
				color: #ffffff;
				background-color: #6ae4c7;
			`;
		}
	}}
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

const EndOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 0.5rem;
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Text = styled.div`
	font-size: 3rem;
	font-weight: bold;
	color: #ffffff;
`;
