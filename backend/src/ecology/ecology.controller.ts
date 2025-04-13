import { Controller, Get, Query } from '@nestjs/common';
import { EcologyService } from './ecology.service';

@Controller('ecology')
export class EcologyController {
  constructor(private readonly ecologyService: EcologyService) {}

  @Get()
  getSensorData(@Query('data') data: string) {
    const start = new Date(data);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    end.setHours(0, 0, 0, 0);

    return this.ecologyService.findBetween(start, end);
  }
}
