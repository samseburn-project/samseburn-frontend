import React from "react";

import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import { ReactComponent as Checkbox } from "../../assets/icons/home-checkbox.svg";
import { ReactComponent as FirstMedal } from "../../assets/icons/1st-medal-icon.svg";
import { ReactComponent as SecondMedal } from "../../assets/icons/2nd-medal-icon.svg";
import { ReactComponent as ThirdMedal } from "../../assets/icons/3rd-medal-icon.svg";

const HowToUse = () => {
	return (
		<ContentsBox>
			<ContentsContainer>
				<ContentsTitle>삼세번 챌린지 인증 방법</ContentsTitle>
				<TextContainer>
					<TextRow>
						<Checkbox className="home-checkbox" alt="Home checkbox icon" />
						<ContentsText>
							챌린지에 참여하면 최초 1주차에 3번 인증 미션이 주어집니다.
						</ContentsText>
					</TextRow>
					<TextRow>
						<Checkbox className="home-checkbox" alt="Home checkbox icon" />
						<ContentsText>
							미션 성공 시 챌린지를 계속 진행할지, 그만둘지 선택할 수 있어요.
						</ContentsText>
					</TextRow>
					<TextRow>
						<Checkbox className="home-checkbox" alt="Home checkbox icon" />
						<ContentsText>
							미션 실패 시 아쉽지만 챌린지를 다시 도전해주세요.
						</ContentsText>
					</TextRow>
					<TextRow>
						<Checkbox className="home-checkbox" alt="Home checkbox icon" />
						<ContentsText>총 3번의 재도전 기회를 얻을 수 있어요.</ContentsText>
					</TextRow>
					<TextRow>
						<Checkbox className="home-checkbox" alt="Home checkbox icon" />
						<ContentsText>
							인증횟수 5번은 동메달{" "}
							<ThirdMedal className="home-medal" alt="3rd medal icon" />, 10번은
							은메달 <SecondMedal className="home-medal" alt="2nd medal icon" />
							, 15번 이상은 금메달{" "}
							<FirstMedal className="home-medal" alt="1st medal icon" /> 뱃지를
							드려요!
						</ContentsText>
					</TextRow>
				</TextContainer>
			</ContentsContainer>
		</ContentsBox>
	);
};

export default HowToUse;

const ContentsBox = styled.article`
	width: 100%;
	height: 40rem;
	background-color: #f6f6f6;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${customMedia.lessThan("mobile")`
    height: 35rem;
  `}

	${customMedia.between("mobile", "lgMobile")`
    height: 35rem;
  `}

	${customMedia.between("lgMobile", "tablet")`
    height: 35rem;
    
  `}
`;

const ContentsContainer = styled.div`
  width: 104rem;

	.home-checkbox {
		${customMedia.lessThan("mobile")`
      display: none;
    `}

		${customMedia.between("mobile", "lgMobile")`
      display: none;
    `}

		${customMedia.between("lgMobile", "tablet")`
      display: none;
    `}
  }

  .home-medal{
    ${customMedia.lessThan("mobile")`
      width: 1.4rem;
      height: 1.4rem;
    `}

    ${customMedia.between("mobile", "lgMobile")`
      width: 1.4rem;
      height: 1.4rem;
    `}

		${customMedia.between("lgMobile", "tablet")`
      width: 1.4rem;
      height: 1.4rem;
    `}

    ${customMedia.between("tablet", "desktop")`
      width: 1.6rem;
      height: 1.6rem;
    `}
  }
  
  ${customMedia.lessThan("mobile")`
    width: 31.5rem;
    display: flex;
    flex-direction: column;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    width: 31.5rem;
    display: flex;
    flex-direction: column;
  `}
  
  ${customMedia.between("lgMobile", "tablet")`
    width: 42rem;
    display: flex;
    flex-direction: column;
  `}
  
	${customMedia.between("tablet", "desktop")`
    width: 66.8rem;
  `}

`;

const ContentsTitle = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
  margin-bottom: 4.8rem;
  
  ${customMedia.lessThan("mobile")`
    font-size: 2rem;
    margin-bottom: 3rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 2rem;
    margin-bottom: 3rem;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    font-size: 2rem;
    margin-bottom: 3.6rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 2.4rem;
  `}
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const TextRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const ContentsText = styled.span`
  font-size: 2rem;
  
  ${customMedia.lessThan("mobile")`
    font-size: 1.4rem;
    line-height: 1.8rem;
  `}

  ${customMedia.between("mobile", "lgMobile")`
    font-size: 1.4rem;
    line-height: 1.8rem;
  `}
  
	${customMedia.between("lgMobile", "tablet")`
    font-size: 1.6rem;
    line-height: 2.4rem;
  `}
  
	${customMedia.between("tablet", "desktop")`
    font-size: 1.8rem;
  `}
`;
