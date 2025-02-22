import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null, // 초기 상태에서는 소켓 없음

  connectSocket: () => {
    const existingSocket = get().socket;
    if (existingSocket) {
      console.log('⚠️ 이미 소켓이 연결되어 있습니다:', existingSocket.id);
      return;
    }

    const newSocket = io('https://api.sulleong.coderoom.site/chat', {
      transports: ['websocket'],
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('✅ 소켓 연결됨! ID:', newSocket.id);
    });

    newSocket.on('connect_error', (err) => {
      console.error('❌ 소켓 연결 실패:', err.message);
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const existingSocket = get().socket;
    if (existingSocket) {
      existingSocket.disconnect();
      console.log('❌ 소켓 연결 해제됨!');
      set({ socket: null });
    }
  },
}));
