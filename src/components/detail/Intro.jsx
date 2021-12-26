import React, { useState } from "react";
import { useSnackbar } from "notistack";

import styled, { css } from "styled-components";

import { customMedia } from "../../GlobalStyles";
import Category from "../common/Category";
import StyledButton from "../common/StyledButton";
import CommonDialog from "../common/CommonDialog";
import AuthDialog from "./AuthDialog";

import { ReactComponent as FirstMedal } from "../../assets/icons/1st-medal-icon.svg";
import { ReactComponent as SecondMedal } from "../../assets/icons/2nd-medal-icon.svg";
import { ReactComponent as ThirdMedal } from "../../assets/icons/3rd-medal-icon.svg";

const Intro = ({ ...props }) => {
	const [openDialog, setOpenDialog] = useState("");
	const [open, setOpen] = useState(false);
	const userToken = localStorage.getItem("token");
	const today = new Date().getTime();
	const userMissionDate = new Date(
		props.userChallenge?.userMissionDate
	).getTime();
	const certiCount = props.userChallenge?.certiCount;

	const { enqueueSnackbar } = useSnackbar();

	const handleOpenDialog = (targetId) => {
		setOpenDialog(targetId);
	};

	const handleOpenToggle = () => {
		setOpen(!open);
	};

	const renderMedal = (count) => {
		if (count >= 15) {
			return <FirstMedal />;
		} else if (count >= 10) {
			return <SecondMedal />;
		} else if (count >= 5) {
			return <ThirdMedal />;
		} else return "";
	};

	const handleMissionStatus = (missionStatus, count, missionDate, retry) => {
		if (missionStatus === "NO" && count === 3) {
			return (
				<SuccessDialog
					id="success"
					open={open}
					handleOpenToggle={handleOpenToggle}
					openDialog={openDialog}
					handleOpenDialog={handleOpenDialog}
					handleChallengeContinue={props.handleChallengeContinue}
					handleChallengeStop={props.handleChallengeStop}
					mainText={"챌린지 1주차 작심삼일 미션을 달성했습니다 🎉"}
					subText={
						"계속 챌린지를 진행할 수도 있고, 여기서 그만 둘 수도 있어요."
					}
				/>
			);
		} else if (missionStatus === "NO" && today > missionDate && count < 3) {
			return (
				<RetryDialog
					id="retry"
					retry={props.userChallenge?.retryCount}
					open={open}
					handleOpenToggle={handleOpenToggle}
					openDialog={openDialog}
					handleOpenDialog={handleOpenDialog}
					mainText={"챌린지 1주차 작심삼일 미션을 달성하지 못했어요.."}
					subText={`총 ${3 - retry}번의 재도전 기회가 남아 있어요!`}
				/>
			);
		} else if (
			retry === 3 &&
			missionStatus === "NO" &&
			today > missionDate &&
			count < 3
		) {
			return (
				<FailDialog
					id="fail"
					open={open}
					handleOpenToggle={handleOpenToggle}
					openDialog={openDialog}
					handleOpenDialog={handleOpenDialog}
					mainText={"챌린지 재도전 기회가 모두 소진되었습니다."}
					subText={"아쉽지만 더이상 챌린지에 참여하실 수 없어요.."}
				/>
			);
		} else {
			return (
				<AuthDialog
					id="auth"
					open={open}
					handleOpenToggle={handleOpenToggle}
					openDialog={openDialog}
					handleOpenDialog={handleOpenDialog}
					challengeId={props.challenge?.challengeId}
					certifies={props.userChallenge?.certifies}
				/>
			);
		}
	};

	const handleButtonRender = (challengeStatus, challengeProgress) => {
		if (challengeStatus === "JOIN" && challengeProgress === "INPROGRESS") {
			return (
				<ButtonRow
					onClick={(e) => {
						if (e.target !== e.currentTarget) return;
					}}
				>
					<AuthButton
						id="auth"
						onClick={(e) => {
							handleOpenDialog(e.target.id);
							handleOpenToggle();
						}}
					>
						챌린지 인증
					</AuthButton>
					{handleMissionStatus(
						props.userChallenge?.firstWeekMission,
						props.userChallenge?.certiCount,
						userMissionDate,
						props.userChallenge?.retryCount
					)}
					<CancelButton
						id="cancel"
						onClick={(e) => {
							handleOpenDialog(e.target.id);
							handleOpenToggle();
						}}
					>
						참가 취소
					</CancelButton>
					<CancelDialog
						id="cancel"
						open={open}
						handleOpenToggle={handleOpenToggle}
						openDialog={openDialog}
						handleOpenDialog={handleOpenDialog}
						handleChallengeCancel={props.handleChallengeCancel}
						mainText={"챌린지 참가를 취소하시겠습니까?"}
						subText={"참여 취소 시 모든 챌린지 인증 기록이 삭제됩니다."}
					/>
				</ButtonRow>
			);
		} else if (challengeStatus === "COMPLETE" || challengeProgress === "STOP") {
			return <ClosedButton disabled>챌린지 마감</ClosedButton>;
		} else if (
			props.userChallenge === {} ||
			challengeStatus !== "JOIN" ||
			challengeStatus === "RETRY"
		) {
			return (
				<>
					<ApplyButton
						id="apply"
						type="button"
						onClick={(e) => {
							if (userToken) {
								handleOpenDialog(e.target.id);
								handleOpenToggle();
								props.handleChallengeJoin();
							} else {
								enqueueSnackbar("로그인이 필요한 기능입니다!", {
									variant: "warning",
									autoHideDuration: 2000,
								});
							}
						}}
					>
						챌린지 참가하기
					</ApplyButton>
					<ApplyDialog
						id="apply"
						open={open}
						handleOpenToggle={handleOpenToggle}
						openDialog={openDialog}
						handleOpenDialog={handleOpenDialog}
						mainText={"챌린지 참가 신청이 완료되었습니다."}
					/>
				</>
			);
		}
	};

	return (
		<IntroBox>
			<IntroContainer>
				<IntroThumbnail>
					<img src={props.challenge?.imgUrl} alt="Challenge Thumbnail" />
				</IntroThumbnail>
				<ContentsContainer>
					<Title>
						{props.challenge?.title} {certiCount ? renderMedal(certiCount) : ""}
					</Title>
					<CategoryRow>
						<IntroCategory locationType={props.challenge?.locationType}>
							{props.challenge?.locationType}
						</IntroCategory>
						<IntroCategory category={props.challenge?.category}>
							{props.challenge?.category}
						</IntroCategory>
					</CategoryRow>
					<SubTitle>진행 기간</SubTitle>
					<Text>
						{props.challenge?.challengeStartDate} ~{" "}
						{props.challenge?.challengeEndDate}
					</Text>
					<SubTitle>참가 인원</SubTitle>
					<Text>
						{props.challenge?.participants} / {props.challenge?.limitPerson} 명
					</Text>
					{handleButtonRender(
						props.userChallenge?.challengeStatus,
						props.challenge?.challengeProgress
					)}
				</ContentsContainer>
			</IntroContainer>
		</IntroBox>
	);
};

export default Intro;

const IntroBox = styled.div`
	width: 100%;
	height: 50rem;
	background-color: #f6f6f6;

	display: flex;

	${customMedia.lessThan("mobile")`
    height: 30rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    height: 30rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    height: 35rem;
  `}
`;

const IntroContainer = styled.div`
	width: 104rem;
	margin: 0 auto;
  
	display: flex;
	align-items: center;
  gap: 5rem;
  
  ${customMedia.lessThan("mobile")`
    width: 31.5rem;
    justify-content: space-between;
    gap: 3rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 31.5rem;
    justify-content: space-between;
    gap: 3rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    width: 42rem;
    gap: 0;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 66.8rem;
    gap: 3rem;
  `}
`;

const IntroThumbnail = styled.div`
	width: 50.8rem;
  height: 36.6rem;
  
  ${customMedia.lessThan("mobile")`
    width: 35.4rem;
    height: 60%;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 35.4rem;
    height: 60%;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    width: 33.5rem;
    height: 70%;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 45.7rem;
    height: 70%;
  `}

	img {
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
	}
`;

const ContentsContainer = styled.div`
	width: 50%;
	padding: 4rem;

	display: flex;
	flex-direction: column;
  justify-content: center;
  
  ${customMedia.lessThan("mobile")`
	  padding: 0.5rem 0;
  `}

  ${customMedia.between("mobile", "lgMobile")`
	  padding: 0.5rem 0;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    padding: 2rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    padding: 1rem;
  `}
`;

const Title = styled.div`
	font-size: 3.4rem;
	font-weight: bold;
  margin-bottom: 1.5rem;
  
  ${customMedia.lessThan("mobile")`
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 2rem;
    margin-bottom: 0.5rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 3rem;
    margin-bottom: 1rem;
  `}
`;

const CategoryRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 3rem;

	${customMedia.lessThan("mobile")`
    margin-bottom: 1.5rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    margin-bottom: 1.5rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    margin-bottom: 2rem;
  `}
`;

const IntroCategory = styled(Category)`
	font-size: 1.4rem;
	padding: 0.8rem 1.4rem;
  cursor: default;
  
  ${customMedia.lessThan("mobile")`
    font-size: 1rem;
	  padding: 0.4rem 0.8rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1rem;
	  padding: 0.4rem 0.8rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1rem;
	  padding: 0.4rem 0.8rem;
  `}

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

const SubTitle = styled.div`
	font-size: 2.8rem;
	font-weight: bold;
	color: #8f8f8f;
  margin-bottom: 1rem;
  
  ${customMedia.lessThan("mobile")`
    font-size: 1.4rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.4rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1.4rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 2rem;
  `}
`;

const Text = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
	letter-spacing: 2px;
  margin-bottom: 2.4rem;
  
  ${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
    white-space: pre-line;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
    white-space: pre-line;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    font-size: 1.2rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 2rem;
  `}
`;

const ApplyButton = styled(StyledButton)`
	width: 37.7rem;
	height: 5.5rem;
  font-size: 2rem;
  
  ${customMedia.lessThan("mobile")`
    width: 12.5rem;
	  height: 3.3rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 12.5rem;
	  height: 3.3rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
  	width: 17.6rem;
	  height: 3.3rem;  
    font-size: 1.2rem;
  `}

  ${customMedia.between("tablet", "desktop")`
  	width: 30.1rem;
	  height: 4.4rem;
    font-size: 1.6rem;
  `}
`;

const SuccessDialog = styled(CommonDialog)``;

const RetryDialog = styled(CommonDialog)``;

const FailDialog = styled(CommonDialog)``;

const ApplyDialog = styled(CommonDialog)``;

const ButtonRow = styled.div`
	display: flex;
	gap: 2.4rem;

	${customMedia.lessThan("mobile")`
    gap: 1rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    gap: 1rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    gap: 1.4rem;
  `}
`;

const AuthButton = styled(StyledButton)`
	width: 17.6rem;
	height: 5.5rem;
  font-size: 2rem;
  
  ${customMedia.lessThan("mobile")`
    width: 8.8rem;
    height: 3.5rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 8.8rem;
    height: 3.5rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    width: 8.8rem;
    height: 3.5rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("tablet", "desktop")`
  	width: 17.6rem;
    height: 5.5rem;
    font-size: 2rem;
  `}
`;

const CancelButton = styled(StyledButton)`
	width: 17.6rem;
	height: 5.5rem;
  font-size: 2rem;
  
  ${customMedia.lessThan("mobile")`
    width: 8.8rem;
    height: 3.5rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 8.8rem;
    height: 3.5rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
    width: 8.8rem;
    height: 3.5rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 17.6rem;
    height: 5.5rem;
    font-size: 2rem;
  `}
`;
const CancelDialog = styled(CommonDialog)``;

const ClosedButton = styled(StyledButton)`
	width: 37.7rem;
	height: 5.5rem;
	font-size: 2rem;
  background-color: #e5e5e5;
  
  ${customMedia.lessThan("mobile")`
    width: 12.5rem;
	  height: 3.3rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 12.5rem;
	  height: 3.3rem;
    font-size: 1.2rem;
  `}

  ${customMedia.between("lgMobile", "tablet")`
  	width: 17.6rem;
	  height: 3.3rem;  
    font-size: 1.2rem;
  `}

  ${customMedia.between("tablet", "desktop")`
  	width: 30.1rem;
	  height: 4.4rem;
    font-size: 1.6rem;
  `}

	&:hover {
		background-color: #e5e5e5;
	}
`;
