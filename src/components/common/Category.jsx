import styled from "styled-components";

const Category = (props) => {
	return <StyledCategory {...props}>{props.children}</StyledCategory>;
};

export default Category;

const StyledCategory = styled.span`
	font-weight: bold;
	border-radius: 2rem;
	text-align: center;
	letter-spacing: 2px;
	cursor: pointer;

	display: flex;
	align-items: center;
`;
