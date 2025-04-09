"use client"

import { useSocket } from "@/hooks/useSocket";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useSocket('http://localhost:3001', (incoming) => {
    setData(incoming);
  });

  return (
<div className="p-4 bg-gray-100 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">Dados do Sensor</h2>
      {data ? (
        <ul>
          <li>🌡️ Temperatura: {data.TEMP} °C</li>
          <li>🌬️ Pressão: {data.PRESS} atm</li>
          <li>⛰️ Altitude: {data.ALT} m</li>
          <li>☀️ Luminosidade: {data.LUX} lux</li>
          <li>💧 Umidade: {data.UMIDADE}%</li>
          <li>⚙️ Calibragem: {data.POT}</li>
          <li>💡 Lâmpada: {data.LAMP ? 'Ligada' : 'Desligada'}</li>
          <li>💧 Bomba: {data.BOMB ? 'Ligada' : 'Desligada'}</li>
        </ul>
      ) : (
        <p>Aguardando dados...</p>
      )}
    </div>
  );
}
