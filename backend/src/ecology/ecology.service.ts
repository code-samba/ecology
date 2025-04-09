import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EcologyGateway } from './ecology.gateway';

@Injectable()
export class EcologyService {
  constructor(
    @Inject(forwardRef(() => EcologyGateway))
    private readonly ecologyGateway: EcologyGateway,
    private readonly prisma: PrismaService,
  ) {}

  async handleNewData(data: any) {

    /*await this.prisma.sensorData.create({
      data: {
        temperature: data.temperature,
        humidity: data.humidity,
        pressure: data.pressure,
        altitude: data.altitude,
        createdAt: new Date(), // ou use default do banco
      },
    });*/
  }
}
