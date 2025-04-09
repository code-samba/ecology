import { Body, Controller, Post } from '@nestjs/common';
import { EcologyService } from './ecology.service';

@Controller('arduino')
export class EcologyController {
  constructor(private readonly ecologyService: EcologyService) {}

  @Post('data')
  handleSensorData(@Body() body: any) {
    this.ecologyService.handleNewData(body);
    return { success: true };
  }
}
