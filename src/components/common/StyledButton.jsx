import styled from 'styled-components';
import Button from '@mui/material/Button';

const StyledButton = (props) => {
  return <StyledMuiButton {...props}>{props.children}</StyledMuiButton>;
};

export default StyledButton;

const StyledMuiButton = styled(Button)`
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;
