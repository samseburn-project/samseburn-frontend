import React, { useState } from "react";

import styled from "styled-components";

import { Menu, MenuItem } from "@mui/material";

import profile from "../../assets/icons/profile.png";
import register from "../../assets/icons/plus.png";

const Navbar = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleMouseOver = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			{!isLoggedIn ? (
				<Nav>
					<NavContainer>
						<NavLogo>삼세번</NavLogo>
						<NavProfile type="button">
							<img src={profile} alt="Profile icon" />
						</NavProfile>
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
							<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
