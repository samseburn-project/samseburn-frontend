import React from 'react';

import styled from 'styled-components';

import { Grid } from '@mui/material';
import RegisterChallengeCard from './RegisterChallengeCard';

function ManageChallenge({ userCreateChallengeList }) {
  // const challengeData = [
  // 	{
  // 		challengeId: 1,
  // 		title: "아침 8시 일어나기dddddddddddddddddddddddd",
  // 		startDate: "2021-10-11",
  // 		endDate: "2021-12-31",
  // 		locationType: "ONLINE",
  // 		address: "",
  // 		imgUrl:
  // 			"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  // 		category: {
  // 			name: "생활",
  // 		},
  // 	},
  // 	{
  // 		challengeId: 2,
  // 		title: "자기 1시간 전 핸드폰 보지 않기",
  // 		startDate: "2021-10-11",
  // 		endDate: "2021-12-31",
  // 		locationType: "ONLINE",
  // 		address: "",
  // 		imgUrl:
  // 			"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  // 		category: {
  // 			name: "생활",
  // 		},
  // 	},
  // 	{
  // 		challengeId: 3,
  // 		title: "런데이하기",
  // 		startDate: "2021-10-11",
  // 		endDate: "2021-12-31",
  // 		locationType: "ONLINE",
  // 		address: "",
  // 		imgUrl:
  // 			"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  // 		category: {
  // 			name: "운동",
  // 		},
  // 	},
  // 	{
  // 		challengeId: 4,
  // 		title: "과일 먹기",
  // 		startDate: "2021-10-11",
  // 		endDate: "2021-12-31",
  // 		locationType: "ONLINE",
  // 		address: "",
  // 		imgUrl:
  // 			"https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  // 		category: {
  // 			name: "생활",
  // 		},
  // 	},
  // ];

  return (
    <ManageChallengeBox>
      {userCreateChallengeList.length === 0 ? (
        <EmptyContainer>개설한 챌린지가 없습니다</EmptyContainer>
      ) : (
        <Grid container>
          {userCreateChallengeList.map((challenge) => (
            <RegisterChallengeCard
              key={challenge.challengeId}
              id={challenge.challengeId}
              title={challenge.title}
              imgUrl={challenge.imgUrl}
              category={challenge.category}
              locationType={challenge.locationType}
              challengeStartDate={challenge.challengeStartDate}
              challengeEndDate={challenge.challengeEndDate}
            />
          ))}
        </Grid>
      )}
    </ManageChallengeBox>
  );
}

export default ManageChallenge;

const ManageChallengeBox = styled.div`
  padding-bottom: 20rem;
`;

const EmptyContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
`;
