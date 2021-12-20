import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Menu, MenuItem, Dialog, DialogContent } from '@mui/material';

import styled, { css } from "styled-components";

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';
import { ReactComponent as Register } from '../../assets/icons/plus.svg';
import { ReactComponent as KakaoIcon } from '../../assets/icons/kakao.svg';

import dotenv from 'dotenv';
dotenv.config();

const Navbar = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [isSticky, setIsSticky] = useState(false);
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

	const handleScroll = () => {
		window.addEventListener("scroll", () => {
			setScrollTop(window.scrollY);
		});
		if (scrollTop >= 88) setIsSticky(true);
		else setIsSticky(false);
	};

	const kakaoLoginHandler = () => {
		Kakao.Auth.login({
			success: (response) => {
				const token = response.access_token;
				axios
					.post("/login/kakao", JSON.stringify({ token: token }), {
						headers: { "Content-Type": "application/json" },
					})
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
		handleScroll();
	}, [userToken, scrollTop]);

	return (
		<>
			{!isLoggedIn ? (
				<Nav isSticky={isSticky}>
					<NavContainer>
						<NavLink to="/">
							<NavLogo>삼세번</NavLogo>
						</NavLink>
						<NavProfile type="button" onClick={handleModalOpen}>
							<img src={profile} alt="Profile icon" />
						</NavProfile>
						<StyledDialog open={modalOpen} onClose={handleModalClose}>
							<StyledDialogContent>
								삼세번과 함께 <br />
								건강한 습관을 만들어보세요!
								<KakaoLoginButton onClick={kakaoLoginHandler}>
									<LoginIcon>
										<img src={kakao} alt="Kakao icon" />
									</LoginIcon>
									<LoginText>카카오 로그인</LoginText>
								</KakaoLoginButton>
							</StyledDialogContent>
						</StyledDialog>
					</NavContainer>
				</Nav>
			) : (
				<Nav isSticky={isSticky}>
					<NavContainer>
						<NavLink to="/">
							<NavLogo>삼세번</NavLogo>
						</NavLink>
						<NavIcon>
							<NavProfile
								type="button"
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								onMouseOver={handleMouseOver}
							>
								<img src={profile} alt="Profile icon" />
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
							<NavRegister>
								<img src={register} alt="Register icon" />
							</NavRegister>
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
			z-index: 1;
			box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
		`}
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

const NavContainer = styled.div`
  width: 104rem;
  margin: 0 auto;
  padding: 2.8rem 0;

  display: flex;
  justify-content: space-between;
`;

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavProfile = styled.div`
  width: 3rem;
  height: 3rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const NavRegister = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const StyledMenu = styled(Menu)`
  .css-6hp17o-MuiList-root-MuiMenu-list {
    background-color: #ffa883;
  }

  .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper {
    box-shadow: none;
    border-radius: 0;
  }

  .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root {
    font-size: 1.4rem;
    color: #ffffff;
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
