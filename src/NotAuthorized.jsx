import React from 'react';

import styled from 'styled-components';

const NotFound = () => {
  return (
    <Wrapper>
      <Text>π« μλͺ»λ κ²½λ‘λ‘ μ κ·Όνμμ΅λλ€ π«</Text>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 4rem;
  font-weight: bold;
`;
