import React from 'react';
import styled from 'styled-components';
import CurrentCard from './CurrentCard';
import RetryCard from './RetryCard';
import CompleteCard from './CompleteCard';

function ViewChallenge() {
  const challengeData = [
    {
      title: '아침 8시 일어나기',
      image_url: 'blahblah',
      categories: ['생활', '온라인'],
      start_date: '2021-10-11',
      end_date: '2021-12-31',
      isComplete: false,
      total_cnt: 1,
      state: 0,
      retry_limit: 3,
    },
    {
      title: '자기 전 스트레칭하기',
      image_url: 'blahblah',
      categories: ['생활', '온라인'],
      start_date: '2021-10-01',
      end_date: '2021-12-31',
      isComplete: true,
      total_cnt: 20,
      state: 0,
      retry_limit: 3,
    },
    {
      title: '과일 먹기',
      image_url: 'blahblah',
      categories: ['생활', '온라인'],
      start_date: '2021-10-01',
      end_date: '2021-12-31',
      isComplete: false,
      total_cnt: 0,
      state: 1,
      retry_limit: 3,
    },
    {
      title: '책상 정리하기',
      image_url: 'blahblah',
      categories: ['생활', '온라인'],
      start_date: '2021-10-01',
      end_date: '2021-12-31',
      isComplete: true,
      total_cnt: 20,
      state: 2,
      retry_limit: 3,
    },
  ];
  return (
    <>
      <Row>
        <LabelText>챌린지 현황</LabelText>
        <CountContainer>
          <CountCard>
            <div>{challengeData.filter((data) => data.state === 0).length}</div>
            <div>참가중</div>
          </CountCard>
          <CountCard>
            <div>{challengeData.filter((data) => data.state === 1).length}</div>
            <div>재도전 가능</div>
          </CountCard>
          <CountCard>
            <div>{challengeData.filter((data) => data.state === 2).length}</div>
            <div>완료</div>
          </CountCard>
        </CountContainer>
      </Row>
      <Row>
        <LabelText>참가중인 챌린지</LabelText>
        <CurrentCard />
      </Row>
      <Row>
        <LabelText>재도전 가능 챌린지</LabelText>
        <RetryCard />
      </Row>
      <Row>
        <LabelText>완료한 챌린지</LabelText>
        <CompleteCard />
      </Row>
    </>
  );
}

export default ViewChallenge;

const Row = styled.div``;

const LabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const CountContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const CountCard = styled.div`
  display: flex;
  cursor: pointer;
  border: 0.1rem solid;
`;
