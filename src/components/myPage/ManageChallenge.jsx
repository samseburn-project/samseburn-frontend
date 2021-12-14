import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import StyledButton from '../common/StyledButton';

function ManageChallenge() {
  const challengeData = [
    // {
    //   id: 'xxxx-xxxx-xxxx-xxxx',
    //   title: '과일 먹기',
    //   image_url: 'blahblah',
    //   categories: ['생활', '온라인'],
    //   start_date: '2021-10-01',
    //   end_date: '2021-12-31',
    //   paricipant_cnt: 33,
    //   road_address: '서울시 반포구 어쩌구',
    //   detail_address: '00동 000호',
    //   description: '과일을 꾸준히 먹는 챌린지 입니다',
    // },
    // {
    //   id: 'xxxx-xxxx-xxxx-xxxx',
    //   title: '과일 먹기',
    //   image_url: 'blahblah',
    //   categories: ['생활', '온라인'],
    //   start_date: '2021-10-01',
    //   end_date: '2021-12-31',
    //   paricipant_cnt: 33,
    //   road_address: '서울시 반포구 어쩌구',
    //   detail_address: '00동 000호',
    //   description: '과일을 꾸준히 먹는 챌린지 입니다',
    // },
    {
      challengeId: 1,
      title: '아침 8시 일어나기',
      description: '아침 기상을 인증하는 챌린지입니다',
      start_date: '2021-10-11',
      end_date: '2021-12-31',
      limitPerson: 10,
      locationType: 'ONLINE',
      address: '',
      image_url:
        'https://images.unsplash.com/photo-1422433555807-2559a27433bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      category: {
        name: '생활',
      },
      participants: 1,
      isComplete: false,
      total_cnt: 1,
      state: 2,
      retry_limit: 3,
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
              <CardContainer>
                <ContentContainer>
                  <div>
                    <img src={data.image_url} />
                  </div>
                  <div>
                    <LabelText>{data.title}</LabelText>
                    <CategoryContainer>
                      <Category>{data.category.name}</Category>
                      <Category>
                        {data.locationType === 'ONLINE' ? '온라인' : '오프라인'}
                      </Category>
                    </CategoryContainer>
                    <div>
                      {data.start_date} ~ {data.end_date}
                    </div>
                  </div>
                </ContentContainer>
                <ButtonContainer>
                  <BlackBigButton>삭제</BlackBigButton>
                  <BlackBigButton>수정</BlackBigButton>
                </ButtonContainer>
              </CardContainer>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default ManageChallenge;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const EmptyContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    height: 12rem;
    object-fit: cover;
    margin: 1.5rem;
    border-radius: 0.5rem;
  }
`;

const ContentContainer = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const LabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Category = styled.div`
  font-size: 1.2rem;
  color: #8f8f8f;
  background-color: #e5e5e5;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  letter-spacing: 0.2px;
`;

const BlackBigButton = styled(StyledButton)`
  background-color: #c4c4c4;
  color: white;
  font-size: 2rem;
  font-weight: bold;

  margin-bottom: 2rem;

  &:hover {
    background-color: white;
    color: #e5e5e5;
  }
`;
