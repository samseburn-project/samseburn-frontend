import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledButton = (props) => {
	return <StyledMuiButton {...props}>{props.children}</StyledMuiButton>;
};

export default StyledButton;

const StyledMuiButton = styled(Button)`
	font-weight: bold;
	color: #ffffff;
	background-color: #eb3901;
	border-radius: 0.5rem;
	transition: opacity 0.3s;
	cursor: pointer;

	&:hover {
		background-color: #eb3901;
		opacity: 0.6;
	}
`;
