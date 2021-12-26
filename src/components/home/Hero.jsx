import React from "react";

import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import { ReactComponent as HeroImg } from "../../assets/home-hero.svg";

const Hero = () => {
	return (
		<HeroBox>
			<HeroContainer>
				<HeroImg className="hero-img" alt="Hero img" />
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

const HeroBox = styled.article`
	width: 100%;
	height: 40rem;
  background-color: #ff3d00;
  
  ${customMedia.lessThan("mobile")`
    height: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    height: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    height: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
  
	${customMedia.between("tablet", "desktop")`
    height: 30rem;
  `}
`;

const HeroContainer = styled.div`
	width: 104rem;
	margin: 0 auto;

  display: flex;

  .hero-img{
    width: 50%;
    height: 40rem;


    ${customMedia.lessThan("mobile")`
      display: none;
    `}

    ${customMedia.between("mobile", "lgMobile")`
      display: none;
    `}
  
    ${customMedia.between("lgMobile", "tablet")`
      display: none;
    `}

    ${customMedia.between("tablet", "desktop")`
      height: 30rem;
    `}
  }

  ${customMedia.lessThan("mobile")`
    width: 31.5rem;
    justify-content: center;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 31.5rem;
    justify-content: center;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    width: 42rem;
    justify-content: center;
  `}
  
	${customMedia.between("tablet", "desktop")`
    width: 66.8rem;
  `}
`;

const HeroContents = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const HeroTitle = styled.div`
	font-size: 4.8rem;
	font-weight: bold;
	color: #ffffff;
	margin-top: 1.5rem;
  letter-spacing: 5px;
  
  ${customMedia.lessThan("mobile")`
    font-size: 3.6rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 3.6rem;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    font-size: 3.2rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 3.2rem;
  `}
  
`;

const HeroSubTitle = styled.div`
	font-size: 2.8rem;
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 2rem;
  letter-spacing: 5px;

  ${customMedia.lessThan("mobile")`
    font-size: 1.6rem;
	  margin-bottom: 1rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.6rem;
	  margin-bottom: 1rem;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.8rem;
	  margin-bottom: 1rem;
  `}
  
  ${customMedia.between("tablet", "desktop")`
    width: 22rem;
    font-size: 1.8rem;
    line-height: 2.6rem;
  `}
`;

const HeroText = styled.div`
	font-size: 2rem;
	color: #ffffff;
	margin-top: 6rem;
  letter-spacing: 2.5px;
  
  ${customMedia.lessThan("mobile")`
    font-size: 1.4rem;
	  margin-top: 4rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.4rem;
	  margin-top: 4rem;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.6rem;
	  margin-top: 2rem;

  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 1.6rem;
	  margin-top: 1rem;
  `}
`;

export default Hero;
