import React from 'react';

import GlobalStyles from './GlobalStyles';
import Main from './components/home/Main';
import RegisterPage from './components/register/RegisterPage';

const App = () => {
  return (
    <>
      <GlobalStyles />
      {/* <Main /> */}
      <RegisterPage />
    </>
  );
};

export default App;
