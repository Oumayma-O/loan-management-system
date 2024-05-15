import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DocumentDto } from './shared/loan-application-full.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('commercial-ocr')
  async handleProcessFilesRequest(@Payload() data: DocumentDto[]) {
    console.log(
      `Received a files processing request from commercial service  : `,
      data,
    );
    //return await this.appService.handleProcessFilesRequest(data);
  }
}
