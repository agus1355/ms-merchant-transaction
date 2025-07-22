
import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository } from 'src/application/ports/ITransactionRepository';
import { TOKENS } from 'src/application/tokens';
import { Transaction } from 'src/domain/models/Transaction';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TOKENS.TransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  async getTransactionsByMerchantId(merchantId: number): Promise<Transaction[]>{
    return this.transactionRepository.findByMerchantId(merchantId);
  }
}