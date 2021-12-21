import React from 'react';

import styled from 'styled-components';

import { Grid } from '@mui/material';
import MyChallengeCard from './MyChallengeCard';

const ViewChallenge = ({ userToken, userChallengeList }) => {
  const currentChallenges = [
    {
      challengeId: 1,
      title: '아침 8시 일어나기dddddddddddddddddddddddd',
      imgUrl:
        'https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: '생활',
      locationType: 'ONLINE',
      challengeStartDate: '2021-10-11',
      challengeEndDate: '2021-12-31',
      challengeStatus: 'JOIN',
      certiCount: 2,
      retryCount: 3,
      userStartDate: '2021-12-17T18:54:29.718122',
      userMissonDate: '2021-12-24T18:54:29.718122',
      firstWeekMission: 'NO',
    },
    {
      challengeId: 2,
      title: '런데이',
      imgUrl:
        'https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: '운동',
      locationType: 'OFFLINE',
      challengeStartDate: '2021-10-11',
      challengeEndDate: '2021-12-31',
      challengeStatus: 'JOIN',
      certiCount: 5,
      retryCount: 3,
      userStartDate: '2021-12-17T18:54:29.718122',
      userMissonDate: '2021-12-24T18:54:29.718122',
      firstWeekMission: 'YES',
    },
  ];

  const retryPossibleChallenges = [
    {
      challengeId: 3,
      title: '자기 전 스트레칭하기',
      imgUrl:
        'https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: '생활',
      locationType: 'ONLINE',
      challengeStartDate: '2021-10-11',
      challengeEndDate: '2021-12-31',
      challengeStatus: 'RETRY',
      certiCount: 15,
      retryCount: 3,
      userStartDate: '2021-12-17T18:54:29.718122',
      userMissonDate: '2021-12-24T18:54:29.718122',
      firstWeekMission: 'NO',
    },
    {
      challengeId: 4,
      title: '과일 먹기',
      imgUrl:
        'https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: '생활',
      locationType: 'ONLINE',
      challengeStartDate: '2021-10-11',
      challengeEndDate: '2021-12-31',
      challengeStatus: 'RETRY',
      certiCount: 7,
      retryCount: 3,
      userStartDate: '2021-12-17T18:54:29.718122',
      userMissonDate: '2021-12-24T18:54:29.718122',
      firstWeekMission: 'YES',
    },
  ];

  const completedChallenges = [
    {
      challengeId: 5,
      title: '자기 전 스트레칭하기',
      imgUrl:
        'https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: '생활',
      locationType: 'ONLINE',
      challengeStartDate: '2021-10-11',
      challengeEndDate: '2021-12-31',
      challengeStatus: 'COMPLETE',
      certiCount: 15,
      retryCount: 3,
      userStartDate: '2021-12-17T18:54:29.718122',
      userMissonDate: '2021-12-24T18:54:29.718122',
      firstWeekMission: 'YES',
    },
    {
      challengeId: 6,
      title: '과일 먹기',
      imgUrl:
        'https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: '생활',
      locationType: 'ONLINE',
      challengeStartDate: '2021-10-11',
      challengeEndDate: '2021-12-31',
      challengeStatus: 'COMPLETE',
      certiCount: 7,
      retryCount: 3,
      userStartDate: '2021-12-17T18:54:29.718122',
      userMissonDate: '2021-12-24T18:54:29.718122',
      firstWeekMission: 'YES',
    },
  ];

  // filter로 challengeStatus JOIN, RETRY, COMPLETE 별 리스트 따로 만들기
  const joinChallenges = userChallengeList.filter(
    (item) => item.challengeStatus === 'JOIN'
  );
  const retryChallenges = userChallengeList.filter(
    (item) => item.challengeStatus === 'RETRY'
  );
  const completeChallenges = userChallengeList.filter(
    (item) => item.challengeStatus === 'COMPLETE'
  );

  return (
    <ViewChallengeBox>
      <Row>
        <Title>챌린지 현황</Title>
        <CountContainer>
          <CountCard>
            <CountNumber>{joinChallenges.length}</CountNumber>
            <CountText>참가중</CountText>
          </CountCard>
          <CountCard>
            {/* 데이터양 많으면 코드 바꿔주기 */}
            <CountNumber>{retryPossibleChallenges.length}</CountNumber>
            <CountText>재도전 가능</CountText>
          </CountCard>
          <CountCard>
            {/* 데이터양 많으면 코드 바꿔주기 */}
            <CountNumber>{completedChallenges.length}</CountNumber>
            <CountText>완료</CountText>
          </CountCard>
        </CountContainer>
      </Row>
      <Row>
        <Title>참가중인 챌린지</Title>
        {joinChallenges.length === 0 ? (
          <EmptyContainer>참가중인 챌린지가 없습니다</EmptyContainer>
        ) : (
          <Grid container>
            {joinChallenges.map((challenge) => (
              <Grid item xs={6} key={challenge.challengeId}>
                <MyChallengeCard
                  id={challenge.challengeId}
                  title={challenge.title}
                  category={challenge.category}
                  locationType={challenge.locationType}
                  challengeStartDate={challenge.challengeStartDate}
                  challengeEndDate={challenge.challengeEndDate}
                  certiCount={challenge.certiCount}
                  imgUrl={challenge.imgUrl}
                  challengeStatus={challenge.challengeStatus}
                  firstWeekMission={challenge.firstWeekMission}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Row>
      <Row>
        <Title>재도전 가능 챌린지</Title>
        {retryPossibleChallenges.length === 0 ? (
          <EmptyContainer>재도전 가능한 챌린지가 없습니다</EmptyContainer>
        ) : (
          // 데이터양 많아지면 코드 변경
          <Grid container>
            {retryPossibleChallenges.map((challenge) => (
              <Grid item xs={6} key={challenge.challengeId}>
                <MyChallengeCard
                  userToken={userToken}
                  id={challenge.challengeId}
                  title={challenge.title}
                  category={challenge.category}
                  locationType={challenge.locationType}
                  challengeStartDate={challenge.challengeStartDate}
                  challengeEndDate={challenge.challengeEndDate}
                  certiCount={challenge.certiCount}
                  imgUrl={challenge.imgUrl}
                  challengeStatus={challenge.challengeStatus}
                  firstWeekMission={challenge.firstWeekMission}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Row>
      <Row>
        <Title>완료한 챌린지</Title>
        {completedChallenges.length === 0 ? (
          <EmptyContainer>완료한 챌린지가 없습니다</EmptyContainer>
        ) : (
          // 데이터양 많아지면 코드 변경
          <Grid container>
            {completedChallenges.map((challenge) => (
              <Grid item xs={6} key={challenge.challengeId}>
                <MyChallengeCard
                  id={challenge.challengeId}
                  title={challenge.title}
                  category={challenge.category}
                  locationType={challenge.locationType}
                  challengeStartDate={challenge.challengeStartDate}
                  challengeEndDate={challenge.challengeEndDate}
                  certiCount={challenge.certiCount}
                  imgUrl={challenge.imgUrl}
                  challengeStatus={challenge.challengeStatus}
                  firstWeekMission={challenge.firstWeekMission}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Row>
    </ViewChallengeBox>
  );
};

export default ViewChallenge;

const ViewChallengeBox = styled.div`
  padding-bottom: 20rem;
`;

const Row = styled.div`
  margin: 0;
`;

const EmptyContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin: 8rem 0;
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  margin: 5rem 0 2rem 0;
`;

const CountContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const CountCard = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;

  width: 17.7rem;
  height: 9.3rem;
  box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
  margin-bottom: 6rem;
  border-radius: 0.5rem;
`;

const CountNumber = styled.div`
  font-size: 3.4rem;
  font-weight: bold;
  color: #eb3901;
`;

const CountText = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: #959595;
`;
