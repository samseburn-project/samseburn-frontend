import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import styled from 'styled-components';

import { TextField, CircularProgress } from '@mui/material';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import StyledButton from '../common/StyledButton';

import { customMedia } from '../../GlobalStyles';

const ModifyUser = ({ userToken }) => {
  const [loading, setLoading] = useState(true);
  const [prevNickname, setPrevNickname] = useState('');
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState({
    imageFile: null,
    imageUrl: null,
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('https://api.samseburn.site/user', {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (res.status === 200) {
          setPrevNickname(res.data.username);
          setImage({
            imageFile: null,
            imageUrl: res.data.imgUrl,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser(); // 유저 정보 요청
    setLoading(false);
  }, []);

  const onChangeNickname = ({ target: { value } }) => {
    setNickname(value);
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

  const onDeleteFile = () => {
    setImage({
      imageFile: null,
      imageUrl:
        'https://samseburn-bucket.s3.ap-northeast-2.amazonaws.com/user/SpartaIconScale7.png',
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!nickname.trim()) {
        enqueueSnackbar('닉네임을 입력해주세요.', {
          variant: 'warning',
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar('회원정보가 수정되었습니다.', {
          variant: 'success',
          autoHideDuration: 2000,
        });
      }
      const formData = new FormData();
      formData.append('username', nickname);
      formData.append(
        'image',
        image.imageFile ? image.imageFile : image.imageUrl
      );

      await axios.put('https://api.samseburn.site/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  console.log(prevNickname);

  return (
    <>
      {loading ? (
        <SpinnerContainer>
          <CircularProgress size={30} color="warning" />
        </SpinnerContainer>
      ) : (
        <ModifyUserBox>
          <FormContainer>
            <ImageContainer>
              <ThumbnailContainer>
                {image.imageFile || image.imageUrl ? (
                  <ImageThumbnail alt="Profile Image" src={image.imageUrl} />
                ) : (
                  <DefaultThumbnail></DefaultThumbnail>
                )}
                <DeleteButtonContainer onClick={onDeleteFile}>
                  <Delete alt="Delete icon" style={{ zIndex: 10 }} />
                </DeleteButtonContainer>
              </ThumbnailContainer>
              <label htmlFor="input-image">
                <ImageFileInput
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={onLoadFile}
                  id="input-image"
                />
                <ImageUploadButton component="span">
                  이미지 변경
                </ImageUploadButton>
              </label>
            </ImageContainer>
            <Row>
              <LabelText>
                닉네임
                <RequiredMark>*</RequiredMark>
              </LabelText>
              <NameInput
                placeholder={prevNickname}
                onChange={onChangeNickname}
              />
            </Row>
            <Row>
              <SubmitButton
                id="user"
                onClick={(e) => {
                  onSubmitHandler(e);
                }}
              >
                수정 완료
              </SubmitButton>
            </Row>
          </FormContainer>
        </ModifyUserBox>
      )}
    </>
  );
};

export default ModifyUser;

// const LoadingContainer = styled.div`
// 	text-align: center;
// 	font-size: 2rem;
// 	margin: 8rem 0;
// `;

const Row = styled.div`
  margin: 0;
`;

const ModifyUserBox = styled.div`
  padding-bottom: 20rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ThumbnailContainer = styled.div`
  position: relative;
`;

const ImageThumbnail = styled.img`
  width: 24.2rem;
  height: 24.2rem;
  border-radius: 0.5rem;
  object-fit: cover;
  margin-bottom: 2rem;

  ${customMedia.between('mobile', 'lgMobile')`
    width: 20.2rem;
  height: 20.2rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
width: 22.2rem;
  height: 22.2rem;
    
  `}
  
	${customMedia.between('tablet', 'desktop')`

  `}
`;

const DefaultThumbnail = styled.div`
  width: 24.2rem;
  height: 24.2rem;
  border-radius: 0.5rem;
  background-color: lightgray;
  margin-bottom: 2rem;

  ${customMedia.between('mobile', 'lgMobile')`
    width: 20.2rem;
  height: 20.2rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
width: 22.2rem;
  height: 22.2rem;
    
  `}
  
	${customMedia.between('tablet', 'desktop')`

  `}
`;

const ImageFileInput = styled.input`
  display: none;
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

const ImageUploadButton = styled(StyledButton)`
  font-size: 1.6rem;

  ${customMedia.between('mobile', 'lgMobile')`
    font-size: 1.4rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    font-size: 1.4rem;
  `}
`;

const LabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;

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

const SubmitButton = styled(StyledButton)`
  font-size: 2rem;

  width: 33rem;
  height: 5rem;

  ${customMedia.between('mobile', 'lgMobile')`
    font-size: 1.6rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    font-size: 1.8rem;
    height: 4rem;
  `}
`;

const NameInput = styled(TextField)`
  width: 33rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  margin-bottom: ${(props) => (props.isNext ? '1rem' : '3rem')};

  & .MuiOutlinedInput-input {
    font-size: 1.6rem;
    padding: 1.2rem;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
