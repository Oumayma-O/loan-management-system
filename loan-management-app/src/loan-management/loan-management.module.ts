import { Module } from '@nestjs/common';
import { LoanManagementController } from './loan-management.controller';
import { LoanManagementService } from './loan-management.service';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [RabbitMQModule, SharedModule],
  controllers: [LoanManagementController],
  providers: [LoanManagementService],
})
export class LoanManagementModule {}
