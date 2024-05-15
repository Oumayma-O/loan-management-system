import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommercialServiceModule } from './commercial-service/commercial-service.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OCR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'commercial-ocr',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'RISK_MANAGEMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'risk_management-commercial',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    CommercialServiceModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
