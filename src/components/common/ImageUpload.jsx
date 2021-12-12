import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

function ImageUpload() {
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
    // setImage(URL.createObjectURL(e.target.files[0]));
    console.log(files);
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
      {/* 이미지 미리보기 */}
      {image.imageFile ? (
        <ImageThumbnail alt={image.imageFile.name} src={image.imageUrl} />
      ) : (
        <DefaultThumbnail></DefaultThumbnail>
      )}

      <ImageFileInput
        type="file"
        accept="image/*"
        name="file"
        onChange={onLoadFile}
        id="input-image"
      />
      <ImageUploadButton htmlFor="input-image">이미지 업로드</ImageUploadButton>
      {/* 이미지 삭제 버튼 */}
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </>
  );
}

export default ImageUpload;

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

const ImageUploadButton = styled.label`
  background-color: #eb3901;
  color: white;
  border: none;
  border-radius: 0.5rem;

  font-size: 1.6rem;
  font-weight: bold;

  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    background-color: white;
    color: #eb3901;
  }
`;
