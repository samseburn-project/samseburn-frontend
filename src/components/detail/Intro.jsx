import React from "react";

import styled from "styled-components";

import sample from "../../assets/sample.png";

const Intro = () => {
	return (
		<IntroBox>
			<IntroContainer>
				<IntroThumbnail>
					<img src={sample} alt="Challenge Thumbnail" />
				</IntroThumbnail>
				<ContentsContainer>
					<Title>챌린지 이름</Title>
					<CategoryRow>
						<Category>카테고리</Category>
						<Category>카테고리</Category>
					</CategoryRow>
					<SubTitle>진행 기간</SubTitle>
					<Text>2021. 01. 01 ~ 2021. 12. 31</Text>
					<SubTitle>참가 인원</SubTitle>
					<Text>00 / 10 명</Text>
					<Button type="button">챌린지 참가하기</Button>
				</ContentsContainer>
			</IntroContainer>
		</IntroBox>
	);
};

export default Intro;

const IntroBox = styled.div`
	width: 100%;
	height: 50rem;
	background-color: #f6f6f6;

	display: flex;
`;

const IntroContainer = styled.div`
	width: 104rem;
	margin: 0 auto;
	align-items: center;

	display: flex;
	gap: 5rem;
`;

const IntroThumbnail = styled.div`
	width: 50.8rem;
	height: 36.6rem;

	img {
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
	}
`;

const ContentsContainer = styled.div`
	width: 50%;
	padding: 4rem;

	display: fle column;
	justify-content: center;
`;

const Title = styled.div`
	font-size: 3.4rem;
	font-weight: bold;
	margin-bottom: 2rem;
`;

const CategoryRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 2.4rem;
`;

const Category = styled.span`
	font-size: 1.4rem;
	font-weight: bold;
	padding: 0.7rem 1rem;
	border: 1px solid black;
	border-radius: 2rem;
`;

const SubTitle = styled.div`
	font-size: 2rem;
	font-weight: bold;
	color: #8f8f8f;
	margin-bottom: 1rem;
`;

const Text = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
	line-spacing: 0.2px;
	margin-bottom: 2.4rem;
`;

const Button = styled.button`
	width: 37.7rem;
	height: 5.5rem;
	font-size: 2rem;
	font-weight: bold;
	color: #ffffff;
	background-color: #eb3901;
	outline: none;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}
`;
