import React from "react";

import styled from "styled-components";

import { Dialog, DialogContent } from "@mui/material";
import StyledButton from "./StyledButton";

import { ReactComponent as Close } from "../../assets/icons/close.svg";

const CommonDialog = ({ ...props }) => {
	const handleDialogRender = (id, openDialog) => {
		if (id === "success" && openDialog === "auth")
			return (
				<Dialog onClose={props.handleOpenToggle} open={props.open}>
					<StyledDialogContent>
						<CloseButton>
							<Close
								alt="Close icon"
								onClick={(e) => {
									e.stopPropagation();
									props.handleOpenToggle();
								}}
							/>
						</CloseButton>
						<Container>
							<Row>
								<MainText>
									챌린지 1주차 작심삼일 미션을 달성했습니다 🎉
								</MainText>
								<SubText>
									계속 챌린지를 진행할 수도 있고, 여기서 그만 둘 수도 있어요.
								</SubText>
							</Row>
							<Row>{handleButtonRender(props.mainText)}</Row>
						</Container>
					</StyledDialogContent>
				</Dialog>
			);
		else if (id === "retry" && openDialog === "auth")
			return (
				<Dialog onClose={props.handleOpenToggle} open={props.open}>
					<StyledDialogContent>
						<CloseButton>
							<Close
								alt="Close icon"
								onClick={(e) => {
									e.stopPropagation();
									props.handleOpenToggle();
								}}
							/>
						</CloseButton>
						<Container>
							<Row>
								<MainText>
									챌린지 1주차 작심삼일 미션을 달성하지 못했어요..
								</MainText>
								<SubText>
									{`총 ${3 - props.retry}번의 재도전 기회가 남아 있어요!`}
								</SubText>
								<SubText>마이페이지에서 챌린지를 재도전할 수 있어요.</SubText>
							</Row>
							<Row>{handleButtonRender(props.mainText)}</Row>
						</Container>
					</StyledDialogContent>
				</Dialog>
			);
		else if (id === "fail" && openDialog === "auth")
			return (
				<Dialog onClose={props.handleOpenToggle} open={props.open}>
					<StyledDialogContent>
						<CloseButton>
							<Close
								alt="Close icon"
								onClick={(e) => {
									e.stopPropagation();
									props.handleOpenToggle();
								}}
							/>
						</CloseButton>
						<Container>
							<Row>
								<MainText>챌린지 재도전 기회가 모두 소진되었습니다.</MainText>
								<SubText>아쉽지만 더이상 챌린지에 참여하실 수 없어요..</SubText>
							</Row>
							<Row>{handleButtonRender(props.mainText)}</Row>
						</Container>
					</StyledDialogContent>
				</Dialog>
			);
		else if (id === "apply" && openDialog === "apply")
			return (
				<Dialog onClose={props.handleOpenToggle} open={props.open}>
					<StyledDialogContent>
						<CloseButton>
							<Close
								alt="Close icon"
								onClick={(e) => {
									e.stopPropagation();
									props.handleOpenToggle();
								}}
							/>
						</CloseButton>
						<Container>
							<Row>
								<MainText>챌린지 참가 신청이 완료되었습니다.</MainText>
							</Row>
							<Row>{handleButtonRender(props.mainText)}</Row>
						</Container>
					</StyledDialogContent>
				</Dialog>
			);
		else if (id === "cancel" && openDialog === "cancel")
			return (
				<Dialog onClose={props.handleOpenToggle} open={props.open}>
					<StyledDialogContent>
						<CloseButton>
							<Close
								alt="Close icon"
								onClick={(e) => {
									e.stopPropagation();
									props.handleOpenToggle();
								}}
							/>
						</CloseButton>
						<Container>
							<Row>
								<MainText>챌린지 참가를 취소하시겠습니까?</MainText>
								<SubText>
									참여 취소 시 모든 챌린지 인증 기록이 삭제됩니다.
								</SubText>
							</Row>
							<Row>{handleButtonRender(props.mainText)}</Row>
						</Container>
					</StyledDialogContent>
				</Dialog>
			);
		else if (id === "delete" && openDialog === "delete")
			return (
				<Dialog onClose={props.handleOpenToggle} open={props.open}>
					<StyledDialogContent>
						<CloseButton>
							<Close
								alt="Close icon"
								onClick={(e) => {
									e.stopPropagation();
									props.handleOpenToggle();
								}}
							/>
						</CloseButton>
						<Container>
							<Row>
								<MainText>챌린지를 정말 삭제하시겠어요?</MainText>
								<SubText>챌린지에 대한 데이터가 모두 삭제됩니다.</SubText>
							</Row>
							<Row>{handleButtonRender(props.mainText)}</Row>
						</Container>
					</StyledDialogContent>
				</Dialog>
			);
		else if (id === "user" && openDialog === "user")
			return (
				<Dialog onClose={props.handleOpenToggle} open={props.open}>
					<StyledDialogContent>
						<CloseButton>
							<Close
								alt="Close icon"
								onClick={(e) => {
									e.stopPropagation();
									props.handleOpenToggle();
								}}
							/>
						</CloseButton>
						<Container>
							<Row>
								<MainText>회원 정보 변경이 완료되었습니다.</MainText>
							</Row>
							<Row>{handleButtonRender(props.mainText)}</Row>
						</Container>
					</StyledDialogContent>
				</Dialog>
			);
	};

	const handleButtonRender = (mainText) => {
		if (mainText === "챌린지 참가 신청이 완료되었습니다.") {
			return (
				<ConfirmButton type="button" onClick={props.handleOpenToggle}>
					확인
				</ConfirmButton>
			);
		} else if (mainText === "챌린지 참가를 취소하시겠습니까?") {
			return (
				<ButtonRow>
					<ConfirmButton
						type="button"
						onClick={() => props.handleChallengeCancel()}
					>
						확인
					</ConfirmButton>
					<CancelButton type="button" onClick={props.handleOpenToggle}>
						취소
					</CancelButton>
				</ButtonRow>
			);
		} else if (mainText === "챌린지 1주차 작심삼일 미션을 달성했습니다 🎉") {
			return (
				<ButtonRow>
					<ContinueButton
						type="button"
						onClick={() => {
							props.handleChallengeContinue();
							props.handleOpenToggle();
						}}
					>
						챌린지 계속 하기
					</ContinueButton>
					<StopButton
						type="button"
						onClick={() => {
							props.handleChallengeStop();
							props.handleOpenToggle();
						}}
					>
						챌린지 그만 두기
					</StopButton>
				</ButtonRow>
			);
		} else if (mainText === "챌린지 1주차 작심삼일 미션을 달성하지 못했어요..")
			return (
				<ConfirmButton type="button" onClick={props.handleOpenToggle}>
					확인
				</ConfirmButton>
			);
		else if (mainText === "회원 정보 변경이 완료되었습니다.")
			return (
				<ConfirmButton type="button" onClick={props.handleOpenToggle}>
					확인
				</ConfirmButton>
			);
		else if (mainText === "챌린지를 정말 삭제하시겠어요?")
			return (
				<ButtonRow>
					<DeleteButton
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							if (props.participants > 1) {
								alert(
									"개설자 외에 챌린지 참여자가 있으면 챌린지를 삭제하실 수 없어요!"
								);
								return;
							}
							props.handleChallengeDelete();
						}}
					>
						확인
					</DeleteButton>
					<CancelButton
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							props.handleOpenToggle();
						}}
					>
						취소
					</CancelButton>
				</ButtonRow>
			);
		else if (mainText === "챌린지 재도전 기회가 모두 소진되었습니다.")
			return (
				<ConfirmButton type="button" onClick={props.handleOpenToggle}>
					확인
				</ConfirmButton>
			);
	};

	return <>{handleDialogRender(props.id, props.openDialog)}</>;
};

export default CommonDialog;

const StyledDialogContent = styled(DialogContent)`
	padding: 6rem 9rem;
	position: relative;
`;

const CloseButton = styled.span`
	position: absolute;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3rem;
`;

const Row = styled.div`
	text-align: center;
`;

const MainText = styled.div`
	font-size: 2rem;
	font-weight: bold;
	letter-spacing: 1px;
	margin-bottom: 1rem;
`;

const SubText = styled.div`
	font-size: 1.6rem;
	letter-spacing: 1px;
	padding: 0.5rem;
`;

const ButtonRow = styled.div`
	display: flex;
	justify-content: center;
	gap: 4rem;
`;

const ConfirmButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
`;

const ContinueButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
`;

const CancelButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
	background-color: #c4c4c4;

	&:hover {
		background-color: #c4c4c4;
	}
`;

const StopButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
	background-color: #c4c4c4;

	&:hover {
		background-color: #c4c4c4;
	}
`;

const DeleteButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
`;
