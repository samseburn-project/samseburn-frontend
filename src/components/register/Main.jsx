import React from 'react';
import styled from 'styled-components';
import RegisterForm from './RegisterForm';

const Main = () => {
  return (
    <Wrapper>
      <RegisterForm />
      <Row></Row>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.section`
  width: 104rem;
  margin: 0 auto;
`;

const Row = styled.div``;
