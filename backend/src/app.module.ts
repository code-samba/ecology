import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EcologyModule } from './ecology/ecology.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PrismaModule, EcologyModule, HealthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
