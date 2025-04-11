import { Sensor } from "@/models/sensor.model";
import api from "@/utils/axios/api";

export class ArduinoService {
  public static async get(data: Date): Promise<Sensor[]> {
    return api.get('/ecology', {
        params: {
            data
        }
    }).then((response) => response.data);
  }
}