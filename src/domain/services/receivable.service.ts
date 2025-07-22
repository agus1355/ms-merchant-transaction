
import { Injectable, Inject } from '@nestjs/common';
import { Receivable } from '../models/Receivable';
import { PaymentMethodEnum } from '../enums/PaymentMethodEnum';
import { ReceivableStatusEnum } from '../enums/ReceivableStatusEnum';
import { IReceivableRepository } from 'src/application/ports/IReceivableRepository';
import { TOKENS } from 'src/application/tokens';
import { Transaction } from '../models/Transaction';

@Injectable()
export class ReceivableService {
  constructor(
    @Inject(TOKENS.ReceivableRepository)
    private readonly receivableRepository: IReceivableRepository,
  ) {}

  async createReceivable(
    transaction: Transaction
  ): Promise<Receivable> {
    let receivableStatus: ReceivableStatusEnum;
    let receivableDate: Date;
    let fee: number;
    if(transaction.payment.method == PaymentMethodEnum.DEBIT_CARD){
      receivableStatus = ReceivableStatusEnum.PAID;
      receivableDate = transaction.date;
      fee = 2;
    }
    else{
      receivableStatus = ReceivableStatusEnum.WAITING_FUNDS;
      receivableDate = transaction.date;
      receivableDate.setDate(transaction.date.getDate() + 30);
      fee = 4;
    }
    const receivable = new Receivable(receivableStatus, receivableDate, fee);
    receivable.calculateAmount(parseInt(transaction.amount));
    receivable.calculateFeeAmount(parseInt(transaction.amount));
    receivable.transaction = transaction;
    return this.receivableRepository.save(receivable);
  }

  public async getReceivablesByMerchantAndPeriod(
    merchantId: number,
    dateFrom: Date|undefined,
    dateTo: Date|undefined
  ): Promise<Receivable[]>{
    return this.receivableRepository.findReceivablesByMerchantAndPeriod(merchantId, dateFrom, dateTo);
  }

  public calculateTotalAmount(receivables: Receivable[]): number{
    return receivables.reduce((sum, r) => sum + r.amount, 0);
  }

  public calculateFutureAmount(receivables: Receivable[]): number{
    return receivables
            .filter(r => r.status === 'waiting_funds' && r.date >= (new Date()))
            .reduce((sum, r) => sum + r.amount, 0);
  }

  public calculateTotalFee(receivables: Receivable[]): number{
    return receivables
            .filter(r => r.status === 'paid' || r.date < (new Date()))
            .reduce((sum, r) => sum + r.feeAmount, 0);
  }
}