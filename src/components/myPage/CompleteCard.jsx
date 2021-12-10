import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';

import { ReactComponent as FirstMedal } from '../../assets/1st-medal-icon.svg';
import { ReactComponent as SecondMedal } from '../../assets/2nd-medal-icon.svg';
import { ReactComponent as ThirdMedal } from '../../assets/3rd-medal-icon.svg';

function CompleteCard() {
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
    <>
      {challengeData.filter((data) => data.state === 2).length === 0 ? (
        <div>완료한 챌린지가 없습니다</div>
      ) : (
        <Grid container>
          {challengeData
            .filter((data) => data.state === 2)
            .map((data, i) => (
              <Grid key={i} item xs={6}>
                <CardContainer>
                  <div>
                    <img src={data.image_url} />
                  </div>
                  <div>
                    <CardTitleContainer>
                      <div>{data.title}</div>
                      <div>{viewMedalIcon(data.total_cnt)}</div>
                    </CardTitleContainer>
                    <div>
                      {data.categories.map((category, i) => (
                        <button key={i}>{category}</button>
                      ))}
                    </div>
                    <div>
                      {data.start_date} ~ {data.end_date}
                    </div>
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

export default CompleteCard;

const CardContainer = styled.div`
  display: flex;
`;

const CardTitleContainer = styled.div`
  display: flex;
`;
