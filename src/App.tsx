import React from 'react';
import { GlobalStyle } from './styles/globalStyle';
import Index from './views/Index';
import { CustomToastContainer } from './components/toast/CustomToast';

function App() {
  return (
    <>
      <GlobalStyle />
      <Index />
      <CustomToastContainer hideProgressBar={true} pauseOnHover={false} />
    </>
  );
}

export default App;
