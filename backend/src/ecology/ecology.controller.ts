import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EcologyService } from './ecology.service';

@Controller('ecology')
export class EcologyController {
  constructor(private readonly ecologyService: EcologyService) { }

  @Get()
  getSensorData(@Query('data') data: string) {
    const start = new Date(data)
    start.setHours(0, 0, 0, 0) // Garante que o horário é 00:00:00

    const end = new Date(start)
    end.setDate(end.getDate() + 1) // Dia seguinte
    end.setHours(0, 0, 0, 0) // Garante que também é 00:00:00

    return this.ecologyService.findBetween(start, end)
  }
}
