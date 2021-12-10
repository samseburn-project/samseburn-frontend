import React from 'react';
import styled from 'styled-components';
import CurrentCard from './CurrentCard';
import RetryCard from './RetryCard';
import CompleteCard from './CompleteCard';

function ViewChallenge() {
  return (
    <ContentContainer>
      <Row>
        <LabelText>챌린지 현황</LabelText>
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
    </ContentContainer>
  );
}

export default ViewChallenge;

const Row = styled.div``;

const ContentContainer = styled.div`
  margin: 0 8.8rem;
`;

const LabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;
