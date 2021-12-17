import React from "react";

import styled from "styled-components";

import { Grid, Dialog, DialogContent, Box, TextField } from "@mui/material";
import StyledButton from "../common/StyledButton";

import close from "../../assets/icons/close.png";
import trash from "../../assets/icons/trash.png";

const AuthDialog = ({ ...props }) => {
	const today = new Date().toLocaleString();

	return (
		<Dialog onClose={props.handleDialogClose} open={props.dialogOpen}>
			<StyledDialogContent>
				<CloseButton>
					<img src={close} alt="Close icon" onClick={props.handleDialogClose} />
				</CloseButton>
				<Box component="form">
					<Grid container direction="column" rowSpacing={4}>
						<Grid item container direction="column">
							<Grid item>
								{!props.certify ? (
									<AuthThumbnail>
										<DeleteButton>
											<img src={trash} alt="Trash Icon" />
										</DeleteButton>
									</AuthThumbnail>
								) : (
									<AuthThumbnail>
										<img src={props.certify.imgUrl} alt="Auth Thumbnail" />
									</AuthThumbnail>
								)}
							</Grid>
							<Grid item textAlign="center">
								<label htmlFor="auth-image">
									{!props.certify ? (
										<>
											<UploadInput
												accept="image/*"
												id="auth-image"
												type="file"
											/>
											<UploadButton type="button">이미지 업로드</UploadButton>{" "}
										</>
									) : (
										""
									)}
								</label>
							</Grid>
						</Grid>
						<Grid item>
							<LabelText>챌린지 인증 날짜</LabelText>
							{!props.certify ? (
								<DateInput
									id="auth-date"
									InputProps={{ readOnly: true }}
									defaultValue={today}
								/>
							) : (
								<DateInput
									id="auth-date"
									InputProps={{ readOnly: true }}
									defaultValue={props.certify.createdDate}
								/>
							)}
						</Grid>
						<Grid item>
							<LabelText>챌린지 인증 후기</LabelText>
							{!props.certify ? (
								<TextInput id="auth-text" multiline rows={8} />
							) : (
								<TextInput
									id="auth-text"
									multiline
									rows={8}
									InputProps={{ readOnly: true }}
									defaultValue={props.certify.contents}
								/>
							)}
						</Grid>
						<Grid item textAlign="center">
							{!props.certify ? (
								<EnrollButton type="submit">등록</EnrollButton>
							) : (
								<ConfirmButton type="button" onClick={props.handleDialogClose}>
									확인
								</ConfirmButton>
							)}
						</Grid>
					</Grid>
				</Box>
			</StyledDialogContent>
		</Dialog>
	);
};

export default AuthDialog;

const StyledDialogContent = styled(DialogContent)`
	padding: 4rem 7.5rem;
	position: relative;
`;

const CloseButton = styled.span`
	position: absolute;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
`;

const AuthThumbnail = styled.div`
	margin: 1rem 0;
	width: 35rem;
	height: 25rem;
	background-color: gray;
	border-radius: 0.5rem;
	position: relative;

	img {
		width: 100%;
		height: 100%;
	}
`;

const DeleteButton = styled.span`
	position: absolute;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
	z-index: 1;
`;

const UploadInput = styled.input`
	display: none;
`;

const UploadButton = styled.span`
	display: inline-block;
	padding: 1rem 2.4rem;
	font-size: 1.4rem;
	font-weight: bold;
	color: #ffffff;
	background-color: #eb3901;
	outline: none;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}
`;

const LabelText = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	letter-spacing: 0.1rem;
	line-height: 3.2rem;
`;

const DateInput = styled(TextField)`
	width: 100%;
	border: 1px solid #c4c4c4;
	border-radius: 0.5rem;

	.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
		font-size: 1.4rem;
		padding: 1rem 1.8rem;
		text-align: center;
	}
`;

const TextInput = styled(TextField)`
	width: 35rem;
	border: 1px solid #c4c4c4;
	border-radius: 0.5rem;

	.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root {
		font-size: 1.4rem;
		padding: 1.2rem;
	}
`;

const EnrollButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
`;

const ConfirmButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
`;
