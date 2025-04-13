import { Sensor, TemperatureChartData } from "@/models/sensor.model";
import api from "@/utils/axios/api";

export class ArduinoService {
  public static async get(
    data: Date
  ): Promise<{ today: Sensor[]; yesterday: Sensor[] }> {
    return api
      .get("/ecology", {
        params: {
          data,
        },
      })
      .then((response) => response.data);
  }

  public static async statistics(): Promise<TemperatureChartData[]> {
    return api.get("/ecology/statistics").then((response) => response.data);
  }
}
