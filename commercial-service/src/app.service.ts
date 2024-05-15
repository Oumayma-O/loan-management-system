import { Injectable } from '@nestjs/common';
import { LoanApplicationFullDto } from './shared/loan-application-full.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly client: ClientProxy;
  private readonly client2: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'commercial-ocr',
      },
    });
    this.client2 = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'risk_management-commercial',
      },
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
  async handleApplicationPlaced(application: LoanApplicationFullDto) {
    console.log(
      `Received a new loan application - customer : ${application.fullName}`,
    );
    console.log('Application:', application);
    try {
      await this.client
        .emit('commercial-ocr', application.documents)
        .toPromise();
      console.log('Loan application sent to commercial-ocr Queue.');
    } catch (error) {
      console.error(
        'Failed to send loan application to commercial-ocr queue:',
        error,
      );
    }
    try {
      await this.client2.emit('commercial-ocr', 'initial-score').toPromise();
      console.log('initial score sent to risk service.');
    } catch (error) {
      console.error('Failed to send initial score to risk service:', error);
    }
  }
}
