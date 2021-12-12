import styled from "styled-components";

const Category = (props) => {
	return <StyledCategory {...props}>{props.children}</StyledCategory>;
};

export default Category;

const StyledCategory = styled.button`
	font-weight: bold;
	color: #8f8f8f;
	background-color: #ffffff;
	border: 1px solid #8f8f8f;
	border-radius: 2rem;
	text-align: center;
	letter-spacing: 2px;
	cursor: pointer;

	&:hover {
		color: #ffffff;
		background-color: #8f8f8f;
	}
`;
