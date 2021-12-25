import React, { useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { useSnackbar } from "notistack";

import styled, { css } from "styled-components";

import { Grid, Dialog, DialogContent, TextField } from "@mui/material";
import Category from "../common/Category";
import StyledButton from "../common/StyledButton";

import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";

const ModifyChallengeDialog = ({ ...props }) => {
	const [imgFile, setImgFile] = useState(props.challenge?.imgUrl);
	const [previewImg, setPreviewImg] = useState(props.challenge?.imgUrl);
	const [roadAddress, setRoadAddress] = useState("");
	const [detailAddress, setDetailAddress] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const challengeId = props.challenge?.challengeId;
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
		setModalOpen(false);
	};

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalToggle = () => {
		setModalOpen(!modalOpen);
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
		formData.append("address", `${roadAddress} ${detailAddress}`);

		try {
			const { status } = await axios.put(
				`https://api.samseburn.site/challenges/${challengeId}`,
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
				enqueueSnackbar("챌린지가 성공적으로 수정되었습니다.", {
					variant: "success",
					autoHideDuration: 2000,
				});
			} else {
				enqueueSnackbar("챌린지 수정에 실패했습니다.", {
					variant: "error",
					autoHideDuration: 2000,
				});
			}
		} catch (err) {
			if (err.response?.statusText === "Request Entity Too Large")
				alert("이미지 용량이 초과되었습니다! 다른 이미지를 선택해주세요.");
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
			width: "50%",
			padding: "5rem 2rem",
			WebkitOverflowScrolling: "touch",
			borderRadius: "0.5rem",
			outline: "none",
			zIndex: 100,
			overflow: "auto",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			position: "relative",
		},
	};

	return (
		<>
			{props.openDialog === "update" ? (
				<Dialog
					onClose={props.handleOpenToggle}
					open={props.open}
					style={{ zIndex: 10 }}
				>
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
						<form onSubmit={handleSubmit}>
							<Grid container direction="column">
								<Grid item>
									<Title>{props.challenge?.title}</Title>
								</Grid>
								<Grid item>
									<CategoryRow>
										<SmallCategory locationType={props.challenge?.locationType}>
											{props.challenge?.locationType}
										</SmallCategory>
										<SmallCategory category={props.challenge?.category}>
											{props.challenge?.category}
										</SmallCategory>
									</CategoryRow>
								</Grid>
								<Grid item>
									<DateRow>
										<DateText>
											{props.challenge?.challengeStartDate} ~{" "}
											{props.challenge?.challengeEndDate}
										</DateText>
									</DateRow>
								</Grid>
								<Grid item>
									{previewImg ? (
										<ChallengeThumbnail>
											<img src={previewImg} alt="Challenge thumbnail" />
											<DeleteButton>
												<Delete
													alt="Delete icon"
													style={{ zIndex: 10 }}
													onClick={(e) => {
														handleImgDelete();
													}}
												/>
											</DeleteButton>
										</ChallengeThumbnail>
									) : (
										<ChallengeThumbnail>
											<DeleteButton>
												<Delete
													alt="Delete icon"
													style={{ zIndex: 10 }}
													onClick={handleImgDelete}
												/>
											</DeleteButton>
										</ChallengeThumbnail>
									)}
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
									{props.challenge?.locationType === "오프라인" ? (
										<>
											<LabelText>오프라인 장소</LabelText>
											<AddressRow>
												<AddressInput
													id="road-address"
													placeholder="도로명 주소"
													value={roadAddress}
													onChange={handleRoadAddressChange}
													InputProps={{
														readOnly: true,
													}}
												/>
												<AddressButton
													onClick={(e) => {
														e.stopPropagation();
														handleModalOpen();
													}}
												>
													주소 검색
												</AddressButton>
												<Modal
													isOpen={modalOpen}
													ariaHideApp={false}
													onRequestClose={handleModalToggle}
													style={modalStyles}
												>
													<CloseButton onClick={handleModalToggle}>
														<Close alt="Close icon" />
													</CloseButton>
													<DaumPostcode
														onComplete={handleComplete}
														{...props}
													/>
												</Modal>
											</AddressRow>
											<AddressInput
												id="detail-address"
												placeholder="상세 주소"
												value={detailAddress}
												onChange={handleDetailAddressChange}
											/>
										</>
									) : (
										""
									)}
								</Grid>
								<Grid item>
									<ButtonRow>
										<EditButton type="submit">수정</EditButton>
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

export default ModifyChallengeDialog;

const StyledDialogContent = styled(DialogContent)`
	padding: 4rem 7rem;
	position: relative;
`;

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
	margin-bottom: 0.5rem;
`;

const CategoryRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;
`;

const SmallCategory = styled(Category)`
	font-size: 1.2rem;
	padding: 0.7rem 1rem;
	cursor: default;

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

const DateRow = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 3rem;
`;

const DateText = styled.div`
	font-size: 1.6rem;
	margin-left: 0.3rem;
`;

const ChallengeThumbnail = styled.div`
	margin: 1rem auto;
	width: 24rem;
	height: 24rem;
	background-color: #959595;
	border-radius: 0.5rem;
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
	line-height: 2.5rem;
	margin-top: 5rem;
`;

const AddressRow = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
`;

const AddressInput = styled(TextField)`
	width: 33rem;
	border: 1px solid #c4c4c4;
	border-radius: 0.5rem;

	& .MuiOutlinedInput-input {
		font-size: 1.4rem;
		padding: 1.2rem;
	}
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
	margin-top: 10rem;
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
