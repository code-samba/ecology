"use client";

import { DatePicker } from "@/components/DatePicker";
import { Sensor } from "@/models/sensor.model";
import { useState } from "react";
import { ChartGrid } from "@/components/ChartGrid";

type SensorDataGrouped = {
  today: Sensor[];
  yesterday: Sensor[];
};

export default function Analytics() {
  const [chartData, setChartData] = useState<SensorDataGrouped>();

  return (
    <main>
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold flex items-center md:text-3xl">
            Analytics
          </h1>
          <DatePicker onDataReceived={setChartData} />
        </div>
      </div>
      <ChartGrid chartData={chartData} />
    </main>
  );
}
