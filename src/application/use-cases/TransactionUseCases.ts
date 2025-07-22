import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/domain/models/Transaction';
import { PaymentService } from 'src/domain/services/payment.service';
import { ReceivableService } from 'src/domain/services/receivable.service';
import { TransactionService } from 'src/domain/services/transaction.service';

@Injectable()
export class TransactionUseCases {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly receivableService: ReceivableService,
    private readonly paymentService: PaymentService
  ) {}

  async createTransaction(transaction: Transaction): Promise<Transaction> {
      const payment = await this.paymentService.createPayment(transaction.payment);
      transaction.payment = payment;
      const savedTransaction = await this.transactionService.createTransaction(transaction);
      await this.receivableService.createReceivable(savedTransaction);
      return savedTransaction;
  }

  async getAllByMerchantId(merchantId: number): Promise<Transaction[]> {
    return this.transactionService.getTransactionsByMerchantId(merchantId);
  }
}
