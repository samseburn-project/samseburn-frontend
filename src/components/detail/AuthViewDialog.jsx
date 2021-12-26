import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import { Grid, Dialog, DialogContent, TextField } from "@mui/material";
import StyledButton from "../common/StyledButton";

import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";

const AuthViewDialog = ({ ...props }) => {
	const challengeId = props?.challengeId;
	const certifyId = props?.certifyId;
	const userChallengeId = props?.userChallengeId;
	const certificationId = props?.id;
	const previewImg = props?.certifyImg;
	const [contents, setContents] = useState("");
	const userToken = localStorage.getItem("token");

	const { enqueueSnackbar } = useSnackbar();

	const handleContentsChange = (e) => {
		setContents(e.target.value);
	};

	const handleReset = () => {
		setContents();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("contents", contents);

		try {
			const { status } = await axios.put(
				`https://api.samseburn.site/challenges/${challengeId}/certis/${certificationId}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			if (status === 200) {
				handleReset();
				enqueueSnackbar("인증 후기가 성공적으로 수정되었습니다.", {
					variant: "success",
					autoHideDuration: 2000,
				});
				props.handleOpenToggle();
			} else {
				enqueueSnackbar("인증 후기 수정에 실패했습니다.", {
					variant: "error",
					autoHideDuration: 2000,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{props.id === Number(props.openDialog) ? (
				<Dialog onClose={props.handleOpenToggle} open={props.open}>
					<StyledDialogContent>
						<CloseButton>
							<Close
								className="auth-modal-close"
								alt="Close icon"
								onClick={props.handleOpenToggle}
							/>
						</CloseButton>
						<form onSubmit={handleSubmit}>
							<Grid container direction="column" rowSpacing={4}>
								<Grid item container direction="column">
									<Grid item>
										<AuthThumbnail>
											<img src={previewImg} alt="Auth Thumbnail" />
											<DeleteButton style={{ cursor: "default" }}>
												<Delete
													className="auth-img-delete"
													alt="Delete icon"
													style={{ zIndex: 10 }}
												/>
											</DeleteButton>
										</AuthThumbnail>
									</Grid>
								</Grid>
								<Grid item>
									<LabelText>챌린지 인증 날짜</LabelText>
									<DateInput
										id="auth-date"
										InputProps={{ readOnly: true }}
										defaultValue={props?.certifyDate}
									/>
								</Grid>
								<Grid item>
									<LabelText>챌린지 인증 후기</LabelText>
									{certifyId === userChallengeId ? (
										<TextInput
											id="auth-text"
											multiline
											rows={8}
											defaultValue={props?.certifyContents}
											onChange={handleContentsChange}
										/>
									) : (
										<TextInput
											id="auth-text"
											multiline
											rows={8}
											InputProps={{ readOnly: true }}
											defaultValue={props?.certifyContents}
										/>
									)}
								</Grid>
								<Grid item textAlign="center">
									{certifyId === userChallengeId ? (
										<ButtonRow>
											<EditButton type="submit">수정</EditButton>
											<CancelButton
												type="button"
												onClick={() => {
													handleReset();
													props.handleOpenToggle();
												}}
											>
												취소
											</CancelButton>
										</ButtonRow>
									) : (
										<ConfirmButton
											type="button"
											onClick={() => {
												props.handleOpenToggle();
											}}
										>
											확인
										</ConfirmButton>
									)}
								</Grid>
							</Grid>
						</form>
					</StyledDialogContent>
				</Dialog>
			) : (
				""
			)}
		</>
	);
};

export default AuthViewDialog;

const StyledDialogContent = styled(DialogContent)`
	padding: 4rem 7.5rem;
	position: relative;

	${customMedia.lessThan("mobile")`
    padding: 4rem 2.5rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    padding: 4rem 2.5rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    padding: 4rem 3.5rem;
  `}
`;

const CloseButton = styled.span`
	position: absolute;
	top: 1rem;
	right: 1rem;
	cursor: pointer;

	.auth-modal-close {
		${customMedia.lessThan("mobile")`
      width: 1.2rem;
      height: 1.2rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      width: 1.4rem;
      height: 1.4rem;
    `}
	}
`;

const AuthThumbnail = styled.div`
	margin: 1rem 0;
	width: 35rem;
	height: 25rem;
	position: relative;
	border-radius: 0.5rem;

	${customMedia.lessThan("mobile")`
    width: 20rem;
    height: 15rem;
    margin: 1rem 2.5rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    width: 20rem;
    height: 15rem;
    margin: 1rem 2.5rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    width: 25rem;
	  height: 20rem;
  `}

	img {
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
	}
`;

const DeleteButton = styled.span`
	position: absolute;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
	z-index: 1;
	background-color: #ffffff;
	border-radius: 50%;
	padding: 0.7rem;
	opacity: 0.6;
	transition: opacity 0.3s;

	${customMedia.lessThan("mobile")`
    padding: 0.4rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    padding: 0.4rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    padding: 0.4rem;
  `}

  .auth-img-delete {
		${customMedia.lessThan("mobile")`
      width: 1.4rem;
      height: 1.4rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      width: 1.4rem;
      height: 1.4rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
      width: 1.4rem;
      height: 1.4rem;
    `}
	}

	&:hover {
		opacity: 1;
	}
`;

const LabelText = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	letter-spacing: 1px;
	line-height: 3.2rem;

	${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
  `}
`;

const DateInput = styled(TextField)`
	width: 100%;
	border: 1px solid #c4c4c4;
	border-radius: 0.5rem;

	& .MuiOutlinedInput-input {
		font-size: 1.4rem;
		padding: 1rem 1.8rem;
		text-align: center;

		${customMedia.lessThan("mobile")`
      font-size: 1.2rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      font-size: 1.2rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
      font-size: 1.2rem;
    `}
	}
`;

const TextInput = styled(TextField)`
	width: 35rem;
	border: 1px solid #c4c4c4;
	border-radius: 0.5rem;

	${customMedia.lessThan("mobile")`
    width: 25rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    width: 25rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    width: 30rem;
  `}

	& .MuiOutlinedInput-root {
		font-size: 1.4rem;
		padding: 1.2rem;

		${customMedia.lessThan("mobile")`
      font-size: 1.2rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      font-size: 1.2rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
      font-size: 1.2rem;
    `}
	}
`;

const ButtonRow = styled.div`
	display: flex;
	justify-content: center;
	gap: 4rem;
`;

const EditButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;

	${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}

	${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}

	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}
`;

const CancelButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
	background-color: #c4c4c4;

	${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}

	${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}

	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}

	&:hover {
		background-color: #c4c4c4;
	}
`;

const ConfirmButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;

	${customMedia.lessThan("mobile")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}

	${customMedia.between("mobile", "lgMobile")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}

	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    letter-spacing: 3px;
  `}
`;
