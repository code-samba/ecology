import { Controller, Get, Query } from '@nestjs/common';
import { EcologyService } from './ecology.service';

@Controller('ecology')
export class EcologyController {
  constructor(private readonly ecologyService: EcologyService) {}

  @Get()
  async getSensorData(@Query('data') data: string) {
    const selectedDate = new Date(data);
    selectedDate.setHours(0, 0, 0, 0);

    const todayStart = new Date(selectedDate);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayStart);

    const [todayData, yesterdayData] = await Promise.all([
      this.ecologyService.findBetween(todayStart, todayEnd),
      this.ecologyService.findBetween(yesterdayStart, yesterdayEnd),
    ]);

    return {
      today: todayData,
      yesterday: yesterdayData,
    };
  }

  @Get('statistics')
  async getStatistics() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const days = 30;
    const statistics = [];

    for (let i = 0; i < days; i++) {
      const start = new Date(now);
      start.setDate(start.getDate() - i);

      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const dayData = await this.ecologyService.findBetween(start, end);

      if (dayData.length > 0) {
        const temperatures = dayData.map((d) => d.temperature);
        const maxTemp = Math.max(...temperatures);
        const minTemp = Math.min(...temperatures);

        statistics.push({
          date: start.toISOString().split('T')[0],
          maxTemperature: maxTemp,
          minTemperature: minTemp,
        });
      }
    }

    return statistics.reverse();
  }
}
