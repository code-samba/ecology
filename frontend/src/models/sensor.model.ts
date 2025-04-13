export interface Sensor {
  createdAt: string | number | Date;
  temperatura: string;
  umidade: string;
  calibragem: string;
  pressao: string;
  altitude: string;
  bomba: number;
  lampada: number;
  calibragemluminosidade: number;
}

export interface TemperatureChartData {
  date: Date;
  maxTemperature: number;
  minTemperature: number;
}
