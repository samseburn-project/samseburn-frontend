import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Grid } from '@mui/material';
import { ReactComponent as Calendar } from '../../assets/icons/calender.svg';
import Category from '../common/Category';
import StyledButton from '../common/StyledButton';

const RegisterChallengeCard = ({
  id,
  title,
  imgUrl,
  category,
  locationType,
  challengeStartDate,
  challengeEndDate,
}) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={6}>
      <StyledCard onClick={() => navigate(`/detail/${id}`)}>
        <StyledCardTop>
          <StyledCardThumbnail>
            <img src={imgUrl} alt={title} className="thumbnail" />
          </StyledCardThumbnail>
          <StyledCardContent>
            <CardTitle>{title}</CardTitle>
            <Row>
              <CardCategory>{category}</CardCategory>
              <CardCategory>
                {locationType === 'ONLINE' ? '온라인' : '오프라인'}
              </CardCategory>
            </Row>
            <Row>
              <CardIcon>
                <Calendar alt="Calendar icon" />
              </CardIcon>
              <CardDate>
                {challengeStartDate} ~ {challengeEndDate}
              </CardDate>
            </Row>
          </StyledCardContent>
        </StyledCardTop>
        <StyledCardBottom>
          <DeleteButton>삭제</DeleteButton>
          <UpdateButton>수정</UpdateButton>
        </StyledCardBottom>
      </StyledCard>
    </Grid>
  );
};

export default RegisterChallengeCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 20rem;
  box-shadow: 0.6rem 1.1rem 2rem rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  cursor: pointer;
  word-break: break-all;
  margin: 2rem;

  .thumbnail {
    width: 15rem;
    height: 12rem;
    object-fit: cover;
    margin: 1.5rem;
    border-radius: 0.5rem;
  }

  &:hover {
    background-color: #f6f6f6;
  }
`;

const StyledCardTop = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const StyledCardBottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StyledCardThumbnail = styled.div``;

const StyledCardContent = styled.div``;

const CardTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

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

const DeleteButton = styled(StyledButton)`
  font-size: 2rem;
  background-color: #c4c4c4;
  width: 22rem;
  height: 4rem;
  &:hover {
    background-color: #959595;
  }
`;

const UpdateButton = styled(StyledButton)`
  font-size: 2rem;
  width: 22rem;
  height: 4rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;
