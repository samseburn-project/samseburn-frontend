import React, { useState, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";

import { TextField } from "@mui/material";

import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import StyledButton from "../common/StyledButton";
import CommonDialog from "../common/CommonDialog";

const ModifyUser = ({ userToken }) => {
	const [openDialog, setOpenDialog] = useState("");
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [nickname, setNickname] = useState("");
	const [image, setImage] = useState({
		imageFile: null,
		imageUrl: null,
	});

	const handleOpenDialog = (targetId) => {
		setOpenDialog(targetId);
	};

	const handleOpenToggle = () => {
		setOpen(!open);
	};

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			try {
				const res = await axios.get("/user", {
					headers: { Authorization: `Bearer ${userToken}` },
				});

				if (res.status === 200) {
					setNickname(res.data.username);
					setImage({
						imageFile: null,
						imageUrl: res.data.imgUrl,
					});
				}
			} catch (err) {
				console.error(err);
			}
			setLoading(false);
		};

		fetchUser(); // 유저 정보 요청
	}, []);

	const onChangeNickname = ({ target: { value } }) => {
		setNickname(value);
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

	const onDeleteFile = () => {
		setImage({
			imageFile: null,
			imageUrl:
				"https://samseburn-bucket.s3.ap-northeast-2.amazonaws.com/user/SpartaIconScale7.png",
		});
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("username", nickname);
			formData.append(
				"image",
				image.imageFile ? image.imageFile : image.imageUrl
			);

			await axios.put("/user", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${userToken}`,
				},
			});
		} catch (e) {
			console.error(e);
		}
	};

	if (loading) {
		return (
			<ModifyUserBox>
				<LoadingContainer>Loading...</LoadingContainer>
			</ModifyUserBox>
		);
	}

	if (!nickname) {
		return null;
	}

	return (
		<ModifyUserBox>
			<FormContainer>
				<ImageContainer>
					{/* 이미지 미리보기 */}
					<ThumbnailContainer>
						{image.imageFile || image.imageUrl ? (
							<ImageThumbnail alt="Profile Image" src={image.imageUrl} />
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
						<ImageUploadButton component="span">이미지 변경</ImageUploadButton>
					</label>
				</ImageContainer>

				<Row>
					<LabelText>닉네임*</LabelText>
					<NameInput placeholder={nickname} onChange={onChangeNickname} />
				</Row>

				<Row>
					<SubmitButton
						onClick={(e) => {
							onSubmitHandler(e);
							handleOpenToggle();
						}}
					>
						수정 완료
					</SubmitButton>
					<CommonDialog
						open={open}
						handleOpenToggle={handleOpenToggle}
						openDialog={openDialog}
						handleOpenDialog={handleOpenDialog}
						mainText={"회원 정보 변경이 완료되었습니다"}
						subText={""}
					/>
				</Row>
			</FormContainer>
		</ModifyUserBox>
	);
};

export default ModifyUser;

const LoadingContainer = styled.div`
	text-align: center;
	font-size: 2rem;
	margin: 8rem 0;
`;

const Row = styled.div`
	margin: 0;
`;

const ModifyUserBox = styled.div`
	padding-bottom: 20rem;
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ThumbnailContainer = styled.div`
	position: relative;
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

const ImageUploadButton = styled(StyledButton)`
	font-size: 1.6rem;
`;

const LabelText = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 2rem;
`;

const SubmitButton = styled(StyledButton)`
	font-size: 2rem;

	width: 33rem;
	height: 5rem;
`;

const NameInput = styled(TextField)`
	width: 33rem;
	border: 1px solid #e5e5e5;
	border-radius: 0.5rem;
	margin-bottom: ${(props) => (props.isNext ? "1rem" : "3rem")};

	.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
		font-size: 1.6rem;
		padding: 1.2rem;
	}
`;
