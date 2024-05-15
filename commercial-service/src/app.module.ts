import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommercialServiceModule } from './commercial-service/commercial-service.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OCR_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ocr',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'ocr-consumer',
          },
        },
      },
    ]),
    CommercialServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
