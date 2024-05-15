import { Module } from '@nestjs/common';
import { CommercialServiceController } from './commercial-service.controller';
import { CommercialServiceService } from './commercial-service.service';

@Module({
  controllers: [CommercialServiceController],
  providers: [CommercialServiceService],
})
export class CommercialServiceModule {}
