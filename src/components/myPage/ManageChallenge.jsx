import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';

function ManageChallenge() {
  const challengeData = [
    {
      id: 'xxxx-xxxx-xxxx-xxxx',
      title: '과일 먹기',
      image_url: 'blahblah',
      categories: ['생활', '온라인'],
      start_date: '2021-10-01',
      end_date: '2021-12-31',
      paricipant_cnt: 33,
      road_address: '서울시 반포구 어쩌구',
      detail_address: '00동 000호',
      description: '과일을 꾸준히 먹는 챌린지 입니다',
    },
    {
      id: 'xxxx-xxxx-xxxx-xxxx',
      title: '과일 먹기',
      image_url: 'blahblah',
      categories: ['생활', '온라인'],
      start_date: '2021-10-01',
      end_date: '2021-12-31',
      paricipant_cnt: 33,
      road_address: '서울시 반포구 어쩌구',
      detail_address: '00동 000호',
      description: '과일을 꾸준히 먹는 챌린지 입니다',
    },
  ];

  return (
    <>
      {challengeData.length === 0 ? (
        <EmptyContainer>참가중인 챌린지가 없습니다</EmptyContainer>
      ) : (
        <Grid container>
          {challengeData.map((data, i) => (
            <Grid key={i} item xs={6}>
              <ContentContainer>
                <div>
                  <img src={data.image_url} />
                </div>
                <div>
                  <div>{data.title}</div>
                  <div>
                    {data.categories.map((category, i) => (
                      <button key={i}>{category}</button>
                    ))}
                  </div>
                  <div>
                    {data.start_date} ~ {data.end_date}
                  </div>
                </div>
              </ContentContainer>
              <ButtonContainer>
                <button>삭제</button>
                <button>수정</button>
              </ButtonContainer>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default ManageChallenge;

const ContentContainer = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  width: 100%;
`;

const EmptyContainer = styled.div`
  width: 100%;
  text-align: center;
`;
