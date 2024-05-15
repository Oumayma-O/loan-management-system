import { Module } from '@nestjs/common';
import { CommercialServiceController } from './commercial-service.controller';
import { CommercialServiceService } from './commercial-service.service';
import { AppService } from '../app.service';

@Module({
  controllers: [CommercialServiceController],
  providers: [CommercialServiceService, AppService],
})
export class CommercialServiceModule {}
