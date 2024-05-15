import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommercialServiceModule } from './commercial-service/commercial-service.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CommercialServiceModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
