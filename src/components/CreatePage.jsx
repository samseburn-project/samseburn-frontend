import { useState } from 'react';
import styled from 'styled-components';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import addDays from 'date-fns/addDays';
import ImageUpload from './common/ImageUpload';

const MAX_DATE = 99;

function CreatePage() {
  const [date, setDate] = useState([null, null]);

  return (
    <>
      <Container>
        <HeaderText variant="h1">챌린지 생성</HeaderText>
        {/* 챌린지 이미지 */}
        <Grid item xs={12}>
          <LabelText variant="h1">챌린지명*</LabelText>
          <BasicInput placeholder="챌린지명" size="small" required />
        </Grid>
        {/* 챌린지 기간 */}
        <Grid item xs={12}>
          <LabelText variant="h1">챌린지 기간*</LabelText>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              disablePast
              inputFormat={'yyyy-MM-dd'}
              mask={'____-__-__'}
              maxDate={addDays(date[0], MAX_DATE)}
              size="small"
              startText="시작 일자"
              endText="종료 일자"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} size="small" />
                  <Box sx={{ mx: 2 }}>
                    <ArrowForwardIcon />
                  </Box>
                  <TextField {...endProps} size="small" />
                </>
              )}
            />
          </LocalizationProvider>
        </Grid>
        {/* 챌린지 인원 */}
        <Grid item xs={12}>
          <LabelText variant="h1">챌린지 인원*</LabelText>
          <BasicInput placeholder="챌린지 인원" size="small" />
        </Grid>
        {/* 카테고리 */}
        <Grid item xs={12}>
          <LabelText variant="h1">카테고리*</LabelText>
          {/* 카테고리-챌린지주제 */}
          <SmallLabelText variant="h1">챌린지 주제*</SmallLabelText>
          <Box>
            <CategoryButton>운동</CategoryButton>
            <CategoryButton>공부</CategoryButton>
            <CategoryButton>취미</CategoryButton>
            <CategoryButton>독서</CategoryButton>
            <CategoryButton>기타</CategoryButton>
          </Box>
          {/* 카테고리-챌린지유형 */}
          <SmallLabelText variant="h1">챌린지 유형*</SmallLabelText>
          <Box>
            <CategoryButton>온라인</CategoryButton>
            <CategoryButton>오프라인</CategoryButton>
          </Box>
        </Grid>

        {/* 카테고리-오프라인주소입력 */}
        <Grid item xs={12}>
          <SmallLabelText variant="h1">오프라인 장소</SmallLabelText>
          <Box>
            <BasicInput placeholder="도로명 주소" size="small" />
            <BlackSmallButton>주소 검색</BlackSmallButton>
          </Box>
          <BasicInput placeholder="상세주소" size="small" />
        </Grid>

        {/* 챌린지 설명 */}
        <Grid item xs={12}>
          <LabelText variant="h1">챌린지 설명*</LabelText>
          <BasicTextarea></BasicTextarea>
        </Grid>

        {/* 이미지 업로드 */}
        <Grid item xs={12}>
          <ImageUpload />
        </Grid>

        <Grid item xs={12}>
          <RedBigButton>등록</RedBigButton>
          <BlackBigButton>취소</BlackBigButton>
        </Grid>
      </Container>
    </>
  );
}

export default CreatePage;

const HeaderText = styled(Typography)`
  font-size: 2.4rem;
  font-weight: bold;
`;

const LabelText = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
`;

const SmallLabelText = styled(Typography)`
  font-size: 1.6rem;
  font-weight: bold;
`;

const BasicInput = styled.input`
  font-size: 1.6rem;
  color: #959595;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  width: 33.1rem;
  height: 3.2rem;
`;

const CategoryButton = styled(Button)`
  font-size: 1.6rem;
  border: 0.1rem solid #ffa883;
  background-color: white;
  color: #ffa883;
  border-radius: 2rem;
  width: 10rem;
  height: 3.2rem;
  &:hover {
    background-color: #ffa883;
    color: white;
  }
`;

const BlackSmallButton = styled(Button)`
  background-color: #c4c4c4;
  color: white;
  font-size: 1.6rem;
  height: 3.2rem;
`;

const BasicTextarea = styled.textarea`
  font-size: 1.6rem;
  border: 0.1rem solid #e5e5e5;
  background-color: white;
  border-radius: 0.5rem;
  width: 33.1rem;
`;

const BlackBigButton = styled(Button)`
  background-color: #c4c4c4;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  width: 17.7rem;
  height: 5.5rem;
  &:hover {
    color: #c4c4c4;
  }
`;

const RedBigButton = styled(Button)`
  background-color: #eb3901;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  width: 17.7rem;
  height: 5.5rem;
  &:hover {
    color: #eb3901;
  }
`;
