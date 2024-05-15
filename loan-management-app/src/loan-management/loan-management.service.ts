import { Injectable } from '@nestjs/common';
import { DocumentDto, LoanApplicationDto } from './dto/loan-application.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class LoanManagementService {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'loan-application',
      },
    });
  }

  async submitLoanApplication(
    loanApplication: LoanApplicationDto,
    documents: DocumentDto[],
  ): Promise<string> {
    if (!documents || documents.length === 0) {
      throw new Error('No documents provided.');
    }

    const loanApplicationFullDto = {
      ...loanApplication,
      documents,
    };

    try {
      await this.client
        .emit('loan-application', loanApplicationFullDto)
        .toPromise();
      return 'Loan application sent to Loan application Queue.';
    } catch (error) {
      throw new Error('Failed to send loan application to RabbitMQ.');
    }
  }
}
