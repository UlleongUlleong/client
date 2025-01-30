import React, { useEffect } from 'react';
import { GlobalStyle } from './styles/globalStyle';
import Index from './views/Index';
import { CustomToastContainer } from './components/toast/CustomToast';
import { useSocketStore } from './components/create-room/socket/useSocketStore';

function App() {
  const connectSocket = useSocketStore((state) => state.connectSocket);

  // 앱 실행시 자동으로 소켓 연결 -> connectSocket 이 변경될 때마다 실행
  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  return (
    <>
      <GlobalStyle />
      <Index />
      <CustomToastContainer hideProgressBar={true} pauseOnHover={false} />
    </>
  );
}

export default App;
