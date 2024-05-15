export class LoanApplicationDto {
  income: number;
  fullName: string;
  hasDebt: boolean;
}
//
export class DocumentDto {
  id: number;
  fileName: string;
  contentType: string;
  length: number;
  data: Buffer;
}
