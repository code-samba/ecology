import { Module, forwardRef } from '@nestjs/common';
import { EcologyGateway } from './ecology.gateway';
import { EcologyService } from './ecology.service';
import { EcologyController } from './ecology.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EcologyController],
  providers: [EcologyGateway, EcologyService],
  exports: [EcologyService],
})
export class EcologyModule {}
