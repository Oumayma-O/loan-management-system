export class LoanApplicationFullDto {
  income: number;
  fullName: string;
  hasDebt: boolean;
  documents: DocumentDto[];
}
export class DocumentDto {
  id: number;
  fileName: string;
  contentType: string;
  length: number;
  data: Buffer;
}
