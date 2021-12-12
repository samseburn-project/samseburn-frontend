import { useState } from 'react';
import styled from 'styled-components';

import { TextField, Box } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import addDays from 'date-fns/addDays';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as ArrowForward } from '../../assets/icons/arrow.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';

import Category from '../common/Category';
import BasicButton from '../common/BasicButton';

function RegisterPage() {
  const MAX_DATE = 99;
  const topics = ['운동', '공부', '취미', '독서', '기타'];
  const types = ['온라인', '오프라인'];

  const [date, setDate] = useState([null, null]);
  const [image, setImage] = useState({
    imageFile: null,
    imageUrl: null,
  });

  const setImageFromFile = ({ file, setImageUrl }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl({ result: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const onLoadFile = ({ target: { files } }) => {
    if (files.length) {
      setImageFromFile({
        file: files[0],
        setImageUrl: ({ result }) =>
          setImage({
            imageFile: files[0],
            imageUrl: result,
          }),
      });
    }
  };

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

              {/* 챌린지 기간 */}
              <LabelText>챌린지 기간*</LabelText>
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
                        <ArrowForward />
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
              {/* 이미지 미리보기 */}
              <ThumbnailContainer>
                {image.imageFile ? (
                  <ImageThumbnail
                    alt={image.imageFile.name}
                    src={image.imageUrl}
                  />
                ) : (
                  <DefaultThumbnail></DefaultThumbnail>
                )}
                {/* 이미지 삭제 버튼 */}
                <StackBox>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </StackBox>
              </ThumbnailContainer>

              {/* 이미지 업로드 버튼 */}
              <label htmlFor="input-image">
                <ImageFileInput
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={onLoadFile}
                  id="input-image"
                />
                <RedSmallButton component="span">이미지 업로드</RedSmallButton>
              </label>
            </ImageContainer>
          </CustomContainer>

          {/* 카테고리 */}
          <Row>
            <LabelText>카테고리*</LabelText>

            {/* 카테고리-챌린지주제 */}
            <SmallLabelText>챌린지 주제*</SmallLabelText>
            <CategoryContainer>
              {topics.map((topic, i) => (
                <Category key={i}>{topic}</Category>
              ))}
            </CategoryContainer>

            {/* 카테고리-챌린지유형 */}
            <SmallLabelText>챌린지 유형*</SmallLabelText>
            <CategoryContainer>
              {types.map((type, i) => (
                <Category key={i}>{type}</Category>
              ))}
            </CategoryContainer>

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

// const BoxContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageThumbnail = styled.img`
  width: 24.2rem;
  height: 24.2rem;
  border-radius: 0.5rem;
  object-fit: cover;
  margin-bottom: 2rem;
`;

const DefaultThumbnail = styled.div`
  width: 24.2rem;
  height: 24.2rem;
  border-radius: 0.5rem;
  background-color: lightgray;
  margin-bottom: 2rem;
`;

const ImageFileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const BlackSmallButton = styled(BasicButton)`
  background-color: #c4c4c4;
  color: white;

  font-size: 1.6rem;
  font-weight: bold;

  /* margin: 0 1rem; */
  margin-bottom: 2rem;

  &:hover {
    background-color: white;
    color: #e5e5e5;
  }
`;

const BlackBigButton = styled(BasicButton)`
  background-color: #c4c4c4;
  color: white;

  font-size: 2rem;
  font-weight: bold;

  /* margin: 0 1rem; */
  margin-bottom: 2rem;

  &:hover {
    background-color: white;
    color: #e5e5e5;
  }
`;

const RedSmallButton = styled(BasicButton)`
  background-color: #eb3901;
  color: white;

  font-size: 1.6rem;
  font-weight: bold;

  margin-bottom: 2rem;

  &:hover {
    background-color: #ffe6db;
    color: #eb3901;
  }
`;

const RedBigButton = styled(BasicButton)`
  background-color: #eb3901;
  color: white;

  font-size: 2rem;
  font-weight: bold;

  /* margin: 0 1rem; */
  margin-bottom: 2rem;

  &:hover {
    background-color: #ffe6db;
    color: #eb3901;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ThumbnailContainer = styled.div`
  position: relative;
`;

const StackBox = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
`;
