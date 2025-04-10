"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sensor } from "@/models/sensor.model";

const sensorLayout = [
  { id: 1, name: "Temperatura" },
  { id: 2, name: "Umidade" },
  { id: 3, name: "Pressao" },
  { id: 4, name: "Luminosidade" },
  { id: 5, name: "Calibragem" },
  { id: 6, name: "Bomba" },
  { id: 7, name: "Lampada" },
];

export function SensorGrid({ data }: { data?: Sensor }) {
  const valueOrDefault = (name: string) => {
    return data ? data[name.toLowerCase() as keyof Sensor] : "...";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sensorLayout.map((sensor) => (
        <SensorCard 
          key={sensor.id} 
          name={sensor.name} 
          value={valueOrDefault(sensor.name)} 
        />
      ))}
    </div>
  );
}

interface SensorCardProps {
  name: string;
  value: string | boolean;
}

function SensorCard({ name, value }: SensorCardProps) {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {typeof value === 'boolean' ? (value ? 'Ativo' : 'Inativo') : value}
        </p>
      </CardContent>
    </Card>
  );
}
