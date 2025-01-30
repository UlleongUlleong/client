import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  connectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null, // 초기 상태에서는 소켓 없음
  connectSocket: () => {
    const newSocket = io('https://api.sulleong.coderoom.site/chat');
    set({ socket: newSocket }); // 새로운 소켓을 상태로 저장

    console.log('🔗 소켓 연결됨!');

    return () => {
      newSocket.disconnect();
      console.log('❌ 소켓 연결 해제됨!');
    };
  },
}));
