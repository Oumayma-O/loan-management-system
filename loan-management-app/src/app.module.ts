import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { LoanManagementModule } from './loan-management/loan-management.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [RabbitMQModule, LoanManagementModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
