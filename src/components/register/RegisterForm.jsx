import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import addDays from 'date-fns/addDays';
import koLocale from 'date-fns/locale/ko';

import styled, { css } from 'styled-components';

import { TextField, Box, IconButton } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import { ReactComponent as ArrowForward } from '../../assets/icons/arrow.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import StyledButton from '../common/StyledButton';
import Category from '../common/Category';

import useMediaQuery from '@mui/material/useMediaQuery';
import { customMedia } from '../../GlobalStyles';

function RegisterForm(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState(1);
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [category, setCategory] = useState('');
  const [locationType, setLocationType] = useState('');
  const [date, setDate] = useState([null, null]);
  const [image, setImage] = useState({
    imageFile: null,
    imageUrl: null,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');
  const MAX_DATE = 99;
  const categories = ['운동', '공부', '취미', '독서', '기타'];
  const locationTypes = ['온라인', '오프라인'];

  const { enqueueSnackbar } = useSnackbar();

  const matchesTablet = useMediaQuery('(min-width:768px)');

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'participants') {
      setParticipants(value.replace(/[^0-9]/gi, ''));
    } else if (name === 'roadAddress') {
      setRoadAddress(value);
    } else if (name === 'detailAddress') {
      setDetailAddress(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const onClickCategoryButton = ({ target: { innerText } }) => {
    setCategory(innerText);
  };

  const onClickLocationTypeButton = ({ target: { innerText } }) => {
    setLocationType(innerText);
    if (innerText === '온라인') {
      setRoadAddress('');
      setDetailAddress('');
    }
  };

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

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setRoadAddress(fullAddress);
    setIsPopupOpen(false);
  };

  const onClickPopupHandler = () => {
    setIsPopupOpen(true);
  };

  const onModalHandler = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const onDeleteFile = () => {
    setImage({
      imageFile: null,
      imageUrl: null,
    });
  };

  const dateToString = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear() + '-' + month + '-' + day;
  };

  const onSubmitFormData = async () => {
    try {
      const address =
        locationType === '온라인' ? '' : `${roadAddress} ${detailAddress}`;

      if (participants < 1 || participants > 33) {
        enqueueSnackbar('챌린지 인원은 최소 1명, 최대 33명까지 가능합니다.', {
          variant: 'warning',
          autoHideDuration: 2000,
        });
        return false;
      }

      if (
        !title ||
        !date[0] ||
        !date[1] ||
        !participants ||
        !category ||
        !locationType ||
        (locationType === '오프라인' && address.trim() === '') ||
        !description
      ) {
        enqueueSnackbar('필수 항목을 입력해주세요', {
          variant: 'warning',
          autoHideDuration: 2000,
        });
        return false;
      }

      const formData = new FormData();

      formData.append('image', image.imageFile);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('challengeStartDate', dateToString(date[0]));
      formData.append('challengeEndDate', dateToString(date[1]));
      formData.append('limitPerson', participants);
      formData.append('category', category);
      formData.append('locationType', locationType);
      formData.append('address', address);
      formData.append('challengeProgress', 'INPROGRESS');

      // for (let data of formData.entries()) {
      //   console.log(data[0] + ', ' + data[1]);
      // }

      const res = await axios.post(
        'https://api.samseburn.site/challenge',
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (res.status === 200) {
        enqueueSnackbar('챌린지가 생성되었습니다.', {
          variant: 'success',
          autoHideDuration: 2000,
        });
        navigate('/');
      } else {
        enqueueSnackbar('챌린지 생성에 실패했습니다.', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onCancelHandler = () => {
    navigate('/');
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      zIndex: 10,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      overflow: 'auto',
      top: '22vh',
      left: '14vw',
      right: '14vw',
      bottom: '30vh',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '14px',
      outline: 'none',
      zIndex: 10,
    },
  };

  return (
    <RegisterPageBox>
      <Title>챌린지 생성</Title>
      <FormContainer>
        <CustomContainer>
          <LeftContentContainer>
            {/* 챌린지명 */}
            <LabelText>
              챌린지명
              <RequiredMark>*</RequiredMark>
            </LabelText>
            <BasicInput
              placeholder="챌린지명"
              size="small"
              value={title}
              name="title"
              onChange={onChange}
              required
            />
            <ValidationText>
              챌린지명은 띄어쓰기 포함 최대 20자까지 입력할 수 있습니다.
            </ValidationText>
            {/* 챌린지 기간 */}
            <LabelText>
              챌린지 기간
              <RequiredMark>*</RequiredMark>
            </LabelText>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={koLocale}
            >
              {matchesTablet ? (
                <DesktopDateRangePicker
                  disablePast
                  inputFormat={'yyyy-MM-dd'}
                  mask={'____-__-__'}
                  maxDate={addDays(date[0], MAX_DATE)}
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <DateInput
                        ref={startProps.inputRef}
                        {...startProps.inputProps}
                      />
                      <Box sx={{ mx: 2 }}>
                        <ArrowForward />
                      </Box>
                      <DateInput
                        ref={endProps.inputRef}
                        {...endProps.inputProps}
                      />
                    </>
                  )}
                />
              ) : (
                <MobileDateRangePicker
                  disablePast
                  inputFormat={'yyyy-MM-dd'}
                  mask={'____-__-__'}
                  maxDate={addDays(date[0], MAX_DATE)}
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  style={{ margin: 0, padding: 0 }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <DateInput
                        ref={startProps.inputRef}
                        {...startProps.inputProps}
                      />
                      <Box sx={{ mx: 2 }}>
                        <ArrowForward />
                      </Box>
                      <DateInput
                        ref={endProps.inputRef}
                        {...endProps.inputProps}
                      />
                    </>
                  )}
                />
              )}
            </LocalizationProvider>

            {/* 챌린지 인원 */}
            <LabelText>
              챌린지 인원
              <RequiredMark>*</RequiredMark>
            </LabelText>
            <NumInput
              type="number"
              min="1"
              max="33"
              placeholder="1"
              name="participants"
              value={participants}
              onChange={onChange}
            />
            <ValidationText>
              최소 1명, 최대 33명까지 설정할 수 있습니다.
            </ValidationText>
          </LeftContentContainer>

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
              <DeleteButtonContainer onClick={onDeleteFile}>
                <Delete alt="Delete icon" style={{ zIndex: 10 }} />
              </DeleteButtonContainer>
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
              <UploadButton component="span">이미지 업로드</UploadButton>
            </label>
          </ImageContainer>
        </CustomContainer>
        {/* 카테고리 */}
        <Row>
          <LabelText>
            카테고리
            <RequiredMark>*</RequiredMark>
          </LabelText>
          {/* 카테고리-챌린지주제 */}
          <SmallLabelText>
            챌린지 주제
            <RequiredMark>*</RequiredMark>
          </SmallLabelText>
          <CategoryContainer>
            {categories.map((item, i) => (
              <CategoryButton
                key={i}
                category={item}
                className={`${category === item ? 'active' : ''}`}
                onClick={onClickCategoryButton}
              >
                {item}
              </CategoryButton>
            ))}
          </CategoryContainer>
          {/* 카테고리-챌린지유형 */}
          <SmallLabelText>
            챌린지 유형
            <RequiredMark>*</RequiredMark>
          </SmallLabelText>
          <CategoryContainer>
            {locationTypes.map((item, i) => (
              <CategoryButton
                key={i}
                locationType={item}
                className={`${locationType === item ? 'active' : ''}`}
                onClick={onClickLocationTypeButton}
              >
                {item}
              </CategoryButton>
            ))}
          </CategoryContainer>
          {locationType === '오프라인' ? (
            <>
              <SmallLabelText>오프라인 장소</SmallLabelText>
              <AddressRow>
                <AddressInput
                  name="roadAddress"
                  placeholder="도로명 주소"
                  value={roadAddress}
                  onChange={onChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <AddressButton onClick={onClickPopupHandler}>
                  주소 검색
                </AddressButton>
                <Modal
                  isOpen={isPopupOpen}
                  ariaHideApp={false}
                  onRequestClose={onModalHandler}
                  style={modalStyles}
                >
                  <CloseIconButton onClick={onModalHandler}>
                    <Close alt="Close icon" />
                  </CloseIconButton>
                  <DaumPostcode onComplete={handleComplete} {...props} />;
                </Modal>
              </AddressRow>
              <AddressInput
                name="detailAddress"
                placeholder="상세 주소"
                value={detailAddress}
                onChange={onChange}
              />
            </>
          ) : (
            ''
          )}
          {/* 카테고리-오프라인주소입력 */}
        </Row>

        {/* 챌린지 설명 */}
        <Row>
          <LabelText>
            챌린지 설명
            <RequiredMark>*</RequiredMark>
          </LabelText>
          <TextInput
            name="description"
            multiline
            rows={8}
            value={description}
            onChange={onChange}
          ></TextInput>
        </Row>
        <ButtonContainer>
          <EnrollButton onClick={onSubmitFormData}>등록</EnrollButton>
          <CancelButton onClick={onCancelHandler}>취소</CancelButton>
        </ButtonContainer>
      </FormContainer>
    </RegisterPageBox>
  );
}

export default RegisterForm;

const RegisterPageBox = styled.div`
  /* padding: 0 17.7rem; */

  ${customMedia.greaterThan('desktop')`
    padding: 0 17.7rem;
  `}
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: bold;

  margin-bottom: 5rem;

  ${customMedia.lessThan('mobile')`
    font-size: 1.8rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    font-size: 1.8rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    font-size: 2rem;
  `}
  
	${customMedia.between('tablet', 'desktop')`
    font-size: 2.2rem;
  `}
`;

const FormContainer = styled.div`
  &:checked {
    background-color: #000000;
  }
`;

const LeftContentContainer = styled.div`
  margin-bottom: 3rem;
`;

const Row = styled.div`
  margin-bottom: 3rem;
`;

const CustomContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${customMedia.lessThan('mobile')`
    flex-direction: column-reverse;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    flex-direction: column-reverse;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    flex-direction: column-reverse;
  `}
`;

const LabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0;

  ${customMedia.lessThan('mobile')`
    font-size: 1.8rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    font-size: 1.8rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    font-size: 1.8rem;
  `}
`;

const RequiredMark = styled.span`
  color: #eb3901;
`;

const SmallLabelText = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
`;

const BasicInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
`;

const DateInput = styled(BasicInput)`
  width: 16.5rem;

  ${customMedia.lessThan('mobile')`
    width: 13rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    width: 13rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    width: 18.2rem;
  `}
`;

const NumInput = styled(BasicInput)`
  width: 6.5rem;
`;

const AddressRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const AddressInput = styled(TextField)`
  width: 33rem;
  /* border: 1px solid #c4c4c4; */
  border-radius: 0.5rem;

  & .MuiOutlinedInput-input {
    font-size: 1.4rem;
    padding: 1.2rem;
  }

  ${customMedia.lessThan('mobile')`
    width: 24.6rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    width: 24.6rem;
  `}
`;

const TextInput = styled(TextField)`
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;

  & .MuiOutlinedInput-root {
    font-size: 1.6rem;
    padding: 1.2rem;
  }

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

  ${customMedia.lessThan('mobile')`
    width:20.2rem;
    height:20.2rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    width:20.2rem;
    height:20.2rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    width:22.2rem;
    height:22.2rem;
  `}
`;

const DefaultThumbnail = styled.div`
  width: 24.2rem;
  height: 24.2rem;
  border-radius: 0.5rem;
  background-color: lightgray;
  margin-bottom: 2rem;

  ${customMedia.lessThan('mobile')`
    width: 20.2rem;
    height: 20.2rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    width: 20.2rem;
    height: 20.2rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    width: 22.2rem;
    height: 22.2rem;
  `}
`;

const ImageFileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8rem;
`;

const AddressButton = styled(StyledButton)`
  background-color: #c4c4c4;
  color: white;

  font-size: 1.6rem;
  font-weight: bold;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }

  ${customMedia.lessThan('mobile')`
    font-size: 1.3rem;
    padding: 0;  
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    font-size: 1.3rem;
    padding: 0;    
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    font-size: 1.5rem;
  `}
`;

const CancelButton = styled(StyledButton)`
  font-size: 2rem;
  font-weight: bold;
  background-color: #e5e5e5;

  &:hover {
    background-color: #e5e5e5;
  }

  ${customMedia.lessThan('mobile')`
    font-size: 1.8rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    font-size: 1.8rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    font-size: 1.8rem;
  `}
`;

const UploadButton = styled(StyledButton)`
  font-size: 1.6rem;
  font-weight: bold;
  padding: 0.7rem 1rem;

  margin-bottom: 2rem;

  ${customMedia.lessThan('mobile')`
    font-size: 1.4rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    font-size: 1.4rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    font-size: 1.4rem;
  `}
`;

const EnrollButton = styled(StyledButton)`
  font-size: 2rem;
  font-weight: bold;

  ${customMedia.lessThan('mobile')`
    font-size: 1.8rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    font-size: 1.8rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    font-size: 1.8rem;
  `}
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ThumbnailContainer = styled.div`
  position: relative;
`;

const CloseIconButton = styled(IconButton)`
  margin-left: auto;
`;

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  z-index: 1;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 0.7rem;
  opacity: 0.6;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const ValidationText = styled.div`
  font-size: 1.4rem;
  color: #eb3901;
`;

const CategoryButton = styled(Category)`
  height: auto;
  padding: 1rem 1.4rem;
  font-size: 1.4rem;
  display: inline-block;
  text-align: center;

  ${(props) => {
    if (props.locationType === '온라인') {
      return css`
        background-color: #ffffff;
        color: #ff7539;
        border: 1px solid #ff7539;

        &:hover {
          background-color: #ff7539;
          color: white;
        }
        &.active {
          background-color: #ff7539;
          color: #ffffff;
        }
      `;
    } else if (props.locationType === '오프라인') {
      return css`
        background-color: #ffffff;
        color: #0057ff;
        border: 1px solid #0057ff;
        &:hover {
          background-color: #0057ff;
          color: #ffffff;
        }
        &.active {
          background-color: #0057ff;
          color: #ffffff;
        }
      `;
    } else if (props.category === '운동') {
      return css`
        background-color: #ffffff;
        color: #04c50c;
        border: 1px solid #04c50c;
        &:hover {
          background-color: #04c50c;
          color: #ffffff;
        }
        &.active {
          background-color: #04c50c;
          color: #ffffff;
        }
      `;
    } else if (props.category === '공부') {
      return css`
        background-color: #ffffff;
        color: #9900cf;
        border: 1px solid #9900cf;
        &:hover {
          background-color: #9900cf;
          color: #ffffff;
        }
        &.active {
          background-color: #9900cf;
          color: #ffffff;
        }
      `;
    } else if (props.category === '취미') {
      return css`
        background-color: #ffffff;
        color: #e2cd0f;
        border: 1px solid #e2cd0f;
        &:hover {
          background-color: #e2cd0f;
          color: #ffffff;
        }
        &.active {
          background-color: #e2cd0f;
          color: #ffffff;
        }
      `;
    } else if (props.category === '독서') {
      return css`
        background-color: #ffffff;
        color: #e71aad;
        border: 1px solid #e71aad;
        &:hover {
          background-color: #e71aad;
          color: #ffffff;
        }
        &.active {
          background-color: #e71aad;
          color: #ffffff;
        }
      `;
    } else if (props.category === '기타') {
      return css`
        background-color: #ffffff;
        color: #6ae4c7;
        border: 1px solid #6ae4c7;
        &:hover {
          background-color: #6ae4c7;
          color: #ffffff;
        }
        &.active {
          background-color: #6ae4c7;
          color: #ffffff;
        }
      `;
    }
  }}

  ${customMedia.lessThan('mobile')`
    padding: 0.8rem 1rem;
  `}

  ${customMedia.between('mobile', 'lgMobile')`
    padding: 0.8rem 1rem;
  `}
`;
