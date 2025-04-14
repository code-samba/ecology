"use client";
import { DataGrid } from "@/app/components/DataGrid";
import { TemperatureChart } from "@/app/components/TemperatureChart";
import { useSocket } from "@/hooks/useSocket";
import { Sensor, TemperatureChartData } from "@/models/sensor.model";
import { ArduinoService } from "@/services/arduino.service";
import { useState, useCallback, useEffect } from "react";

export default function Home() {
  const [sensorData, setSensorData] = useState<Sensor>();
  const [temperatureStatistics, setTemperatureStatistics] =
    useState<TemperatureChartData[]>();

  const handleDataReceived = useCallback((data: Sensor) => {
    setSensorData(data);
  }, []);

  const { connected, lastUpdate } = useSocket(
    "http://api.ecology.local",
    handleDataReceived
  );

  useEffect(() => {
    const getStatistics = async () => {
      const response = await ArduinoService.statistics();

      setTemperatureStatistics(response);
    };

    getStatistics();
  }, []);

  return (
    <main>
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold flex items-center md:text-3xl">
            Overview
          </h1>
          {connected && (
            <div
              className={`flex items-center justify-center rounded-lg font-medium px-4 py-2 text-sm bg-muted`}
            >
              {connected && lastUpdate ? (
                <p>{lastUpdate?.toLocaleTimeString()}</p>
              ) : (
                <p>Disconnected</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <DataGrid data={sensorData} />
        <TemperatureChart chartData={temperatureStatistics} />
      </div>
    </main>
  );
}
