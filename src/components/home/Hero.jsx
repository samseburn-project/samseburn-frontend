import React from "react";

import styled from "styled-components";

import { ReactComponent as HeroImg } from "../../assets/home-hero.svg";

const Hero = () => {
	return (
		<HeroBox>
			<HeroContainer>
				<HeroImg alt="Hero img" />
				<HeroContents>
					<HeroSubTitle>번번이 습관 만들기에 실패한다면?</HeroSubTitle>
					<HeroSubTitle>작심삼일부터 천천히 시작해보세요!</HeroSubTitle>
					<HeroText>작심삼일 습관 형성 어플리케이션</HeroText>
					<HeroTitle>삼세번</HeroTitle>
				</HeroContents>
			</HeroContainer>
		</HeroBox>
	);
};

const HeroBox = styled.div`
	width: 100%;
	height: 40rem;
	background-color: #ff3d00;
`;

const HeroContainer = styled.div`
	width: 104rem;
	margin: 0 auto;

	display: flex;
`;

const HeroContents = styled.div`
	padding: 9rem 0;
`;

const HeroTitle = styled.div`
	font-size: 4.8rem;
	font-weight: bold;
	color: #ffffff;
	margin-top: 1.5rem;
	letter-spacing: 5px;
`;

const HeroSubTitle = styled.div`
	font-size: 2.8rem;
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 2rem;
	letter-spacing: 5px;
`;

const HeroText = styled.div`
	font-size: 2rem;
	color: #ffffff;
	margin-top: 3.4rem;
	letter-spacing: 2.5px;
`;

export default Hero;
