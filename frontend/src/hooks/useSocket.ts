import { Sensor } from '@/models/sensor.model';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(url: string, onData: (data: Sensor) => void) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false); // Estado para controlar a conexão

  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Conectado ao WebSocket');
      setConnected(true); // Atualiza o estado para 'conectado'
    });

    socket.on('update', (data) => {
      console.log('📡 Dados recebidos do servidor!');
      onData(data);
    });

    socket.on('disconnect', () => {
      console.log('❌ Desconectado do WebSocket');
      setConnected(false); // Atualiza o estado para 'desconectado'
    });

    return () => {
      socket.disconnect();
    };
  }, [url, onData]);

  return { socket: socketRef.current, connected }; // Retorna o status de conexão
}
