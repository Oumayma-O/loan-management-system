import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { LoanManagementService } from './loan-management.service';
import { LoanApplicationDto } from './dto/loan-application.dto';

@Controller('loan-management')
export class LoanManagementController {
  constructor(private readonly loanManagementService: LoanManagementService) {}

  @Post('loan-application')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'documents', maxCount: 10 }]))
  async submitLoanApplication(
    @Body() loanApplicationDto: LoanApplicationDto,
    @UploadedFiles() documents: any[],
  ): Promise<string> {
    return await this.loanManagementService.submitLoanApplication(
      loanApplicationDto,
      documents,
    );
  }
}
