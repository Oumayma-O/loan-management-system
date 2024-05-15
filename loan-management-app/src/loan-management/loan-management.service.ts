<<<<<<< HEAD
import { Inject, Injectable } from '@nestjs/common';
import { DocumentDto, LoanApplicationDto } from './dto/loan-application.dto';
import { ClientKafka } from '@nestjs/microservices';
=======
import { Injectable } from '@nestjs/common';
import { DocumentDto, LoanApplicationDto } from './dto/loan-application.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
>>>>>>> refs/remotes/origin/main

@Injectable()
export class LoanManagementService {
  constructor(@Inject('LOAN_SERVICE') private readonly client: ClientKafka) {}

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
