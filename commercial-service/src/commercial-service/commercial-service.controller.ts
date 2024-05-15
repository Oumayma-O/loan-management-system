import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LoanApplicationFullDto } from '../shared/loan-application-full.dto';
import { AppService } from '../app.service';

@Controller('commercial-service')
export class CommercialServiceController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('loan-application')
  async handleApplicationPlaced(@Payload() data: LoanApplicationFullDto) {
    return await this.appService.handleApplicationPlaced(data);
  }
}
