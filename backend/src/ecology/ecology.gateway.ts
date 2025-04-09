import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EcologyService } from './ecology.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway()
export class EcologyGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => EcologyService))
    private readonly ecologyService: EcologyService,
  ) {}

  @SubscribeMessage('arduino-data')
  async handleArduinoData(@MessageBody() data: any) {
    console.log('Dados recebidos do Python via socket.io:', data);
    await this.ecologyService.handleNewData(data);

    this.server.emit('update', data);
  }
}
