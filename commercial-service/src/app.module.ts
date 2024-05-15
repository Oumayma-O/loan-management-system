import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommercialServiceModule } from './commercial-service/commercial-service.module';
<<<<<<< HEAD
=======
import { SharedModule } from './shared/shared.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
>>>>>>> refs/remotes/origin/main

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OCR_SERVICE',
<<<<<<< HEAD
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ocr',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'ocr-consumer',
=======
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
>>>>>>> refs/remotes/origin/main
          },
        },
      },
    ]),
    CommercialServiceModule,
<<<<<<< HEAD
=======
    SharedModule,
>>>>>>> refs/remotes/origin/main
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
