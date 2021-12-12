import React from "react";

import { Grid } from "@mui/material";

import styled from "styled-components";
import checkbox from "../../assets/icons/home_checkbox.png";
import goldMedal from "../../assets/icons/gold-medal.png";
import silverMedal from "../../assets/icons/sliver-medal.png";
import bronzeMedal from "../../assets/icons/bronze-medal.png";

const Contents = () => {
	return (
		<ContentBox>
			<ContentsContainer>
				<ContentsTitle>삼세번 챌린지 인증 방법</ContentsTitle>
				<Grid container rowSpacing={2}>
					<Grid container item alignItems="center" xs={12}>
						<CheckboxIcon>
							<img src={checkbox} alt="Home checkbox icon" />
						</CheckboxIcon>
						<ContentsText>
							챌린지에 참여하면 최초 1주차에 3번 인증 미션이 주어집니다.
						</ContentsText>
					</Grid>
					<Grid container item alignItems="center" xs={12}>
						<CheckboxIcon>
							<img src={checkbox} alt="Home checkbox icon" />
						</CheckboxIcon>
						<ContentsText>
							미션 성공 시 챌린지를 계속 진행할지, 그만둘지 선택할 수 있어요.
						</ContentsText>
					</Grid>
					<Grid container item alignItems="center" xs={12}>
						<CheckboxIcon>
							<img src={checkbox} alt="Home checkbox icon" />
						</CheckboxIcon>
						<ContentsText>
							미션 실패 시 아쉽지만 챌린지를 다시 도전해주세요.
						</ContentsText>
					</Grid>
					<Grid container item alignItems="center" xs={12}>
						<CheckboxIcon>
							<img src={checkbox} alt="Home checkbox icon" />
						</CheckboxIcon>
						<ContentsText>총 3번의 재도전 기회를 얻을 수 있어요.</ContentsText>
					</Grid>
					<Grid container item alignItems="center" xs={12}>
						<CheckboxIcon>
							<img src={checkbox} alt="Home checkbox icon" />
						</CheckboxIcon>
						<ContentsText>
							인증횟수 5번은 동메달{" "}
							<img src={bronzeMedal} alt="Bronze medal icon" />, 10번은 은메달{" "}
							<img src={silverMedal} alt="Silver medal icon" /> , 15번 이상은
							금메달 <img src={goldMedal} alt="Gold medal icon" /> 뱃지를
							드려요!
						</ContentsText>
					</Grid>
				</Grid>
			</ContentsContainer>
		</ContentBox>
	);
};

const ContentBox = styled.div`
	width: 100%;
	height: 40rem;
	background-color: #f6f6f6;
`;

const ContentsContainer = styled.div`
	width: 104rem;
	margin: 4rem auto;
`;

const CheckboxIcon = styled.span`
	margin-right: 1rem;
`;

const ContentsTitle = styled.div`
	font-size: 2.4rem;
	font-weight: bold;
	margin-bottom: 4.8rem;
`;

const ContentsText = styled.span`
	font-size: 2rem;
`;

export default Contents;
