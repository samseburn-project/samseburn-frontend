import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import addDays from "date-fns/addDays";

import styled from "styled-components";

import { TextField, Box, IconButton } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";

import StyledButton from "../common/StyledButton";

import { ReactComponent as ArrowForward } from "../../assets/icons/arrow.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

function RegisterForm(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [participants, setParticipants] = useState(0);
	const [roadAddress, setRoadAddress] = useState("");
	const [detailAddress, setDetailAddress] = useState("");
	const [category, setCategory] = useState("");
	const [locationType, setLocationType] = useState("");
	const [date, setDate] = useState([null, null]);
	const [image, setImage] = useState({
		imageFile: null,
		imageUrl: null,
	});
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const navigate = useNavigate();
	const userToken = localStorage.getItem("token");
	const MAX_DATE = 99;
	const categories = ["운동", "생활", "공부", "취미", "독서", "기타"];
	const locationTypes = ["온라인", "오프라인"];

	const { enqueueSnackbar } = useSnackbar();

	const onChange = (event) => {
		event.preventDefault();
		const {
			target: { name, value },
		} = event;
		if (name === "title") {
			setTitle(value);
		} else if (name === "participants") {
			setParticipants(value);
		} else if (name === "roadAddress") {
			setRoadAddress(value);
		} else if (name === "detailAddress") {
			setDetailAddress(value);
		} else if (name === "description") {
			setDescription(value);
		}
	};

	const onCategory = (event) => {
		const {
			target: { value },
		} = event;
		setCategory(value);
	};

	const onLocationType = (event) => {
		const {
			target: { value },
		} = event;
		setLocationType(value);
		if (value === "온라인") {
			setRoadAddress("");
			setDetailAddress("");
		}
	};

	const setImageFromFile = ({ file, setImageUrl }) => {
		const reader = new FileReader();
		reader.onload = () => {
			setImageUrl({ result: reader.result });
		};
		reader.readAsDataURL(file);
	};

	const onLoadFile = ({ target: { files } }) => {
		if (files.length) {
			setImageFromFile({
				file: files[0],
				setImageUrl: ({ result }) =>
					setImage({
						imageFile: files[0],
						imageUrl: result,
					}),
			});
		}
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
		setIsPopupOpen(false);
	};

	const onClickPopupHandler = () => {
		setIsPopupOpen(true);
	};

	const onModalHandler = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	const onDeleteFile = () => {
		setImage({
			imageFile: null,
			imageUrl: null,
		});
	};

	const onSubmitFormData = async () => {
		try {
			const address =
				locationType === "온라인" ? "" : roadAddress + detailAddress;

			const formData = new FormData();

			if (participants < 0) {
				alert("참여인원은 숫자 0 이상부터 입력할 수 있습니다.");
				return;
			}

			formData.append("image", image.imageFile);
			formData.append("title", title);
			formData.append("description", description);
			formData.append("challengeStartDate", date[0].toISOString().slice(0, 10));
			formData.append("challengeEndDate", date[1].toISOString().slice(0, 10));
			formData.append("limitPerson", participants);
			formData.append("category", category);
			formData.append("locationType", locationType);
			formData.append("address", address);
			formData.append("challengeProgress", "INPROGRESS");

			// for (let data of formData.entries()) {
			//   console.log(data[0] + ', ' + data[1]);
			// }

			const res = await axios.post("/challenge", formData, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			console.log(res);

			if (res.status === 200) {
				enqueueSnackbar("챌린지가 생성되었습니다.", {
					variant: "success",
					autoHideDuration: 2000,
				});
				navigate("/");
			} else {
				enqueueSnackbar("챌린지 생성에 실패했습니다.", {
					variant: "error",
					autoHideDuration: 2000,
				});
			}

			// const response = axios({
			//   method: 'post',
			//   url: '/challenge',
			//   data: formData,
			//   headers: {
			//     Authorization: `Bearer ${userToken}`,
			//   },
			// });
		} catch (err) {
			console.error(err);
		}
	};

	const onCancelHandler = () => {
		navigate("/");
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
		},
	};

	return (
		<RegisterPageBox>
			<Title>챌린지 생성</Title>
			<FormContainer>
				<CustomContainer>
					<div>
						{/* 챌린지명 */}
						<LabelText>챌린지명*</LabelText>
						<BasicInput
							placeholder="챌린지명"
							size="small"
							value={title}
							name="title"
							onChange={onChange}
							required
						/>

						{/* 챌린지 기간 */}
						<LabelText>챌린지 기간*</LabelText>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateRangePicker
								disablePast
								inputFormat={"yyyy-MM-dd"}
								mask={"____-__-__"}
								maxDate={addDays(date[0], MAX_DATE)}
								value={date}
								onChange={(newValue) => {
									setDate(newValue);
								}}
								renderInput={(startProps, endProps) => (
									<>
										<DateInput
											ref={startProps.inputRef}
											{...startProps.inputProps}
										/>
										<Box sx={{ mx: 2 }}>
											<ArrowForward />
										</Box>
										<DateInput
											ref={endProps.inputRef}
											{...endProps.inputProps}
										/>
									</>
								)}
							/>
						</LocalizationProvider>

						{/* 챌린지 인원 */}
						<LabelText>챌린지 인원*</LabelText>
						<NumInput
							type="number"
							placeholder="0"
							name="participants"
							value={participants}
							onChange={onChange}
						/>
					</div>

					{/* 챌린지 이미지 */}
					<ImageContainer>
						{/* 이미지 미리보기 */}
						<ThumbnailContainer>
							{image.imageFile ? (
								<ImageThumbnail
									alt={image.imageFile.name}
									src={image.imageUrl}
								/>
							) : (
								<DefaultThumbnail></DefaultThumbnail>
							)}
							{/* 이미지 삭제 버튼 */}
							<DeleteButtonContainer onClick={onDeleteFile}>
								<Delete alt="Delete icon" style={{ zIndex: 10 }} />
							</DeleteButtonContainer>
						</ThumbnailContainer>

						{/* 이미지 업로드 버튼 */}
						<label htmlFor="input-image">
							<ImageFileInput
								type="file"
								accept="image/*"
								name="file"
								onChange={onLoadFile}
								id="input-image"
							/>
							<UploadButton component="span">이미지 업로드</UploadButton>
						</label>
					</ImageContainer>
				</CustomContainer>

				{/* 카테고리 */}
				<Row>
					<LabelText>카테고리*</LabelText>

					{/* 카테고리-챌린지주제 */}
					<SmallLabelText>챌린지 주제*</SmallLabelText>
					<CategoryContainer>
						{categories.map((item, i) => (
							<CategoryLabel className="categoryGroup" key={i}>
								<CategoryRadio
									type="radio"
									name="category"
									value={item}
									onChange={onCategory}
									checked={category === item}
								></CategoryRadio>
								<CategorySpan>{item}</CategorySpan>
							</CategoryLabel>
						))}
					</CategoryContainer>

					{/* 카테고리-챌린지유형 */}
					<SmallLabelText>챌린지 유형*</SmallLabelText>
					<CategoryContainer>
						{locationTypes.map((item, i) => (
							<LocationTypeLabel className="locationTypeGroup" key={i}>
								<LocationTypeRadio
									type="radio"
									name="locationType"
									value={item}
									onChange={onLocationType}
									checked={locationType === item}
								></LocationTypeRadio>
								<LocationTypeSpan>{item}</LocationTypeSpan>
							</LocationTypeLabel>
						))}
					</CategoryContainer>

					{locationType === "오프라인" ? (
						<>
							<SmallLabelText>오프라인 장소</SmallLabelText>
							<AddressRow>
								<AddressInput
									name="roadAddress"
									placeholder="도로명 주소"
									value={roadAddress}
									onChange={onChange}
									InputProps={{
										readOnly: true,
									}}
								/>
								<AddressButton onClick={onClickPopupHandler}>
									주소 검색
								</AddressButton>
								<Modal
									isOpen={isPopupOpen}
									ariaHideApp={false}
									onRequestClose={onModalHandler}
									style={modalStyles}
								>
									<CloseIconButton onClick={onModalHandler}>
										<Close alt="Close icon" />
									</CloseIconButton>
									<DaumPostcode onComplete={handleComplete} {...props} />;
								</Modal>
							</AddressRow>
							<AddressInput
								name="detailAddress"
								placeholder="상세 주소"
								value={detailAddress}
								onChange={onChange}
							/>
						</>
					) : (
						""
					)}
					{/* 카테고리-오프라인주소입력 */}
				</Row>

				{/* 챌린지 설명 */}
				<Row>
					<LabelText>챌린지 설명*</LabelText>
					<TextInput
						name="description"
						multiline
						rows={8}
						value={description}
						onChange={onChange}
					></TextInput>
				</Row>
				<ButtonContainer>
					<EnrollButton onClick={onSubmitFormData}>등록</EnrollButton>
					<CancelButton onClick={onCancelHandler}>취소</CancelButton>
				</ButtonContainer>
			</FormContainer>
		</RegisterPageBox>
	);
}

export default RegisterForm;

const RegisterPageBox = styled.div`
	padding: 0 17.7rem;
`;

const Title = styled.div`
	font-size: 2.4rem;
	font-weight: bold;

	margin-bottom: 5rem;
`;

const FormContainer = styled.div`
	&:checked {
		background-color: #000000;
	}
`;

const Row = styled.div``;

const CustomContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LabelText = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin: 2rem 0;
`;

const SmallLabelText = styled.div`
	font-size: 1.6rem;
	font-weight: bold;

	margin-bottom: 1.5rem;
`;

const BasicInput = styled.input`
	width: 100%;
	padding: 1rem;
	font-size: 1.6rem;
	border: 1px solid #e5e5e5;
	border-radius: 0.5rem;
	box-sizing: border-box;
	margin-bottom: 2rem;
`;

const DateInput = styled(BasicInput)`
	width: 16.5rem;
`;

const NumInput = styled(BasicInput)`
	width: 6.5rem;
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

	.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
		font-size: 1.4rem;
		padding: 1.2rem;
	}
`;

const TextInput = styled(TextField)`
	width: 100%;
	border: 1px solid #e5e5e5;
	border-radius: 0.5rem;

	.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root {
		font-size: 1.6rem;
		padding: 1.2rem;
	}

	margin-bottom: 3rem;
`;

const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ImageThumbnail = styled.img`
	width: 24.2rem;
	height: 24.2rem;
	border-radius: 0.5rem;
	object-fit: cover;
	margin-bottom: 2rem;
`;

const DefaultThumbnail = styled.div`
	width: 24.2rem;
	height: 24.2rem;
	border-radius: 0.5rem;
	background-color: lightgray;
	margin-bottom: 2rem;
`;

const ImageFileInput = styled.input`
	display: none;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 8rem;
`;

const AddressButton = styled(StyledButton)`
	background-color: #c4c4c4;
	color: white;

	font-size: 1.6rem;
	font-weight: bold;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.6;
	}
`;

const CancelButton = styled(StyledButton)`
	font-size: 2rem;
	font-weight: bold;
	background-color: #e5e5e5;

	&:hover {
		background-color: #e5e5e5;
	}
`;

const UploadButton = styled(StyledButton)`
	font-size: 1.6rem;
	font-weight: bold;

	margin-bottom: 2rem;
`;

const EnrollButton = styled(StyledButton)`
	font-size: 2rem;
	font-weight: bold;
`;

const CategoryContainer = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 2rem;
`;

const ThumbnailContainer = styled.div`
	position: relative;
`;

const CloseIconButton = styled(IconButton)`
	margin-left: auto;
`;

const CategoryLabel = styled.label`
	width: 6.5rem;
	height: 3.2rem;

	font-size: 1.6rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 2px;
	cursor: pointer;
	line-height: 3.2rem;

	input:checked + span {
		background-color: #ffa883;
		color: white;
	}
`;

const CategoryRadio = styled.input`
	display: none;
`;

const CategorySpan = styled.span`
	display: inline-block;
	width: 6.5rem;
	height: 3.2rem;

	color: #ffa883;
	background-color: #ffffff;
	border: 1px solid #ffa883;
	border-radius: 2rem;

	&:hover {
		background-color: #ffa883;
		color: white;
	}
`;

const LocationTypeLabel = styled.label`
	width: 8.9rem;
	height: 3.2rem;

	font-size: 1.6rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 2px;
	cursor: pointer;
	line-height: 3.2rem;

	input:checked + span {
		background-color: #ffa883;
		color: white;
	}
`;

const LocationTypeRadio = styled.input`
	display: none;
`;

const LocationTypeSpan = styled.span`
	display: inline-block;
	width: 8.9rem;
	height: 3.2rem;

	color: #ffa883;
	background-color: #ffffff;
	border: 1px solid #ffa883;
	border-radius: 2rem;

	&:hover {
		background-color: #ffa883;
		color: white;
	}
`;

const DeleteButtonContainer = styled.div`
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
