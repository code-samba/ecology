"use client";
import { DatePicker } from "@/components/DatePicker";
import { DataGrid } from "@/components/DataGrid";
import { useSocket } from "@/hooks/useSocket";
import { Sensor } from "@/models/sensor.model";
import { useState, useCallback } from "react";

export default function Home() {
  const [sensorData, setSensorData] = useState<Sensor>();

  const handleDataReceived = useCallback((data: Sensor) => {
    setSensorData(data);
  }, []);

  const { connected, lastUpdate } = useSocket(
    "http://api.ecology.local",
    handleDataReceived
  );

  return (
    <main>
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold flex items-center md:text-3xl">
            Overview
          </h1>
          <div className="flex items-center justify-center rounded-lg font-medium px-4 py-2 bg-muted text-sm">
            {connected ? (
              <p>Connected! Last update: {lastUpdate?.toLocaleTimeString()}</p>
            ) : (
              <p>Disconnected... Trying to establish a connection</p>
            )}
          </div>
        </div>
      </div>
      <DataGrid data={sensorData} />
    </main>
  );
}
