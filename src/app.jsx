import React from 'react';

import GlobalStyles from './GlobalStyles';
import RegisterPage from './components/register/RegisterPage';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <GlobalStyles />
        <RegisterPage />
      </StyledEngineProvider>
    </>
  );
};

export default App;
