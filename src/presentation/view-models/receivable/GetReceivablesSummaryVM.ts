import { IsString, IsNotEmpty, IsDateString, ValidateIf } from 'class-validator';

export class GetReceivableSummaryVM {
  @IsString()
  @IsNotEmpty()
  merchantId: string;

  @ValidateIf((o) => o.startDate !== undefined)
  @IsDateString()
  startDate?: string;

  @ValidateIf((o) => o.endDate !== undefined)
  @IsDateString()
  endDate?: string;
}
