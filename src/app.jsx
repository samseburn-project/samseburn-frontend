import React from 'react';

import GlobalStyles from './GlobalStyles';
import CreatePage from './components/CreatePage';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <GlobalStyles />
        <CreatePage />
      </StyledEngineProvider>
    </>
  );
};

export default App;
