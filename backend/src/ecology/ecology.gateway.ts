import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EcologyService } from './ecology.service';

@WebSocketGateway({ cors: true })
export class EcologyGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly ecologyService: EcologyService,
  ) {
    console.log('🛠️ EcologyGateway instanciado');
  }

  async handleConnection(client: Socket) {
    console.log(`🔌 Cliente conectado: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`❌ Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('arduino-data')
  async handleArduinoData(@MessageBody() data: any) {
    console.log('📡 Dados foram recebidos do Python!');

    this.server.emit('update', data);
  }
}
