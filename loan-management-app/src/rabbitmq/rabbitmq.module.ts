import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'loan-application',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    SharedModule,
  ],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
