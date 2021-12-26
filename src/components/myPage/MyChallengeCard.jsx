import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

import styled, { css } from "styled-components";

import { customMedia } from "../../GlobalStyles";

import {
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	Box,
} from "@mui/material";
import Category from "../common/Category";

import { ReactComponent as FirstMedal } from "../../assets/icons/1st-medal-icon.svg";
import { ReactComponent as SecondMedal } from "../../assets/icons/2nd-medal-icon.svg";
import { ReactComponent as ThirdMedal } from "../../assets/icons/3rd-medal-icon.svg";
import { ReactComponent as AbledProgress } from "../../assets/icons/progress-icon-abled.svg";
import { ReactComponent as DisabledProgress } from "../../assets/icons/progress-icon-disabled.svg";
import { ReactComponent as Congrats } from "../../assets/icons/congrats-icon.svg";
import { ReactComponent as Calender } from "../../assets/icons/calender.svg";

const MyChallengeCard = ({
	userToken,
	id,
	title,
	category,
	locationType,
	challengeStartDate,
	challengeEndDate,
	certiCount,
	retryCount,
	imgUrl,
	challengeStatus,
	firstWeekMission,
}) => {
	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();

	const viewMedalIcon = (param) => {
		if (param < 5) {
			return "";
		} else if (param < 10) {
			return <ThirdMedal />;
		} else if (param < 15) {
			return <SecondMedal />;
		} else {
			return <FirstMedal />;
		}
	};

	const onRetryHandler = async () => {
		try {
			const res = axios.put(
				`https://api.samseburn.site/challenges/${id}/retry`,
				null,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			if (res.status === 200) {
				enqueueSnackbar("챌린지 재도전이 신청되었습니다.", {
					variant: "success",
					autoHideDuration: 2000,
				});
				navigate(`https://api.samseburn.site/detail/${id}`);
			} else {
				enqueueSnackbar("챌린지 재도전 신청에 실패했습니다.", {
					variant: "error",
					autoHideDuration: 2000,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<CardContainer>
			<CardActionArea>
				<StyledCard
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
					onClick={(e) => {
						navigate(`/detail/${id}`);
					}}
				>
					<StyledCardMedia component="img" image={imgUrl} />

					<StyledBox sx={{ display: "flex", flexDirection: "column" }}>
						<StyledCardContent>
							<Row>
								<CardTitle>{title}</CardTitle>
								{challengeStatus === "RETRY" ? (
									""
								) : (
									<CardMedal>{viewMedalIcon(certiCount)}</CardMedal>
								)}
							</Row>
							<Row>
								<CardCategory locationType={locationType}>
									{locationType}
								</CardCategory>
								<CardCategory category={category}>{category}</CardCategory>
							</Row>
							<Row>
								<CardIcon>
									<Calender alt="Calendar icon" />
								</CardIcon>
								<CardDate>
									{challengeStartDate} ~ {challengeEndDate}
								</CardDate>
							</Row>
							<Row>
								{challengeStatus === "JOIN" ? (
									firstWeekMission === "YES" ? (
										<CertiCount>
											누적 <CertiCountNumber>{certiCount}</CertiCountNumber>
											회 달성
											<Congrats />
										</CertiCount>
									) : (
										<Progress>
											<ProgressTitle>달성률</ProgressTitle>
											<ProgressIcons>
												{certiCount >= 1 ? (
													<AbledProgress />
												) : (
													<DisabledProgress />
												)}
												{certiCount >= 2 ? (
													<AbledProgress />
												) : (
													<DisabledProgress />
												)}
												{certiCount >= 3 ? (
													<AbledProgress />
												) : (
													<DisabledProgress />
												)}
											</ProgressIcons>
										</Progress>
									)
								) : (
									""
								)}
								{challengeStatus === "RETRY" ? (
									<>
										<RetryButton
											name="retryButton"
											onClick={(e) => {
												e.stopPropagation();
												if (retryCount === 3)
													enqueueSnackbar(
														"챌린지 재도전은 3번까지만 가능합니다!",
														{
															variant: "warning",
															autoHideDuration: 2000,
														}
													);
												onRetryHandler();
											}}
										>
											재도전하기
										</RetryButton>
									</>
								) : (
									""
								)}
								{challengeStatus === "COMPLETE" ? (
									<CertiCount>
										총 <CertiCountNumber>{certiCount}</CertiCountNumber>
										회 달성
										<Congrats />
									</CertiCount>
								) : (
									""
								)}
							</Row>
						</StyledCardContent>
					</StyledBox>
				</StyledCard>
			</CardActionArea>
		</CardContainer>
	);
};

export default MyChallengeCard;

const CardContainer = styled.div`
  margin: 2rem;
  ${customMedia.between("mobile", "lgMobile")`
    margin: 1rem 0;
    `}

  ${customMedia.between("lgMobile", "tablet")`
      
    `}
    
    ${customMedia.between("tablet", "desktop")`
      margin: 1rem;
    `}
`;

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20rem;
  padding: 0 3rem;
  box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  word-break: break-all;
  ${customMedia.between("mobile", "lgMobile")`
    padding: 0 2rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    padding: 0 2rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    flex-direction: column;
    height: 32rem;
    padding: 0;

  `}

  ${customMedia.greaterThan("desktop")`
    
  `};
`;

const StyledCardMedia = styled(CardMedia)`
  width: 15rem;
  height: 15rem;
  border-radius: 0.5rem;
  object-fit: cover;

  ${customMedia.between("mobile", "lgMobile")`
     width: 13rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    width: 13rem;
    
  `}
  
	${customMedia.between("tablet", "desktop")`
    
    width: 100%;
  height: 12rem;
  border-radius: 0rem;
  `}
`;

const StyledCardContent = styled(CardContent)`
	height: 15rem;
`;

const StyledBox = styled(Box)``;

const CardTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.4rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1.6rem;
    
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 1.8rem;
  `}
`;

const CardMedal = styled.div``;

const CardCategory = styled(Category)`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1rem;
    padding: 0.3rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1rem;
    
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 1.2rem;
  `}

  ${(props) => {
		if (props.locationType === "온라인") {
			return css`
				background-color: #ff7539;
				color: #ffffff;
			`;
		} else if (props.locationType === "오프라인") {
			return css`
				background-color: #0057ff;
				color: #ffffff;
			`;
		} else if (props.category === "운동") {
			return css`
				background-color: #04c50c;
				color: #ffffff;
			`;
		} else if (props.category === "공부") {
			return css`
				background-color: #9900cf;
				color: #ffffff;
			`;
		} else if (props.category === "취미") {
			return css`
				background-color: #e2cd0f;
				color: #ffffff;
			`;
		} else if (props.category === "독서") {
			return css`
				background-color: #e71aad;
				color: #ffffff;
			`;
		} else if (props.category === "기타") {
			return css`
				background-color: #6ae4c7;
				color: #ffffff;
			`;
		}
	}}
`;

const CardIcon = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  img {
    width: 100%;
    height: 100%;
  }

  ${customMedia.between("mobile", "lgMobile")`
    width: 1.3rem;
  height: 1.3rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    width: 1.4rem;
  height: 1.4rem;
    
  `}
  
	${customMedia.between("tablet", "desktop")`
    width: 1.5rem;
  height: 1.5rem;
  `}
`;

const CardDate = styled.div`
  font-size: 1.6rem;
  letter-spacing: 0.2px;

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.3rem;
    letter-spacing: 0;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1.4rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 1.5rem;
  `}
`;

const Progress = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const ProgressTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: #eb3901;
  margin-bottom: 0.5rem;

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.4rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1.4rem;
    
  `}
  
	${customMedia.between("tablet", "desktop")`
    
  `}
`;

const ProgressIcons = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	position: relative;
	z-index: 1;
`;

const CertiCount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
  width: 100%;
  display: flex;
  align-items: center;

  ${customMedia.between("mobile", "lgMobile")`
 font-size: 1.4rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
  font-size: 1.6rem;
    
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 1.8rem;
  `}
`;

const CertiCountNumber = styled.span`
  font-size: 3.4rem;
  font-weight: bold;
  color: #eb3901;
  ${customMedia.between("mobile", "lgMobile")`
 font-size: 2.8rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
  font-size: 3rem;
    
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 3.2rem;
  `}
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  ${customMedia.between("mobile", "lgMobile")`

margin-bottom: 1rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
   
  margin-bottom: 1rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    
    margin-bottom: 1.2rem;
  `}
`;

const RetryButton = styled.span`
  width: 100%;
  height: 3.2rem;
  padding: 0.2rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #eb3901;
  border-radius: 0.5rem;
  transition: opacity 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #eb3901;
    opacity: 0.6;
  }

  ${customMedia.between("mobile", "lgMobile")`
 font-size: 1.4rem;
 height: 3rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
  font-size: 1.4rem;
  height: 3rem;
    
  `}
  
	${customMedia.between("tablet", "desktop")`
    
  `}
`;
