import React from "react";
import axios from "axios";
import KakaoLogin from "react-kakao-login";

import styled from "styled-components";

import kakao from "../../assets/icons/kakao.png";

import dotenv from "dotenv";
dotenv.config();

const KakaoSocialLogin = ({ ...props }) => {
	const onSuccess = async (res) => {
		console.log(res);

		const { profile, response } = res;

		try {
			const userInfo = {
				username: profile.properties.nickname,
				token: response.access_token,
			};

			const res = await axios.post("/login/kakao", userInfo);

			console.log(res);

			if (res.status === 200) {
				localStorage.setItem("user_name", userInfo.username);
				localStorage.setItem("user_img", userInfo.imgUrl);
				props.setLoggedIn(true);
				props.handleModalClose();
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<KakaoLogin
			token={process.env.REACT_APP_KAKAO_APPKEY}
			onSuccess={onSuccess}
			onFail={(err) => console.error("FAILED", err)}
			onLogout={() => console.log("LOGOUT")}
			render={({ onClick }) => (
				<KakaoLoginButton
					onClick={(e) => {
						e.preventDefault();
						onClick();
					}}
				>
					<LoginIcon>
						<img src={kakao} alt="Kakao icon" />
					</LoginIcon>
					<LoginText>카카오 로그인</LoginText>
				</KakaoLoginButton>
			)}
		/>
	);
};

export default KakaoSocialLogin;

const KakaoLoginButton = styled.button`
	width: 31.7rem;
	height: 4rem;
	padding: 1rem;
	font-size: 1.6rem;
	font-weight: bold;
	letter-spacing: 0.2rem;
	background-color: #ffe812;
	border: none;
	border-radius: 0.5rem;
	outline: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	&:hover {
		opacity: 0.7;
	}
`;

const LoginIcon = styled.span`
	flex: 0.1;
`;

const LoginText = styled.span`
	flex: 0.8;
`;
