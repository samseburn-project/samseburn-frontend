import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

import styled from "styled-components";

import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
} from "@mui/material";
import Category from "../common/Category";
import CommonDialog from "../common/CommonDialog";
import ModifyChallengeDialog from "./ModifyChallengeDialog";

import { ReactComponent as Calendar } from "../../assets/icons/calender.svg";

const RegisterChallengeCard = ({ ...props }) => {
	const [openDialog, setOpenDialog] = useState("");
	const [open, setOpen] = useState(false);
	const userToken = localStorage.getItem("token");
	const challengeId = props.challenge?.challengeId;
	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();

	const handleOpenDialog = (targetId) => {
		setOpenDialog(targetId);
	};

	const handleOpenToggle = () => {
		setOpen(!open);
	};

	const handleChallengeDelete = async () => {
		const { status } = await axios.delete(
			`https://api.samseburn.site/challenges/${challengeId}`,
			{
				headers: { Authorization: `Bearer ${userToken}` },
			}
		);

		if (status === 200) {
			enqueueSnackbar("챌린지가 삭제되었습니다.", {
				variant: "success",
				autoHideDuration: 2000,
			});
			handleOpenToggle();
		} else {
			enqueueSnackbar("챌린지 삭제에 실패했습니다.", {
				variant: "error",
				autoHideDuration: 2000,
			});
			handleOpenToggle();
		}
	};

	return (
		<CardContainer>
			<CardActionArea>
				<StyledCard
					onClick={(e) => {
						// e.stopPropagation();
						if (e.target !== e.currentTarget) return;
						navigate(`/detail/${challengeId}`);
					}}
				>
					<StyledCardMedia component="img" image={props.challenge?.imgUrl} />
					<StyledBox>
						<StyledCardContent>
							<Row>
								<CardTitle>{props.challenge?.title}</CardTitle>
							</Row>
							<Row>
								<CardCategory>{props.challenge?.category}</CardCategory>
								<CardCategory>{props.challenge?.locationType}</CardCategory>
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
							<ButtonRow>
								<UpdateButton
									id="update"
									onClick={(e) => {
										handleOpenDialog(e.target.id);
										handleOpenToggle();
									}}
								>
									수정
								</UpdateButton>
								<ModifyChallengeDialog
									open={open}
									handleOpenToggle={handleOpenToggle}
									openDialog={openDialog}
									handleOpenDialog={handleOpenDialog}
									challenge={props?.challenge}
								/>
								<DeleteButton
									id="delete"
									onClick={(e) => {
										handleOpenDialog(e.target.id);
										handleOpenToggle();
									}}
								>
									삭제
								</DeleteButton>
								<CommonDialog
									open={open}
									handleOpenToggle={handleOpenToggle}
									openDialog={openDialog}
									handleOpenDialog={handleOpenDialog}
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
	margin-top: 2.5rem;
`;

const UpdateButton = styled.span`
	width: 100%;
	height: 3.2rem;
	padding: 0.2rem;
	font-size: 1.6rem;
	font-weight: bold;
	color: #ffffff;
	background-color: #eb3901;
	border-radius: 0.5rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: opacity 0.3s;

	&:hover {
		background-color: #eb3901;
		opacity: 0.6;
	}
`;

const DeleteButton = styled.span`
	width: 100%;
	height: 3.2rem;
	padding: 0.2rem;
	font-size: 1.6rem;
	font-weight: bold;
	color: #ffffff;
	border-radius: 0.5rem;
	background-color: #c4c4c4;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: opacity 0.3s;

	&:hover {
		background-color: #c4c4c4;
		opacity: 0.6;
	}
`;
