"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sensor } from "@/models/sensor.model";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import { Separator } from "./ui/separator";

const sensorLayout = [
  { id: 1, name: "Temperatura", key: "temperature", wsKey: "temperatura", unity: "°C" },
  { id: 2, name: "Umidade", key: "umity", wsKey: "umidade", unity: "%" },
  { id: 3, name: "Pressao", key: "pression", wsKey: "pressao", unity: "atm" },
  { id: 4, name: "Luminosidade", key: "luminosity", wsKey: "luminosidade", unity: "lux" },
  { id: 5, name: "Calibragem", key: "calibration", wsKey: "calibragem", unity: "%" },
  { id: 6, name: "Altitude", key: "altitude", wsKey: "altitude", unity: "m" },
  { id: 7, name: "Bomba", key: "bombStatus", wsKey: "bomba", unity: "" },
  { id: 8, name: "Lampada", key: "lampStatus", wsKey: "lampada", unity: "" },
];

export function SensorGrid({
  data,
  chartData,
}: {
  data?: Sensor;
  chartData?: Sensor[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sensorLayout.map((sensor) => (
        <SensorCard
          key={sensor.id}
          name={sensor.name}
          keyName={sensor.key as keyof Sensor}
          value={data ? data[sensor.wsKey as keyof typeof data] : "..."}
          unity={sensor.unity}
          chartData={chartData}
        />
      ))}
    </div>
  );
}

interface SensorCardProps {
  name: string;
  keyName: keyof Sensor;
  value: string | number;
  unity: string;
  chartData?: Sensor[];
}

function SensorCard({ name, keyName, value, unity, chartData }: SensorCardProps) {
  const hasChart = chartData && chartData[0]?.[keyName] !== undefined;

  const config: ChartConfig = {
    [keyName]: {
      label: name,
      color: "hsl(var(--chart-1))",
    },
  };

  const formattedData =
    chartData?.map((item) => {
      const date = new Date(item.createdAt);
      const hour = date.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

      return {
        time: hour,
        [keyName]: item[keyName as keyof Sensor],
      };
    }) ?? [];

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Valores em tempo real
          <p className="text-xl font-bold">
            {value} {unity}
          </p>
          {hasChart && (
            <>
              <Separator className="mb-2"/>
              <h1>Dados da seleção</h1>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasChart && (
          <>
            <div>
              <ChartContainer config={config}>
                <LineChart
                  data={formattedData}
                  margin={{ left: 0, right: 0 }}
                  width={300}
                  height={100}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={6}
                  />
                  <YAxis hide domain={["auto", "auto"]} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Line
                    type="monotone"
                    dataKey={keyName}
                    stroke="black"
                    strokeWidth={2}
                    dot={{
                      r: 3,
                      stroke: "black",
                      strokeWidth: 1,
                      fill: "white",
                    }}
                    activeDot={{
                      r: 5,
                      fill: "black",
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
