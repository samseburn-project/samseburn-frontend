import React from "react";
import { useSnackbar } from "notistack";

import styled, { css } from "styled-components";

import Category from "../common/Category";
import StyledButton from "../common/StyledButton";
import CommonDialog from "../common/CommonDialog";
import AuthDialog from "../common/AuthDialog";

const Intro = ({ ...props }) => {
	const { enqueueSnackbar } = useSnackbar();

	return (
		<IntroBox>
			<IntroContainer>
				<IntroThumbnail>
					<img src={props.challenge?.imgUrl} alt="Challenge Thumbnail" />
				</IntroThumbnail>
				<ContentsContainer>
					<Title>{props.challenge?.title}</Title>
					<CategoryRow>
						<IntroCategory locationType={props.challenge?.locationType}>
							{props.challenge?.locationType}
						</IntroCategory>
						<IntroCategory category={props.challenge?.category.name}>
							{props.challenge?.category.name}
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
					{!props.join ? (
						<>
							<ApplyButton
								type="button"
								onClick={() => {
									if (props.userToken) {
										props.handleChallengeJoin();
										props.handleDialogOpen();
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
								dialogOpen={props.dialogOpen}
								handleDialogOpen={props.handleDialogOpen}
								handleDialogClose={props.handleDialogClose}
								mainText={"챌린지 참가 신청이 완료되었습니다."}
							/>
						</>
					) : (
						<ButtonRow>
							<AuthButton onClick={props.handleDialogOpen}>
								챌린지 인증
							</AuthButton>
							<AuthDialog
								dialogOpen={props.dialogOpen}
								handleDialogOpen={props.handleDialogOpen}
								handleDialogClose={props.handleDialogClose}
							/>
							<CancelButton
								onClick={() => {
									props.handleChallengeCancel();
									props.handleDialogOpen();
								}}
							>
								참가 취소
							</CancelButton>
							<CancelDialog
								dialogOpen={props.dialogOpen}
								handleDialogOpen={props.handleDialogOpen}
								handleDialogClose={props.handleDialogClose}
								mainText={"챌린지 참가 신청이 취소되었습니다."}
							/>
						</ButtonRow>
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
`;

const IntroContainer = styled.div`
	width: 104rem;
	margin: 0 auto;
	align-items: center;

	display: flex;
	gap: 5rem;
`;

const IntroThumbnail = styled.div`
	width: 50.8rem;
	height: 36.6rem;

	img {
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
	}
`;

const ContentsContainer = styled.div`
	width: 50%;
	padding: 4rem;

	display: fle column;
	justify-content: center;
`;

const Title = styled.div`
	font-size: 3.4rem;
	font-weight: bold;
	margin-bottom: 1.5rem;
`;

const CategoryRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 3rem;
`;

const IntroCategory = styled(Category)`
	font-size: 1.4rem;
	padding: 0.8rem 1.4rem;
	cursor: default;

	${(props) => {
		if (props.locationType === "ONLINE") {
			return css`
				color: #ffffff;
				background-color: #ff4d00;
			`;
		} else if (props.locationType === "OFFLINE") {
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
	font-size: 2rem;
	font-weight: bold;
	color: #8f8f8f;
	margin-bottom: 1rem;
`;

const Text = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
	letter-spacing: 2px;
	margin-bottom: 2.4rem;
`;

const ApplyButton = styled(StyledButton)`
	width: 37.7rem;
	height: 5.5rem;
	font-size: 2rem;
`;

const ApplyDialog = styled(CommonDialog)``;

const ButtonRow = styled.div`
	display: flex;
	gap: 2.4rem;
`;

const AuthButton = styled(StyledButton)`
	width: 17.6rem;
	height: 5.5rem;
	font-size: 2rem;
`;

const CancelButton = styled(StyledButton)`
	width: 17.6rem;
	height: 5.5rem;
	font-size: 2rem;
`;
const CancelDialog = styled(CommonDialog)``;
