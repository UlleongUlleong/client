import { io } from 'socket.io-client';

export const socket = io('https://api.sulleong.coderoom.site/chat', {
  transports: ['websocket'],
  withCredentials: true,
});
