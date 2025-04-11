"use client";
import { DatePicker } from "@/components/DatePicker";
import { SensorGrid } from "@/components/SensorGrid";
import { useSocket } from "@/hooks/useSocket";
import { Sensor } from "@/models/sensor.model";
import { useState, useCallback } from "react";

export default function Home() {
  const [sensorData, setSensorData] = useState<Sensor>();
  const [chartData, setChartData] = useState<Sensor[]>([])

  const handleDataReceived = useCallback((data: Sensor) => {
    setSensorData(data);
  }, []);

  const { connected } = useSocket(
    "http://api.ecology.local",
    handleDataReceived
  );

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center">
          <h1 className="text-xl font-boldflex items-center md:text-3xl">
            Ecology Automation
          </h1>
          <div
            className={`ml-2 w-4 h-4 rounded-full ${
              connected && sensorData ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <p
            className={`font-normal text-sm ml-2 ${
              connected && sensorData ? "text-green-500" : "text-red-500"
            }`}
          >
            {connected && sensorData ? "Conectado" : "Desconectado"}
          </p>
        </div>
        <p>Sustainable and Automated by Samba Code ©</p>
      </div>
      <div className="mb-4">
        <DatePicker onDataReceived={setChartData} />
      </div>
      <SensorGrid data={sensorData} chartData={chartData} />
    </main>
  );
}
