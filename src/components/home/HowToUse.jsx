import React from "react";

import styled from "styled-components";

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
						<Checkbox alt="Home checkbox icon" />
						<ContentsText>
							챌린지에 참여하면 최초 1주차에 3번 인증 미션이 주어집니다.
						</ContentsText>
					</TextRow>
					<TextRow>
						<Checkbox alt="Home checkbox icon" />
						<ContentsText>
							미션 성공 시 챌린지를 계속 진행할지, 그만둘지 선택할 수 있어요.
						</ContentsText>
					</TextRow>
					<TextRow>
						<Checkbox alt="Home checkbox icon" />
						<ContentsText>
							미션 실패 시 아쉽지만 챌린지를 다시 도전해주세요.
						</ContentsText>
					</TextRow>
					<TextRow>
						<Checkbox alt="Home checkbox icon" />
						<ContentsText>총 3번의 재도전 기회를 얻을 수 있어요.</ContentsText>
					</TextRow>
					<TextRow>
						<Checkbox alt="Home checkbox icon" />
						<ContentsText>
							인증횟수 5번은 동메달 <ThirdMedal alt="3rd medal icon" />, 10번은
							은메달 <SecondMedal alt="2nd medal icon" /> , 15번 이상은 금메달{" "}
							<FirstMedal alt="1st medal icon" /> 뱃지를 드려요!
						</ContentsText>
					</TextRow>
				</TextContainer>
			</ContentsContainer>
		</ContentsBox>
	);
};

export default HowToUse;

const ContentsBox = styled.div`
	width: 100%;
	height: 40rem;
	background-color: #f6f6f6;
`;

const ContentsContainer = styled.div`
	width: 104rem;
	margin: 4rem auto;
`;

const ContentsTitle = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
	margin-bottom: 4.8rem;
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
`;
