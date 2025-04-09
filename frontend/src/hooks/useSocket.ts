import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(url: string, onData: (data: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Conectado ao WebSocket');
    });

    socket.on('sensor-data', (data) => {
      console.log('📡 Dados recebidos:', data);
      onData(data);
    });

    socket.on('disconnect', () => {
      console.log('❌ Desconectado do WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, [url, onData]);

  return socketRef.current;
}
