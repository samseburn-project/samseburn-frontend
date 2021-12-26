import React, { useState, useRef } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import { Grid, Dialog, DialogContent, TextField } from "@mui/material";
import StyledButton from "../common/StyledButton";

import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";

const AuthDialog = ({ ...props }) => {
	const [imgFile, setImgFile] = useState(null);
	const [previewImg, setPreviewImg] = useState(null);
	const [contents, setContents] = useState("");
	const challengeId = props?.challengeId;
	const certifies = props?.certifies;
	const userToken = localStorage.getItem("token");
	const imgRef = useRef();

	const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0];
	const time = new Date().toTimeString().split(" ")[0];
	const authDate = `${date} ${time}`;

	const { enqueueSnackbar } = useSnackbar();

	const handleAuthDateCheck = certifies.filter(
		(certify) => certify.createdDate.slice(0, 10) === authDate.slice(0, 10)
	);

	const handleImgChange = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();

		reader.onloadend = () => {
			setImgFile(file);
			setPreviewImg(reader.result);
		};
		if (file) reader.readAsDataURL(file);
	};

	const handleImgDelete = () => {
		imgRef.current.value = "";
		setPreviewImg(null);
	};

	const handleContentsChange = (e) => {
		setContents(e.target.value);
	};

	const handleReset = () => {
		setImgFile();
		setPreviewImg();
		setContents();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		if (!imgFile) {
			enqueueSnackbar("인증 이미지를 등록해주세요!", {
				variant: "warning",
				autoHideDuration: 2000,
			});
			return;
		}

		if (!contents) {
			enqueueSnackbar("인증 후기를 입력해주세요!", {
				variant: "warning",
				autoHideDuration: 2000,
			});
			return;
		}

		if (handleAuthDateCheck !== []) {
			enqueueSnackbar("인증은 하루에 한 번만 할 수 있어요!", {
				variant: "warning",
				autoHideDuration: 2000,
			});
			return;
		}

		formData.append("image", imgFile);
		formData.append("contents", contents);

		console.log(formData);

		try {
			const { status } = await axios.post(
				`https://api.samseburn.site/challenges/${challengeId}/certi`,
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
				props.handleOpenToggle();
				enqueueSnackbar("인증이 성공적으로 등록되었습니다.", {
					variant: "success",
					autoHideDuration: 2000,
				});
			} else {
				enqueueSnackbar("인증 등록에 실패했습니다.", {
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
			{(props.id === "auth" && props.openDialog === "auth") ||
			props.openDialog === "feed" ? (
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
										{!previewImg ? (
											<AuthThumbnail>
												<DeleteButton>
													<Delete
														className="auth-img-delete"
														alt="Delete icon"
														style={{ zIndex: 10 }}
														onClick={handleImgDelete}
													/>
												</DeleteButton>
											</AuthThumbnail>
										) : (
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
										)}
									</Grid>
									<Grid item textAlign="center">
										<label htmlFor="auth-image">
											<UploadInput
												id="auth-image"
												accept="image/*"
												type="file"
												ref={imgRef}
												onChange={handleImgChange}
											/>
											<UploadButton type="button">이미지 업로드</UploadButton>{" "}
										</label>
									</Grid>
								</Grid>
								<Grid item>
									<LabelText>챌린지 인증 날짜</LabelText>
									<DateInput
										id="auth-date"
										InputProps={{ readOnly: true }}
										defaultValue={authDate}
									/>
								</Grid>
								<Grid item>
									<LabelText>챌린지 인증 후기</LabelText>

									<TextInput
										id="auth-text"
										multiline
										rows={8}
										onChange={handleContentsChange}
									/>
								</Grid>
								<Grid item textAlign="center">
									<ButtonRow>
										<EnrollButton type="submit">등록</EnrollButton>
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

export default AuthDialog;

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
	background-color: #959595;
	border-radius: 0.5rem;
	position: relative;

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
    margin: 1rem 2.5rem;
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

  &:hover {
		opacity: 1;
	}

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

	${customMedia.lessThan("mobile")`
    padding: 1rem 1.4rem;
	  font-size: 1.2rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    padding: 1rem 1.4rem;
	  font-size: 1.2rem;
  `}
  
	${customMedia.between("mobile", "lgMobile")`
    padding: 1rem 1.4rem;
	  font-size: 1.2rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    padding: 1rem 1.6rem;
    font-size: 1.2rem;
  `}
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

const EnrollButton = styled(StyledButton)`
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
  
  &:hover {
		background-color: #c4c4c4;
	}

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
