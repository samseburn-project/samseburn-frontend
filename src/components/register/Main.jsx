import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

import RegisterForm from './RegisterForm';
import { customMedia } from '../../GlobalStyles';

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <SpinnerContainer>
          <CircularProgress size={70} color="warning" />
        </SpinnerContainer>
      ) : (
        <Wrapper>
          <RegisterForm />
          {/* <Row></Row> */}
        </Wrapper>
      )}
    </>
  );
};

export default Main;

const Wrapper = styled.section`
  width: 104rem;
  margin: 4rem auto 10rem auto;
  flex: 1;

  ${customMedia.between('mobile', 'lgMobile')`
    width: 31.5rem;
  `}

  ${customMedia.between('lgMobile', 'tablet')`
    width: 42rem;
  `}
  
	${customMedia.between('tablet', 'desktop')`
    width: 66.8rem;
  `}
`;

const Row = styled.div``;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
