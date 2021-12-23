import React, { useState } from "react";
import styled, { css } from "styled-components";
import Category from "../common/Category";

const CategoryFilter = ({ ...props }) => {
	const categories = ["전체", "운동", "공부", "취미", "독서", "기타"];
	const [selectedCategory, setSelectedCategory] = useState("전체");

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		props.onCategory(category);
	};

	return (
		<CategoryContainer>
			{categories.map((category, i) => (
				<MainCategory
					key={i}
					category={category}
					onClick={() => handleCategoryChange(category)}
					className={category === selectedCategory ? "selected" : ""}
				>
					{category}
				</MainCategory>
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
	font-size: 1.6rem;
	padding: 0.6rem 1.4rem;

	${(props) => {
		switch (props.category) {
			case "전체":
				return css`
					color: #8f8f8f;
					border: 1.5px solid #8f8f8f;

					&:hover {
						color: #ffffff;
						background-color: #8f8f8f;
					}
				`;
			case "운동":
				return css`
					color: #04c50c;
					border: 1.5px solid #04c50c;

					&:hover {
						color: #ffffff;
						background-color: #04c50c;
					}
				`;
			case "공부":
				return css`
					color: #9900cf;
					border: 1.5px solid #9900cf;

					&:hover {
						color: #ffffff;
						background-color: #9900cf;
					}
				`;
			case "취미":
				return css`
					color: #e2cd0f;
					border: 1.5px solid #e2cd0f;

					&:hover {
						color: #ffffff;
						background-color: #e2cd0f;
					}
				`;
			case "독서":
				return css`
					color: #e71aad;
					border: 1.5px solid #e71aad;

					&:hover {
						color: #ffffff;
						background-color: #e71aad;
					}
				`;
			case "기타":
				return css`
					color: #6ae4c7;
					border: 1.5px solid #6ae4c7;

					&:hover {
						color: #ffffff;
						background-color: #6ae4c7;
					}
				`;
			default:
				console.log("Invalid Value");
		}
	}}

	&.selected{
		${(props) => {
			switch (props.category) {
				case "전체":
					return css`
						color: #ffffff;
						background-color: #8f8f8f;
					`;
				case "운동":
					return css`
						color: #ffffff;
						background-color: #04c50c;
					`;
				case "공부":
					return css`
						color: #ffffff;
						background-color: #9900cf;
					`;
				case "취미":
					return css`
						color: #ffffff;
						background-color: #e2cd0f;
					`;
				case "독서":
					return css`
						color: #ffffff;
						background-color: #e71aad;
					`;
				case "기타":
					return css`
						color: #ffffff;
						background-color: #6ae4c7;
					`;
				default:
					console.log("Invalid Value");
			}
		}}
`;
