import { Module } from '@nestjs/common';
import { PythonService } from './python.service';

@Module({
  providers: [PythonService]
})
export class PythonModule {}
