import React from "react";
import styled from "styled-components";
import Category from "../common/Category";

const CategoryFilter = () => {
	const categories = [
		"전체",
		"온라인",
		"오프라인",
		"운동",
		"공부",
		"취미",
		"독서",
		"기타",
	];

	return (
		<CategoryContainer>
			{categories.map((category, i) => (
				<MainCategory key={i}>{category}</MainCategory>
			))}
		</CategoryContainer>
	);
};

export default CategoryFilter;

const CategoryContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const MainCategory = styled(Category)`
	font-size: 1.4rem;
	padding: 0.8rem 1.4rem;

	&:hover {
		color: #ffffff;
		background-color: #8f8f8f;
	}
`;
