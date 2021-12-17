import React from 'react';

import {
  //   Card,
  //   CardContent,
  //   CardMedia,
  //   CardActionArea,
  Grid,
} from '@mui/material';
import styled from 'styled-components';

import { ReactComponent as FirstMedal } from '../../assets/1st-medal-icon.svg';
import { ReactComponent as SecondMedal } from '../../assets/2nd-medal-icon.svg';
import { ReactComponent as ThirdMedal } from '../../assets/3rd-medal-icon.svg';
import { ReactComponent as AbledProgress } from '../../assets/icons/progress-icon-abled.svg';
import { ReactComponent as DisabledProgress } from '../../assets/icons/progress-icon-disabled.svg';
import { ReactComponent as Congrats } from '../../assets/icons/congrats-icon.svg';

import Category from '../common/Category';
import calendar from '../../assets/icons/calendar.png';
import StyledButton from '../common/StyledButton';

const ChallengeCard = ({
  key,
  title,
  category,
  locationType,
  challengeStartDate,
  challengeEndDate,
  certiCount,
  imgUrl,
  challengeStatus,
  missionStatus,
}) => {
  const viewMedalIcon = (param) => {
    if (param < 5) {
      return '';
    } else if (param < 10) {
      return <ThirdMedal />;
    } else if (param < 15) {
      return <SecondMedal />;
    } else {
      return <FirstMedal />;
    }
  };

  return (
    <Grid key={key} item xs={6}>
      <StyledCard>
        <StyledCardThumbnail>
          <img alt={title} src={imgUrl} className="thumbnail"></img>
        </StyledCardThumbnail>
        <StyledCardContent>
          <Row>
            <CardTitle>{title}</CardTitle>
            {challengeStatus === 'RETRY' ? (
              ''
            ) : (
              <CardMedal>{viewMedalIcon(certiCount)}</CardMedal>
            )}
          </Row>
          <Row>
            <CardCategory>{category}</CardCategory>
            <CardCategory>
              {locationType === 'ONLINE' ? '온라인' : '오프라인'}
            </CardCategory>
          </Row>
          <Row>
            <CardIcon>
              <img src={calendar} alt="Calendar Icon" />
            </CardIcon>
            <CardDate>
              {challengeStartDate} ~ {challengeEndDate}
            </CardDate>
          </Row>
          <Row>
            {challengeStatus === 'JOIN' ? (
              missionStatus ? (
                <CertiCount>
                  누적 <CertiCountNumber>{certiCount}</CertiCountNumber>
                  회 달성
                  <Congrats />
                </CertiCount>
              ) : (
                <Progress>
                  <ProgressTitle>달성률</ProgressTitle>
                  {/* <ProgressLineContainer>
                  <ProgressLine />
                </ProgressLineContainer> */}
                  <ProgressIcons>
                    {certiCount >= 1 ? <AbledProgress /> : <DisabledProgress />}
                    {certiCount >= 2 ? <AbledProgress /> : <DisabledProgress />}
                    {certiCount >= 3 ? <AbledProgress /> : <DisabledProgress />}
                  </ProgressIcons>
                </Progress>
              )
            ) : (
              ''
            )}
            {challengeStatus === 'RETRY' ? (
              <RetryButton>재도전하기</RetryButton>
            ) : (
              ''
            )}
            {challengeStatus === 'COMPLETE' ? (
              <CertiCount>
                총 <CertiCountNumber>{certiCount}</CertiCountNumber>
                회 달성
                <Congrats />
              </CertiCount>
            ) : (
              ''
            )}
          </Row>
        </StyledCardContent>
      </StyledCard>
    </Grid>
  );
};

export default ChallengeCard;

const StyledCard = styled.div`
  height: 20rem;
  box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  cursor: pointer;
  word-break: break-all;
  margin: 2rem;

  .thumbnail {
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    margin: 2.5rem;
    border-radius: 0.5rem;
  }

  &:hover {
    background-color: #f6f6f6;
  }
`;

const StyledCardThumbnail = styled.div`
  width: 40%;
`;
const StyledCardContent = styled.div`
  width: 60%;
`;

const CardTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const CardMedal = styled.div``;

const CardCategory = styled(Category)`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  color: #8f8f8f;
  background-color: #e5e5e5;
  border: none;
  &:hover {
    color: #8f8f8f;
    background-color: #e5e5e5;
  }
`;

const CardIcon = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

const CardDate = styled.div`
  font-size: 1.6rem;
  letter-spacing: 0.2px;
`;

const Progress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProgressTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: #eb3901;
  margin-bottom: 1rem;
`;

const ProgressIcons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: relative;
  z-index: 1;
`;

// const ProgressLineContainer = styled.div`
//   height: 1.8rem;
//   z-index: 2;
// `;

// const ProgressLine = styled.div`
//   left: 0;
//   right: 0;
//   width: 70%;
//   height: 0.2rem;
//   background-color: #ffa883;
//   margin: 0 auto;
// `;

const CertiCount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CertiCountNumber = styled.span`
  font-size: 3.4rem;
  font-weight: bold;
  color: #eb3901;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const RetryButton = styled(StyledButton)`
  font-size: 1.6rem;
  width: 80%;

  padding: 0.2rem;
  margin: 0 auto;
`;
