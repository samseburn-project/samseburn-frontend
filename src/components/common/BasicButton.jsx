import styled from 'styled-components';
import Button from '@mui/material/Button';

const BasicButton = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default BasicButton;

const StyledButton = styled(Button)`
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;
