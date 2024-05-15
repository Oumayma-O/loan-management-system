import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LoanApplicationFullDto } from './shared/loan-application-full.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('loan-application')
  async handleApplicationPlaced(@Payload() data: LoanApplicationFullDto) {
    return this.appService.handleApplicationPlaced(data);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
