"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sensor } from "@/models/sensor.model";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { sensorLayout } from "./DataGrid";

export function ChartGrid({ chartData }: { chartData?: Sensor[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sensorLayout.map((sensor) => (
        <ChartCard
          key={sensor.name}
          name={sensor.name}
          keyName={sensor.key as keyof Sensor}
          chartData={chartData}
        />
      ))}
    </div>
  );
}

interface ChartCardProps {
  name: string;
  keyName: keyof Sensor;
  chartData?: Sensor[];
}

function ChartCard({ name, keyName, chartData }: ChartCardProps) {
  const hasChart = chartData && chartData[0]?.[keyName] !== undefined;

  const config: ChartConfig = {
    [keyName]: {
      label: name,
      color: "hsl(var(--chart-1))",
    },
  };

  const formattedData =
    chartData?.map((item) => {
      const { createdAt } = item as Sensor & { createdAt: string };
      const date = new Date(createdAt);
      const hour = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        time: hour,
        [keyName]: item[keyName],
      };
    }) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasChart && (
          <ChartContainer config={config}>
            <ResponsiveContainer>
              <AreaChart
                data={formattedData}
                margin={{ left: 0, right: 0 }}
                width={300}
                height={100}
              >
                <defs>
                  <linearGradient
                    id={`fill-${keyName}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
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
                  content={<ChartTooltipContent />}
                />
                <Area
                  type="linear"
                  dataKey={keyName}
                  stroke="var(--chart-1)"
                  fill={`url(#fill-${keyName})`}
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
