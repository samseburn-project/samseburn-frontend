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
        <Title>챌린지 현황</Title>
        <CountContainer>
          <CountCard>
            <CountNumber>
              {challengeData.filter((data) => data.state === 0).length}
            </CountNumber>
            <CountText>참가중</CountText>
          </CountCard>
          <CountCard>
            <CountNumber>
              {challengeData.filter((data) => data.state === 1).length}
            </CountNumber>
            <CountText>재도전 가능</CountText>
          </CountCard>
          <CountCard>
            <CountNumber>
              {challengeData.filter((data) => data.state === 2).length}
            </CountNumber>
            <CountText>완료</CountText>
          </CountCard>
        </CountContainer>
      </Row>
      <Row>
        <Title>참가중인 챌린지</Title>
        <CurrentCard />
      </Row>
      <Row>
        <Title>재도전 가능 챌린지</Title>
        <RetryCard />
      </Row>
      <Row>
        <Title>완료한 챌린지</Title>
        <CompleteCard />
      </Row>
    </>
  );
}

export default ViewChallenge;

const Row = styled.div``;

// const LabelText = styled.div`
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 2rem;
// `;

const Title = styled.div`
  font-size: 2.4rem;
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
