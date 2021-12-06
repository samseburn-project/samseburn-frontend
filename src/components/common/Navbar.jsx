import styled from "styled-components";

const Navbar = () => {
	return <StyledNavbar>Navbar</StyledNavbar>;
};

export default Navbar;

const StyledNavbar = styled.nav`
	width: 100%;
	height: 8.8rem;
	background-color: #c4c4c4;
	font-size: 4rem;

	display: flex;
	justify-content: center;
	align-items: center;
`;
