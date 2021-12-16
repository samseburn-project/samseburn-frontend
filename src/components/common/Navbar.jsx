import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Menu, MenuItem, Dialog, DialogContent } from "@mui/material";
import KakaoSocialLogin from "./KakaoSocialLogin";

import styled from "styled-components";

import profile from "../../assets/icons/profile.png";
import register from "../../assets/icons/plus.png";

const Navbar = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const userToken = localStorage.getItem("token");

	useEffect(() => {
		if (userToken) setLoggedIn(true);
	}, []);

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

	return (
		<>
			{!isLoggedIn ? (
				<Nav>
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
								<KakaoSocialLogin
									onClose={handleModalClose}
									setLoggedIn={setLoggedIn}
								/>
							</StyledDialogContent>
						</StyledDialog>
					</NavContainer>
				</Nav>
			) : (
				<Nav>
					<NavContainer>
						<NavLogo>삼세번</NavLogo>
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
								<MenuItem>My page</MenuItem>
								<MenuItem>Logout</MenuItem>
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

const NavLogo = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
	color: #ff3d00;
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
