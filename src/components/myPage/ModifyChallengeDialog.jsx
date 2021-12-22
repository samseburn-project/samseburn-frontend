import React, { useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { useSnackbar } from "notistack";

import styled from "styled-components";

import { Grid, Dialog, DialogContent, TextField } from "@mui/material";
import Category from "../common/Category";
import StyledButton from "../common/StyledButton";

import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";

const ModifyChallengeDialog = ({ ...props }) => {
	const [imgFile, setImgFile] = useState(null);
	const [previewImg, setPreviewImg] = useState(props.imgUrl);
	const [roadAddress, setRoadAddress] = useState("");
	const [detailAddress, setDetailAddress] = useState("");
	const [open, setOpen] = useState(false);
	const challengeId = props?.challengeId;
	const userToken = localStorage.getItem("token");
	const imgRef = useRef();

	const { enqueueSnackbar } = useSnackbar();

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

	const handleComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = "";

		if (data.addressType === "R") {
			if (data.bname !== "") {
				extraAddress += data.bname;
			}
			if (data.buildingName !== "") {
				extraAddress +=
					extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
		}

		setRoadAddress(fullAddress);
		setOpen(false);
	};

	const handleModalOpen = () => {
		setOpen(true);
	};

	const handleModalClose = () => {
		setOpen(false);
	};

	const handleRoadAddressChange = (e) => {
		setRoadAddress(e.target.value);
	};

	const handleDetailAddressChange = (e) => {
		setDetailAddress(e.target.value);
	};

	const handleReset = () => {
		setImgFile();
		setPreviewImg();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("image", imgFile);

		try {
			const { status } = await axios.put(
				`/challanges/${challengeId}`,
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
				enqueueSnackbar("챌린지가 성공적으로 수정되었습니다.", {
					variant: "success",
					autoHideDuration: 2000,
				});
				props.handleDialogClose();
			} else {
				enqueueSnackbar("챌린지 수정에 실패했습니다.", {
					variant: "error",
					autoHideDuration: 2000,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	const modalStyles = {
		overlay: {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.25)",
			zIndex: 10,
		},
		content: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			background: "white",
			overflow: "auto",
			top: "22vh",
			left: "18vw",
			right: "18vw",
			bottom: "30vh",
			WebkitOverflowScrolling: "touch",
			borderRadius: "14px",
			outline: "none",
			zIndex: 10,
			position: "relative",
		},
	};

	return (
		<Dialog onClose={props.handleDialogClose} open={props.dialogOpen}>
			<StyledDialogContent>
				<CloseButton>
					<Close alt="Close icon" onClick={props.handleDialogClose} />
				</CloseButton>
				<form onSubmit={handleSubmit}>
					<Grid container direction="column">
						<Grid item>
							<Title>{props.title}</Title>
						</Grid>
						<Grid item>
							<CategoryRow>
								<Category>{props.locationType}</Category>
								<Category>{props.category}</Category>
							</CategoryRow>
						</Grid>
						<Grid item>
							<DateText>
								{props.challengeStartDate} ~ {props.challengeEndDate}
							</DateText>
						</Grid>
						<Grid item>
							<ChallengeThumbnail>
								<img src={previewImg} alt="Challenge thumbnail" />
								<DeleteButton>
									<Delete
										alt="Delete icon"
										style={{ zIndex: 10 }}
										onClick={handleImgDelete}
									/>
								</DeleteButton>
							</ChallengeThumbnail>
						</Grid>
						<Grid item textAlign="center">
							<label htmlFor="challenge-image">
								<UploadInput
									id="challenge-image"
									accept="image/*"
									type="file"
									ref={imgRef}
									onChange={handleImgChange}
								/>
								<UploadButton type="button">이미지 변경</UploadButton>
							</label>
						</Grid>
						<Grid item>
							<LabelText>오프라인 장소</LabelText>
							<AddressInput
								id="road-address"
								placeholder="도로명 주소"
								value={roadAddress}
								onChange={handleRoadAddressChange}
							/>
							<AddressButton onClick={handleModalOpen}>주소 검색</AddressButton>
							<Modal
								isOpen={open}
								ariaHideApp={false}
								onRequestClose={handleModalClose}
								style={modalStyles}
							>
								<CloseButton onClick={handleModalClose}>
									<Close alt="Close icon" />
								</CloseButton>
								<DaumPostcode onComplete={handleComplete} {...props} />
							</Modal>
							<AddressInput
								id="detail-address"
								placeholder="상세 주소"
								value={detailAddress}
								onChange={handleDetailAddressChange}
							/>
						</Grid>
						<Grid item>
							<ButtonRow>
								<EditButton type="submit">수정</EditButton>
								<CancelButton
									type="button"
									onClick={() => props.handleDialogClose()}
								>
									취소
								</CancelButton>
							</ButtonRow>
						</Grid>
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

const Title = styled.div`
	font-size: 2rem;
	font-weight: bold;
	letter-spacing: 2px;
`;

const CategoryRow = styled.div`
	display: flex;
	justify-content: center;
`;

const DateText = styled.div`
	font-size: 1.6rem;
`;

const ChallengeThumbnail = styled.div`
	margin: 1rem 0;
	width: 24rem;
	height: 24rem;
	position: relative;

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
	font-size: 1.6rem;
	font-weight: bold;
	letter-spacing: 1px;
`;

const AddressInput = styled(TextField)`
	width: 33rem;
	border: 1px solid #c4c4c4;
	border-radius: 0.5rem;
`;

const AddressButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.4rem;
	background-color: #c4c4c4;

	&:hover {
		background-color: #c4c4c4;
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
`;

const CancelButton = styled(StyledButton)`
	padding: 0.8rem 1.8rem;
	font-size: 1.6rem;
	background-color: #c4c4c4;

	&:hover {
		background-color: #c4c4c4;
	}
`;
