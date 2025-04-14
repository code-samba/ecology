"use client";
import { DatePicker } from "@/app/analytics/components/DatePicker";
import { Sensor } from "@/models/sensor.model";
import { useState } from "react";
import { ChartGrid } from "@/app/analytics/components/ChartGrid";
import { Checkbox } from "@/components/ui/checkbox";

type SensorDataGrouped = {
  today: Sensor[];
  yesterday: Sensor[];
};

export default function Analytics() {
  const [chartData, setChartData] = useState<SensorDataGrouped>();
  const [naturalLines, setNaturalLines] = useState(false);
  const [comparePreviousDay, setComparePreviousDay] = useState(false);

  const handleNaturalLinesChange = () => {
    setNaturalLines((value) => !value);
  };

  const handleComparePreviousDayChange = () => {
    setComparePreviousDay((value) => !value);
  };

  return (
    <main>
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold flex items-center md:text-3xl">
            Analytics
          </h1>
          <div className="flex items-center gap-6">
            <div className="items-top flex space-x-2">
              <Checkbox
                checked={naturalLines}
                onCheckedChange={handleNaturalLinesChange}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Natural lines
                </label>
              </div>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox
                checked={comparePreviousDay}
                onCheckedChange={handleComparePreviousDayChange}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Compare previous day
                </label>
              </div>
            </div>
            <DatePicker onDataReceived={setChartData} />
          </div>
        </div>
      </div>
      <ChartGrid
        chartData={chartData}
        naturalLines={naturalLines}
        comparePrevious={comparePreviousDay}
      />
    </main>
  );
}
