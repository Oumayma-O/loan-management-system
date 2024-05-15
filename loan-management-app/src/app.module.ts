import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanManagementModule } from './loan-management/loan-management.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOAN_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'commercial',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'commercial-consumer',
          },
        },
      },
    ]),
    LoanManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
