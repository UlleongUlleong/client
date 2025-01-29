import React, { useEffect } from 'react';
import { GlobalStyle } from './styles/globalStyle';
import Index from './views/Index';
import { CustomToastContainer } from './components/toast/CustomToast';
import { useCategoryStore } from './store/useCategoryStore';

function App() {
  const { fetchMoodCategories, fetchAlcoholCategories } = useCategoryStore();

  useEffect(() => {
    fetchMoodCategories();
    fetchAlcoholCategories();
  }, []);
  return (
    <>
      <GlobalStyle />
      <Index />
      <CustomToastContainer hideProgressBar={true} pauseOnHover={false} />
    </>
  );
}

export default App;
