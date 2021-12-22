import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
} from "@mui/material";
import Category from "../common/Category";
import StyledButton from "../common/StyledButton";
import CommonDialog from "../common/CommonDialog";

import { ReactComponent as Calendar } from "../../assets/icons/calender.svg";

const RegisterChallengeCard = ({ ...props }) => {
	const navigate = useNavigate();
	const userToken = localStorage.getItem("token");

	const handleChallengeDelete = async () => {
		const { status } = await axios.delete(`/challenges/${props?.challengeId}`, {
			headers: { Authorization: `Bearer ${userToken}` },
		});

		if (status === 200) {
		}
	};

	return (
		<CardContainer>
			<CardActionArea>
				<StyledCard
					onClick={(e) => {
						if (e.target.name !== "retryButton") {
							navigate(`/detail/${props?.challengeId}`);
						}
					}}
				>
					<StyledCardMedia component="img" image={props.imgUrl} />

					<StyledBox>
						<StyledCardContent>
							<Row>
								<CardTitle>{props.title}</CardTitle>
							</Row>
							<Row>
								<CardCategory>{props.category}</CardCategory>
								<CardCategory>{props.locationType}</CardCategory>
							</Row>
							<Row>
								<CardIcon>
									<Calendar alt="Calendar icon" />
								</CardIcon>
								<CardDate>
									{props.challengeStartDate} ~ {props.challengeEndDate}
								</CardDate>
							</Row>
							<ButtonRow>
								<UpdateButton>수정</UpdateButton>
								<DeleteButton
									onClick={() => {
										props.handleDialogOpen();
									}}
								>
									삭제
								</DeleteButton>
								<CommonDialog
									dialogOpen={props?.dialogOpen}
									handleDialogOpen={props?.handleDialogOpen}
									handleDialogClose={props?.handleDialogClose}
									handleChallengeDelete={handleChallengeDelete}
									mainText={"챌린지를 정말 삭제하시겠어요?"}
									subText={"챌린지에 대한 데이터가 모두 삭제됩니다."}
								/>
							</ButtonRow>
						</StyledCardContent>
					</StyledBox>
				</StyledCard>
			</CardActionArea>
		</CardContainer>
	);
};

export default RegisterChallengeCard;

const CardContainer = styled.div`
	margin: 2rem;
`;

const Row = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;
`;

const StyledCard = styled(Card)`
	height: 20rem;
	box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
	border-radius: 0.5rem;
	padding: 0 3rem;
	word-break: break-all;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledCardMedia = styled(CardMedia)`
	width: 15rem;
	height: 15rem;
	border-radius: 0.5rem;
	object-fit: cover;
`;

const StyledCardContent = styled(CardContent)`
	height: 15rem;
`;

const StyledBox = styled(Box)`
	display: flex;
	flex-direction: column;
`;

const CardTitle = styled.div`
	font-size: 2rem;
	font-weight: bold;
`;

const CardCategory = styled(Category)`
	font-size: 1.2rem;
	padding: 0.5rem 1rem;
	color: #8f8f8f;
	background-color: #e5e5e5;
	border: none;
	&:hover {
		color: #8f8f8f;
		background-color: #e5e5e5;
	}
`;

const CardIcon = styled.div`
	width: 1.6rem;
	height: 1.6rem;
	img {
		width: 100%;
		height: 100%;
	}
`;

const CardDate = styled.div`
	font-size: 1.6rem;
	letter-spacing: 0.2px;
`;

const ButtonRow = styled.div`
	display: flex;
	justify-content: center;
	gap: 2rem;
	margin-top: 1.5rem;
`;

const DeleteButton = styled(StyledButton)`
	width: 100%;
	font-size: 1.6rem;
	background-color: #c4c4c4;
	&:hover {
		background-color: #959595;
	}
`;

const UpdateButton = styled(StyledButton)`
	width: 100%;
	font-size: 1.6rem;
`;
