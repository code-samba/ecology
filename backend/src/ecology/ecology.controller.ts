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
}
