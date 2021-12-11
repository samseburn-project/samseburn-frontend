import { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function ModifyUser() {
  const [image, setImage] = useState('');

  const onLoadFile = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <FormContainer>
      <ImageUploadContainer>
        <img alt="" src={image} />
        <input type="file" accept="image/*" name="file" onChange={onLoadFile} />
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ImageUploadContainer>
      <Row>
        <LabelText>닉네임*</LabelText>
        <BasicInput value="기존 닉네임" />
      </Row>
      <Row>
        <RedBigButton>완료</RedBigButton>
      </Row>
    </FormContainer>
  );
}

export default ModifyUser;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageUploadContainer = styled.div``;

const Row = styled.div``;

const LabelText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
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
