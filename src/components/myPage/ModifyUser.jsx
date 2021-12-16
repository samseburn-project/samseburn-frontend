import { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import { ReactComponent as Delete } from '../../assets/icons/delete-icon.svg';
import StyledButton from '../common/StyledButton';

const ModifyUser = () => {
  const [nickname, setNickname] = useState('');
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
    <ModifyUserBox>
      <FormContainer>
        <ImageContainer>
          {/* 이미지 미리보기 */}
          <ThumbnailContainer>
            {image.imageFile ? (
              <ImageThumbnail alt={image.imageFile.name} src={image.imageUrl} />
            ) : (
              <DefaultThumbnail></DefaultThumbnail>
            )}
            {/* 이미지 삭제 버튼 */}
            <DeleteButtonContainer>
              <IconButton>
                <Delete />
              </IconButton>
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
            <ImageUploadButton component="span">이미지 변경</ImageUploadButton>
          </label>
        </ImageContainer>

        <Row>
          <Label>닉네임*</Label>
          <BasicInput value={nickname} placeholder="김피버" />
        </Row>

        <Row>
          <SubmitButton>완료</SubmitButton>
        </Row>
      </FormContainer>
    </ModifyUserBox>
  );
};

export default ModifyUser;

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

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
`;

const ImageUploadButton = styled(StyledButton)`
  font-size: 1.6rem;
`;

const Label = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const SubmitButton = styled(StyledButton)`
  font-size: 2rem;

  width: 33rem;
  height: 5rem;
`;

const BasicInput = styled.input`
  font-size: 1.6rem;
  color: #959595;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  width: 33rem;
  height: 3.2rem;
  margin-bottom: ${(props) => (props.isNext ? '1rem' : '3rem')};
`;
