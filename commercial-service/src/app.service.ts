import { Injectable } from '@nestjs/common';
import { LoanApplicationFullDto } from './shared/loan-application-full.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  handleApplicationPlaced(application: LoanApplicationFullDto) {
    console.log(
      `Received a new loan application - customer : ${application.fullName}`,
    );
  }
}
