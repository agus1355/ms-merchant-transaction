// src/application/view-models/receivable-summary.vm.ts

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ReceivableSummary } from 'src/domain/models/ReceivableSummary';

export class ReceivableSummaryVM {
  @Expose()
  @ApiProperty({ example: 5000, description: 'Total amount of receivables' })
  totalAmount: number;

  @Expose()
  @ApiProperty({ example: 2000, description: 'Amount receivable in the future' })
  futureAmount: number;

  @Expose()
  @ApiProperty({ example: 120, description: 'Total fee charged for paid receivables' })
  totalFee: number;

  static toViewModel(summary: ReceivableSummary): ReceivableSummaryVM {
    return {
      totalAmount: summary.totalAmount,
      futureAmount: summary.futureAmount,
      totalFee: summary.totalFee,
    };
  }
}
