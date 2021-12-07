import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function ImageUpload() {
  const [image, setImage] = useState('');

  const onLoadFile = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      {/* 이미지 미리보기 */}
      <img alt="" src={image} />

      <input type="file" accept="image/*" name="file" onChange={onLoadFile} />

      {/* 이미지 삭제 버튼 */}
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </>
  );
}

export default ImageUpload;
