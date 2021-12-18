import React from "react";

import styled from "styled-components";

import { Dialog, DialogContent } from "@mui/material";
import StyledButton from "./StyledButton";

import { ReactComponent as Close } from "../../assets/icons/close.svg";

const CommonDialog = ({ ...props }) => {
	return (
		<Dialog onClose={props.handleDialogClose} open={props.dialogOpen}>
			<StyledDialogContent>
				<CloseButton>
					<Close alt="Close icon" onClick={props.handleDialogClose} />
				</CloseButton>
				<Container>
					<Row>
						<MainText>{props.mainText}</MainText>
						<SubText>{props.subText}</SubText>
					</Row>
					<Row>
						<ConfirmButton type="button" onClick={props.handleDialogClose}>
							확인
						</ConfirmButton>
					</Row>
				</Container>
			</StyledDialogContent>
		</Dialog>
	);
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
`;

const ConfirmButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
`;
