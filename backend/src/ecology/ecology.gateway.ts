import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({ cors: true })
export class EcologyGateway {
  @WebSocketServer()
  server: Server;

  private lastSavedMinute: string | null = null;

  constructor(private readonly prismaService: PrismaService) {
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

    const now = new Date();
    const minute = now.getMinutes();
    const hour = now.getHours();
    const currentKey = `${hour}:${minute}`;
    if ((minute === 0 || minute === 15 || minute === 30 || minute === 45) && this.lastSavedMinute !== currentKey) {
      try {
        await this.prismaService.arduinoData.create({
          data: {
            temperature: data.temperatura,
            pression: data.pressao,
            altitude: data.altitude,
            luminosity: data.luminosidade,
            umity: data.umidade,
            calibration: data.calibragem,
            lampStatus: data.lampada === 1,
            bombStatus: data.bomba === 1,
            calibrationluminosity: data.calibragemluminosidade
          },
        });
        this.lastSavedMinute = currentKey;
        console.log(`✅ Dados salvos às ${currentKey}`);
      } catch (error) {
        console.error('❌ Erro ao salvar dados:', error);
      }
    }
  }
}

