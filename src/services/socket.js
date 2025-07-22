import { io } from 'socket.io-client';

const SOCKET_PORT = 5000;
const SOCKET_URL = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.hostname}:${SOCKET_PORT}`;

export const initSocket = () => {
  const socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000
  });

  return socket;
};