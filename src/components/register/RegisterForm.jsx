import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
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
	const navigate = useNavigate();
	const userToken = localStorage.getItem("token");
	const MAX_DATE = 99;
	const categories = ["운동", "생활", "공부", "취미", "독서", "기타"];
	const locationTypes = ["ONLINE", "OFFLINE"];

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
		if (value === "ONLINE") {
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
				locationType === "ONLINE" ? "" : roadAddress + detailAddress;

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
				navigate("/");
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
								// size="small"
								// startText="시작 일자"
								// endText="종료 일자"
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
							<RedSmallButton component="span">이미지 업로드</RedSmallButton>
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
								<LocationTypeSpan>
									{item === "ONLINE" ? "온라인" : "오프라인"}
								</LocationTypeSpan>
							</LocationTypeLabel>
						))}
					</CategoryContainer>

					{locationType === "OFFLINE" ? (
						<>
							<SmallLabelText>오프라인 장소</SmallLabelText>
							<Box>
								<BasicInput
									placeholder="도로명 주소"
									size="small"
									isNext={true}
									name="roadAddress"
									value={roadAddress}
									onChange={onChange}
									readOnly
								/>
								<BlackSmallButton onClick={onClickPopupHandler}>
									주소 검색
								</BlackSmallButton>
							</Box>
							<BasicInput
								placeholder="상세주소"
								size="small"
								name="detailAddress"
								value={detailAddress}
								onChange={onChange}
							/>
							<Modal
								isOpen={isPopupOpen}
								ariaHideApp={false}
								onRequestClose={onModalHandler}
								style={modalStyles}
							>
								<CloseIconButton onClick={onModalHandler}>
									<Close />
								</CloseIconButton>
								<DaumPostcode onComplete={handleComplete} {...props} />;
							</Modal>
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
					<RedBigButton onClick={onSubmitFormData}>등록</RedBigButton>
					<BlackBigButton onClick={onCancelHandler}>취소</BlackBigButton>
				</ButtonContainer>
			</FormContainer>
		</RegisterPageBox>
	);
}

export default RegisterForm;

const RegisterPageBox = styled.div`
	padding: 0 17.7rem;
`;

// const Wrapper = styled.section`
//   width: 104rem;
//   margin: 10rem auto;
// `;

const Title = styled.div`
	font-size: 2.4rem;
	font-weight: bold;

	margin-bottom: 5rem;
`;

const FormContainer = styled.div`
	/* margin: 0 8.8rem; */
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

	margin-bottom: 2rem;
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

	margin-bottom: ${(props) => (props.isNext ? "1rem" : "3rem")};
`;

const DateInput = styled(BasicInput)`
	width: 16.5rem;
`;

const NumInput = styled(BasicInput)`
	width: 6.5rem;
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
	gap: 1rem;
`;

const BlackSmallButton = styled(StyledButton)`
	background-color: #c4c4c4;
	color: white;

	font-size: 1.6rem;
	font-weight: bold;

	/* margin: 0 1rem; */
	margin-bottom: 2rem;

	&:hover {
		background-color: white;
		color: #e5e5e5;
	}
`;

const BlackBigButton = styled(StyledButton)`
	background-color: #c4c4c4;
	color: white;

	font-size: 2rem;
	font-weight: bold;

	/* margin: 0 1rem; */
	margin-bottom: 2rem;

	&:hover {
		background-color: white;
		color: #e5e5e5;
	}
`;

const RedSmallButton = styled(StyledButton)`
	background-color: #eb3901;
	color: white;

	font-size: 1.6rem;
	font-weight: bold;

	margin-bottom: 2rem;

	&:hover {
		background-color: #ffe6db;
		color: #eb3901;
	}
`;

const RedBigButton = styled(StyledButton)`
	background-color: #eb3901;
	color: white;

	font-size: 2rem;
	font-weight: bold;

	/* margin: 0 1rem; */
	margin-bottom: 2rem;

	&:hover {
		background-color: #ffe6db;
		color: #eb3901;
	}
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
