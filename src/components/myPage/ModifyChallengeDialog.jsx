import React, { useState, useRef } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

import styled from "styled-components";

import { Grid, Dialog, DialogContent, TextField } from "@mui/material";
import StyledButton from "../common/StyledButton";

import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";

const ModifyChallengeDialog = ({ ...props }) => {
	return (
		<Dialog>
			<StyledDialogContent>
				<CloseButton>
					<Close alt="Close icon" onClick={props.handleDialogClose} />
				</CloseButton>
				<form>
					<Grid container direction="column">
						<Grid item></Grid>
						<Grid item></Grid>
						<Grid item></Grid>
						<Grid item></Grid>
						<Grid item></Grid>
					</Grid>
				</form>
			</StyledDialogContent>
		</Dialog>
	);
};

export default ModifyChallengeDialog;

const StyledDialogContent = styled(DialogContent)``;

const CloseButton = styled.span`
	position: absolute;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
`;
