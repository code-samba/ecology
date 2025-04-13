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

export function ChartGrid({
  chartData,
}: {
  chartData?: { today: Sensor[]; yesterday: Sensor[] };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sensorLayout.map((sensor) => (
        <ChartCard
          key={sensor.name}
          name={sensor.name}
          keyName={sensor.key as keyof Sensor}
          chartData={chartData}
          icon={sensor.icon}
        />
      ))}
    </div>
  );
}

interface ChartCardProps {
  name: string;
  keyName: keyof Sensor;
  chartData?: { today: Sensor[]; yesterday: Sensor[] };
  icon: React.ReactNode;
}

function ChartCard({ name, keyName, chartData, icon }: ChartCardProps) {
  const hasChart = chartData && chartData.today[0]?.[keyName] !== undefined;

  const chartConfig = {
    today: {
      label: "Today",
      color: "hsl(var(--chart-1))",
    },
    yesterday: {
      label: "Yesterday",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const hasYesterday = chartData?.yesterday?.length! > 0;

  const formattedData =
    chartData?.today
      .map((todayItem) => {
        const date = new Date(todayItem.createdAt);
        const hour = date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const todayValue = todayItem[keyName];

        if (hasYesterday) {
          const yesterdayItem = chartData.yesterday.find((item) => {
            const itemDate = new Date(item.createdAt);
            const itemHour = itemDate.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return itemHour === hour;
          });

          if (!yesterdayItem) return null;

          return {
            time: hour,
            today: todayValue,
            yesterday: yesterdayItem[keyName],
          };
        }

        return {
          time: hour,
          today: todayValue,
        };
      })
      .filter(Boolean) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-sm font-medium">
          {name}
          <p className="text-muted-foreground">{icon}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasChart && (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart
                data={formattedData}
                margin={{ left: 0, right: 0 }}
                width={300}
                height={100}
              >
                <defs>
                  <linearGradient id={`fill-today`} x1="0" y1="0" x2="0" y2="1">
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
                  <linearGradient
                    id={`fill-yesterday`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--chart-2)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-2)"
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
                  dataKey="today"
                  stroke="var(--chart-1)"
                  fill={`url(#fill-today)`}
                  fillOpacity={0.4}
                />
                <Area
                  type="linear"
                  dataKey="yesterday"
                  stroke="var(--chart-2)"
                  fill={`url(#fill-yesterday)`}
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
