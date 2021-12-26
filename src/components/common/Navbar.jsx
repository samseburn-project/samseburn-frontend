import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Menu, MenuItem, Dialog, DialogContent } from "@mui/material";

import styled, { css } from "styled-components";
import { customMedia } from "../../GlobalStyles";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { ReactComponent as Register } from "../../assets/icons/plus.svg";
import { ReactComponent as KakaoIcon } from "../../assets/icons/kakao.svg";

import dotenv from "dotenv";
dotenv.config();

const Navbar = ({ ...props }) => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const userToken = localStorage.getItem("token");
	const navigate = useNavigate();

	const { Kakao } = window;

	const handleMouseOver = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleDropDownClose = () => {
		setAnchorEl(null);
	};

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const kakaoLoginHandler = () => {
		Kakao.Auth.login({
			success: (response) => {
				const token = response.access_token;
				axios
					.post(
						"https://api.samseburn.site/login/kakao",
						JSON.stringify({ token: token }),
						{
							headers: { "Content-Type": "application/json" },
						}
					)
					.then((res) => {
						if (res.data.token) {
							localStorage.setItem("token", res.data.token);
							handleModalClose();
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

	const kakaoLogoutHandler = () => {
		Kakao.Auth.logout(() => {
			localStorage.removeItem("token");
			navigate(0);
		});
	};

	useEffect(() => {
		if (userToken) setLoggedIn(true);
	}, [userToken]);

	return (
		<>
			{!isLoggedIn ? (
				<Nav isSticky={props?.isSticky}>
					<NavContainer>
						<NavLink to="/">
							<Logo className="nav-logo" alt="Logo" />
						</NavLink>
						<NavProfile type="button" onClick={handleModalOpen}>
							<Profile className="nav-profile" alt="Profile icon" />
						</NavProfile>
						<StyledDialog open={modalOpen} onClose={handleModalClose}>
							<StyledDialogContent>
								삼세번과 함께 <br />
								건강한 습관을 만들어보세요!
								<KakaoLoginButton onClick={kakaoLoginHandler}>
									<LoginIcon>
										<KakaoIcon className="nav-kakao" alt="Kakao icon" />
									</LoginIcon>
									<LoginText>카카오 로그인</LoginText>
								</KakaoLoginButton>
							</StyledDialogContent>
						</StyledDialog>
					</NavContainer>
				</Nav>
			) : (
				<Nav isSticky={props?.isSticky}>
					<NavContainer>
						<NavLink to="/">
							<Logo className="nav-logo" alt="Logo" />
						</NavLink>
						<NavIcon>
							<NavProfile
								type="button"
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								onMouseOver={handleMouseOver}
							>
								<Profile className="nav-profile" alt="Profile icon" />
							</NavProfile>
							<StyledMenu
								anchorEl={anchorEl}
								open={open}
								onClose={handleDropDownClose}
							>
								<NavLink to="/my">
									<MenuItem>My page</MenuItem>
								</NavLink>
								<MenuItem onClick={kakaoLogoutHandler}>Logout</MenuItem>
							</StyledMenu>
							<NavLink to="/register">
								<NavRegister>
									<Register className="nav-register" alt="Register icon" />
								</NavRegister>
							</NavLink>
						</NavIcon>
					</NavContainer>
				</Nav>
			)}
		</>
	);
};

export default Navbar;

const Nav = styled.nav`
	width: 100%;
	height: 8.8rem;

	${(props) =>
		props.isSticky &&
		css`
			position: fixed;
			top: 0;
			background-color: #ffffff;
			z-index: 1000;
			box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
		`}

	${customMedia.lessThan("mobile")`
    height: 6rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    height: 6rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    height: 8rem;
  `}


`;

const NavLink = styled(Link)`
	text-decoration: none;

	.nav-logo {
		${customMedia.lessThan("mobile")`
      width: 4.7rem;
      height: 3.2rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      width: 4.7rem;
      height: 3.2rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
      width: 5.7rem;
      height: 3.2rem;
    `}
	}
`;

const NavContainer = styled.div`
	width: 104rem;
	margin: 0 auto;
	padding: 2.8rem 0;

	display: flex;
  justify-content: space-between;
  
  ${customMedia.lessThan("mobile")`
    width: 31.5rem;
    padding: 1.4rem 0;
  `}
  
  ${customMedia.between("mobile", "lgMobile")`
    width: 31.5rem;
    padding: 1.4rem 0;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    width: 42rem;
    padding: 2.4rem 0;

  `}
  
	${customMedia.between("tablet", "desktop")`
    width: 66.8rem;
  `}
`;

const NavIcon = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
`;

const NavProfile = styled.div`
	width: 3rem;
	height: 3.2rem;
	cursor: pointer;

	${customMedia.lessThan("mobile")`
    width: 1.6rem;
    height: 3.2rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    width: 1.6rem;
    height: 3.2rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    width: 2rem;
    height: 3.2rem;
  `}

	svg {
		width: 100%;
		height: 100%;
	}
`;

const NavRegister = styled.div`
	width: 2.4rem;
	height: 2.4rem;
	cursor: pointer;

	${customMedia.lessThan("mobile")`
    width: 1.6rem;
    height: 1.6rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    width: 1.6rem;
    height: 1.6rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    width: 2rem;
    height: 2rem;
  `}
  
	svg {
		width: 100%;
		height: 100%;
	}
`;

const StyledMenu = styled(Menu)`
	left: -2.5rem;
	top: 0.2rem;

	& .MuiMenu-list {
		background-color: #ffa883;
	}

	& .MuiPopover-paper {
		box-shadow: none;
		border-radius: 0;
	}

	& .MuiMenuItem-root {
		font-size: 1.4rem;
		color: #ffffff;

		${customMedia.lessThan("mobile")`
      font-size: 1rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      font-size: 1rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
    	font-size: 1.2rem;
    `}
	}
`;

const StyledDialog = styled(Dialog)`
	display: flex;
	justify-content: center;
`;

const StyledDialogContent = styled(DialogContent)`
	padding: 6rem 8rem;
	font-size: 2.4rem;
	letter-spacing: 0.3rem;
	line-height: 2.8rem;

	display: flex;
	flex-direction: column;
	gap: 4rem;

	${customMedia.lessThan("mobile")`
    padding: 2.5rem 4.5rem;
    font-size: 1.6rem;
    gap: 2rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    padding: 2.5rem 4.5rem;
    font-size: 1.6rem;
    gap: 2rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    padding: 4rem 6rem;
    font-size: 2rem;
    gap: 2rem;
  `}
`;

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

	${customMedia.lessThan("mobile")`
    width: 23.7rem;
    padding: 1rem;
    font-size: 1.4rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    width: 23.7rem;
    padding: 1rem;
    font-size: 1.4rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    width: 26.6rem;
	  padding: 1rem;
	  font-size: 1.4rem;
  `}

	&:hover {
		opacity: 0.7;
	}
`;

const LoginIcon = styled.span`
	flex: 0.1;

	.nav-kakao {
		${customMedia.lessThan("mobile")`
      width: 2rem;
      height: 2rem;
    `}

		${customMedia.between("mobile", "lgMobile")`
      width: 2rem;
      height: 2rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
      width: 2.4rem;
      height: 2.4rem;
    `}
	}
`;

const LoginText = styled.span`
	flex: 0.8;
`;
