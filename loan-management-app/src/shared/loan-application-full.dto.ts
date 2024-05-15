export class LoanApplicationFullDto {
  constructor(
    public Id: string,
    public Income: number,
    public FullName: string,
    public HasDebt: boolean,
    public Documents: DocumentDto[],
  ) {}
}
export class DocumentDto {
  id: number;
  fileName: string;
  contentType: string;
  length: number;
  data: Buffer;
}
