import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EcologyService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findBetween(start: Date, end: Date) {
    return this.prisma.arduinoData.findMany({
      where: {
        createdAt: {
          gte: start,
          lt: end,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
