import { Controller, Get, Query } from '@nestjs/common';
import { GetReceivableSummaryVM } from '../view-models/receivable/GetReceivablesSummaryVM';
import { ReceivableSummaryVM } from '../view-models/receivable/ReceivableSummaryVM';
import { ReceivableUseCases } from 'src/application/use-cases/ReceivableUseCases';

@Controller('receivable')
export class ReceivableController {
  constructor(private readonly receivableUseCases: ReceivableUseCases) {}

  @Get('summary')
  async getSummary(
    @Query() query: GetReceivableSummaryVM,
  ): Promise<ReceivableSummaryVM> {
    const summary = await this.receivableUseCases.getTotalReceivablesPerPeriodByMerchant(
      parseInt(query.merchantId),
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );

    return ReceivableSummaryVM.toViewModel(summary);
  }

}
