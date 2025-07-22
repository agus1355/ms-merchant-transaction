import { Injectable } from '@nestjs/common';
import { ReceivableSummary } from 'src/domain/models/ReceivableSummary';
import { ReceivableService } from 'src/domain/services/receivable.service';

@Injectable()
export class ReceivableUseCases {
  constructor(
    private readonly receivableService: ReceivableService,
  ) {}

    async getTotalReceivablesPerPeriodByMerchant(
        merchantId: number,
        from: Date|undefined,
        to: Date|undefined
    ): Promise<ReceivableSummary> {
        const receivables = await this.receivableService.getReceivablesByMerchantAndPeriod(
            merchantId,
            from,
            to
        );

        return new ReceivableSummary(
            this.receivableService.calculateTotalAmount(receivables),
            this.receivableService.calculateFutureAmount(receivables),
            this.receivableService.calculateTotalFee(receivables)
        );
    }
}
