import { Inject, Injectable } from '@nestjs/common';
import { LoanApplicationFullDto } from './shared/loan-application-full.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'commercial-ocr',
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
    console.log('Loan application docs:', application.documents);


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
  }
}
