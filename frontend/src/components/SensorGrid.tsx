"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sensor } from "@/models/sensor.model";

const sensorLayout = [
  { id: 1, name: "Temperatura", unity: "°C" },
  { id: 2, name: "Umidade",  unity: "%" },
  { id: 3, name: "Pressao",  unity: "atm" },
  { id: 4, name: "Luminosidade",  unity: "lux" },
  { id: 5, name: "Calibragem",  unity: "%" },
  { id: 6, name: "Bomba", unity: "" },
  { id: 7, name: "Lampada", unity: "" },
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
          unity={sensor.unity}
        />
      ))}
    </div>
  );
}

interface SensorCardProps {
  name: string;
  value: string | number;
  unity: string;
}

function SensorCard({ name, value, unity }: SensorCardProps) {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {typeof value === 'number' ? (value === 1 ? 'Ativo' : 'Inativo') : value} {unity}
        </p>
      </CardContent>
    </Card>
  );
}
