import { useState } from 'react';
import styled from 'styled-components';
import { TextField, Grid, Box } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import addDays from 'date-fns/addDays';
import ImageUpload from '../common/ImageUpload';
import CategoryFilter from './CategoryFilter';

const MAX_DATE = 99;

function RegisterPage() {
  const [date, setDate] = useState([null, null]);

  return (
    <>
      <Wrapper>
        <Title>챌린지 생성</Title>
        <FormContainer>
          <CustomContainer>
            <div>
              {/* 챌린지명 */}
              <LabelText>챌린지명*</LabelText>
              <BasicInput placeholder="챌린지명" size="small" required />
              <LabelText>챌린지 기간*</LabelText>
              {/* 챌린지 기간 */}
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
                      <DateInput {...startProps} size="small" />
                      <Box sx={{ mx: 2 }}>
                        <ArrowForwardIcon />
                      </Box>
                      <DateInput {...endProps} size="small" />
                    </>
                  )}
                />
              </LocalizationProvider>
              {/* 챌린지 인원 */}
              <LabelText>챌린지 인원*</LabelText>
              <BasicInput placeholder="챌린지 인원" size="small" />
            </div>
            {/* 챌린지 이미지 */}
            <ImageContainer>
              <ImageUpload />
            </ImageContainer>
          </CustomContainer>

          {/* 카테고리 */}
          <Row>
            <LabelText>카테고리*</LabelText>

            {/* 카테고리-챌린지주제 */}
            {/* 카테고리-챌린지유형 */}
            <CategoryFilter />

            {/* 카테고리-오프라인주소입력 */}

            <SmallLabelText>오프라인 장소</SmallLabelText>
            <Box>
              <BasicInput
                placeholder="도로명 주소"
                size="small"
                isNext={true}
              />
              <BlackSmallButton>주소 검색</BlackSmallButton>
            </Box>
            <BasicInput placeholder="상세주소" size="small" />
          </Row>

          {/* 챌린지 설명 */}
          <Row>
            <LabelText>챌린지 설명*</LabelText>
            <BasicTextarea></BasicTextarea>
          </Row>

          <ButtonContainer>
            <RedBigButton>등록</RedBigButton>
            <BlackBigButton>취소</BlackBigButton>
          </ButtonContainer>
        </FormContainer>
      </Wrapper>
    </>
  );
}

export default RegisterPage;

const Wrapper = styled.section`
  width: 104rem;
  margin: 10rem auto;
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: bold;

  margin-bottom: 5rem;
`;

const FormContainer = styled.div`
  margin: 0 8.8rem;
`;

const Row = styled.div``;

const CustomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;

  margin-bottom: 2rem;
`;

const SmallLabelText = styled.div`
  font-size: 1.6rem;
  font-weight: bold;

  margin-bottom: 1.5rem;
`;

const BasicInput = styled.input`
  font-size: 1.6rem;
  color: #959595;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  width: 33.1rem;
  height: 3.2rem;

  margin-bottom: ${(props) => (props.isNext ? '1rem' : '3rem')};
`;

const DateInput = styled(TextField)`
  margin-bottom: 3rem;
`;

const BasicTextarea = styled.textarea`
  font-size: 1.6rem;
  border: 0.1rem solid #e5e5e5;
  background-color: white;
  border-radius: 0.5rem;
  width: 33.1rem;
  height: 20rem;
  margin-bottom: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BlackSmallButton = styled.button`
  background-color: #c4c4c4;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  font-weight: bold;

  cursor: pointer;
  margin: 0 1rem;
`;

const BlackBigButton = styled.button`
  background-color: #c4c4c4;
  color: white;
  border: none;
  border-radius: 0.5rem;

  font-size: 2rem;
  font-weight: bold;

  cursor: pointer;
  margin: 0 1rem;

  &:hover {
    background-color: white;
    color: #c4c4c4;
  }
`;

const RedBigButton = styled.button`
  background-color: #eb3901;
  color: white;
  border: none;
  border-radius: 0.5rem;

  font-size: 2rem;
  font-weight: bold;

  cursor: pointer;
  margin: 0 1rem;

  &:hover {
    background-color: white;
    color: #eb3901;
  }
`;
