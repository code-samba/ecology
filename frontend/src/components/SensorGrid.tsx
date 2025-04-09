"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockSensorData = [
  { id: 1, name: "Temperatura", value: "24.5°C" },
  { id: 2, name: "Umidade", value: "250" },
  { id: 3, name: "Pressão", value: "1013 hPa" },
  { id: 4, name: "Luminosidade", value: "850 lux" },
  { id: 5, name: "Calibragem Sensor", value: "300" },
  { id: 6, name: "Bomba", value: "Ligada" },
  { id: 7, name: "Lâmpada", value: "Desligada" },
]

export function SensorGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockSensorData.map((sensor) => (
        <SensorCard key={sensor.id} name={sensor.name} value={sensor.value} />
      ))}
    </div>
  )
}

interface SensorCardProps {
  name: string
  value: string
}

function SensorCard({ name, value }: SensorCardProps) {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
