import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

import kakao from "../../assets/icons/kakao.png";

import dotenv from "dotenv";
dotenv.config();

const { Kakao } = window;

const KakaoSocialLogin = ({ ...props }) => {
	const navigate = useNavigate();
	const kakaoLoginHandler = () => {
		Kakao.Auth.login({
			success: (response) => {
				const token = response.access_token;
				console.log(token);
				axios
					.post(
						"https://api.fevertime.shop/login/kakao",
						JSON.stringify({ token: token }),
						{
							headers: { "Content-Type": "application/json" },
						}
					)
					.then((res) => {
						console.log(res);
						if (res.data.token) {
							localStorage.setItem("token", res.data.token);
							props.onClose();
							navigate(0);
						}
					})
					.catch((err) => console.error(err));
			},
			fail: (err) => {
				console.log(err);
			},
		});
	};

	return (
		<KakaoLoginButton onClick={kakaoLoginHandler}>
			<LoginIcon>
				<img src={kakao} alt="Kakao icon" />
			</LoginIcon>
			<LoginText>카카오 로그인</LoginText>
		</KakaoLoginButton>
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
