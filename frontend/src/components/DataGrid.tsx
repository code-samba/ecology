"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sensor } from "@/models/sensor.model";
import {
  Droplets,
  FlaskConical,
  Gauge,
  Mountain,
  Power,
  Sun,
  ThermometerSun,
} from "lucide-react";
import React from "react";

export const sensorLayout = [
  {
    id: 1,
    name: "Temperature",
    key: "temperature",
    wsKey: "temperatura",
    unity: "°C",
    icon: <ThermometerSun />,
  },
  {
    id: 2,
    name: "Humidity",
    key: "umity",
    wsKey: "umidade",
    unity: "%",
    icon: <Droplets />,
  },
  {
    id: 3,
    name: "Pressure",
    key: "pression",
    wsKey: "pressao",
    unity: "atm",
    icon: <Gauge />,
  },
  {
    id: 4,
    name: "Luminosity",
    key: "luminosity",
    wsKey: "luminosidade",
    unity: "lux",
    icon: <Sun />,
  },
  {
    id: 5,
    name: "Luminosity Calibration",
    key: "calibrationluminosity",
    wsKey: "calibragemluminosidade",
    unity: "lux",
    icon: <FlaskConical />,
  },
  {
    id: 6,
    name: "Humidity Calibration",
    key: "calibration",
    wsKey: "calibragem",
    unity: "%",
    icon: <FlaskConical />,
  },
  {
    id: 7,
    name: "Altitude",
    key: "altitude",
    wsKey: "altitude",
    unity: "m",
    icon: <Mountain />,
  },
  {
    id: 8,
    name: "Bomb Status",
    key: "bombStatus",
    wsKey: "bomba",
    unity: "",
    icon: <Power />,
  },
  {
    id: 9,
    name: "Lamp Status",
    key: "lampStatus",
    wsKey: "lampada",
    unity: "",
    icon: <Power />,
  },
];

export function DataGrid({ data }: { data?: Sensor }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sensorLayout.map((sensor) => (
        <SensorCard
          key={sensor.id}
          name={sensor.name}
          value={
            data ? data[sensor.wsKey as keyof typeof data] : "Disconnected"
          }
          unity={data ? sensor.unity : ""}
          icon={sensor.icon}
        />
      ))}
    </div>
  );
}

interface SensorCardProps {
  name: string;
  value: string | number;
  unity: string;
  icon: React.ReactNode;
}

function SensorCard({ name, value, unity, icon }: SensorCardProps) {
  console.log(name, value);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-sm font-medium">
          {name}
          <p className="text-muted-foreground">{icon}</p>
        </CardTitle>
        <CardDescription>
          <p className="text-xl font-bold text-primary">
            {typeof value === "boolean"
              ? value
                ? "Ligado"
                : "Desligado"
              : value}
            {unity}
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
