import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LoanApplicationFullDto } from '../shared/loan-application-full.dto';
import { CommercialServiceService } from './commercial-service.service';

@Controller('commercial-service')
export class CommercialServiceController {

<<<<<<< HEAD
=======
  @EventPattern('loan-application')
  async handleApplicationPlaced(@Payload() data: LoanApplicationFullDto) {
    return await this.appService.handleApplicationPlaced(data);
  }
>>>>>>> refs/remotes/origin/main
}
