import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PythonController } from './python/python.controller';
import { PythonModule } from './python/python.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EcologyGateway } from './ecology/ecology.gateway';
import { EcologyModule } from './ecology/ecology.module';

@Module({
  imports: [PythonModule, PrismaModule, EcologyModule],
  controllers: [AppController, PythonController],
  providers: [AppService, PrismaService, EcologyGateway],
})
export class AppModule {}
