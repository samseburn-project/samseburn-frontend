import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';

function RetryCard() {
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
      {challengeData.filter((data) => data.state === 1).length === 0 ? (
        <EmptyContainer>재도전 가능한 챌린지가 없습니다</EmptyContainer>
      ) : (
        <Grid container>
          {challengeData
            .filter((data) => data.state === 1)
            .map((data, i) => (
              <Grid key={i} item xs={6}>
                <CardContainer>
                  <div>
                    <img src={data.image_url} />
                  </div>
                  <div>
                    <LabelText>{data.title}</LabelText>
                    <CategoryContainer>
                      {data.categories.map((category, i) => (
                        <Category key={i}>{category}</Category>
                      ))}
                    </CategoryContainer>
                    <SmallLabelText>
                      {data.start_date} ~ {data.end_date}
                    </SmallLabelText>
                    <div>
                      <button>재도전하기</button>
                    </div>
                  </div>
                </CardContainer>
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
}

export default RetryCard;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  width: 42rem;
  height: 20rem;
  box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
  margin-bottom: 6rem;
  border-radius: 0.5rem;

  word-break: break-all;

  div > img {
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    margin: 1.5rem;
    border-radius: 0.5rem;
  }
`;

const EmptyContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const LabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SmallLabelText = styled.div`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const RedSmallLabelText = styled.div`
  color: #eb3901;
  font-size: 1.6rem;
  font-weight: bold;
`;

const BlackSmallLabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const RedBigLabelText = styled.div`
  font-size: 3.4rem;
  font-weight: bold;
  color: #eb3901;
`;

const CategoryContainer = styled.div`
  display: flex;
`;

const Category = styled.div`
  font-size: 1.2rem;
  color: #8f8f8f;
  background-color: #e5e5e5;
  border-radius: 2rem;
  margin-right: 1rem;
`;
