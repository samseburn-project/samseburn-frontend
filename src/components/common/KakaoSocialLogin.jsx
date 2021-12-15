import React from "react";
import axios from "axios";
import KakaoLogin from "react-kakao-login";

import styled from "styled-components";

import kakao from "../../assets/icons/kakao.png";

import dotenv from "dotenv";
dotenv.config();

const KakaoSocialLogin = ({ ...props }) => {
	const onSuccess = async (res) => {
		const { response } = res;

		try {
			const kakaoToken = { token: response.access_token };
			console.log(JSON.stringify(kakaoToken));

			const res = await axios
				.post("/login/kakao", kakaoToken, {
					headers: { "Content-Type": `application/json` },
				})
				.then((res) => {
					console.log("SUCCESS", res);
				})
				.catch((err) => console.log("ERROR", err));

			if (res.status === 200) {
				localStorage.setItem("username", res.username);
				localStorage.setItem("token", res.token);
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
