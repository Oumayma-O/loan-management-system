import { Inject, Injectable } from '@nestjs/common';
import { LoanApplicationFullDto } from './shared/loan-application-full.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('OCR_SERVICE') private readonly ocrClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleApplicationPlaced(application: LoanApplicationFullDto) {
    console.log(
      `Received a new loan application - customer : ${application.fullName}`,
    );

    try {
      await this.ocrClient.emit('commercial-ocr', application).toPromise();
      console.log('Loan application sent to commercial-ocr Queue.');
    } catch (error) {
      console.error(
        'Failed to send loan application to commercial-ocr queue:',
        error,
      );
    }
  }
}
