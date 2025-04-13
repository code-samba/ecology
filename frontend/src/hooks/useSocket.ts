import { Sensor } from "@/models/sensor.model";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(url: string, onData: (data: Sensor) => void) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Conectado ao WebSocket");
      setConnected(true);
    });

    socket.on("update", (data) => {
      console.log("📡 Dados recebidos do servidor!");
      onData(data);
      setLastUpdate(new Date());
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado do WebSocket");
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, onData]);

  return {
    socket: socketRef.current,
    connected,
    lastUpdate,
  };
}
