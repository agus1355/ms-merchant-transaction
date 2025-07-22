import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTransactionVM } from '../view-models/transaction/CreateTransactionVM';
import { TransactionVM } from '../view-models/transaction/TransactionVM';
import { TransactionUseCases } from 'src/application/use-cases/TransactionUseCases';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionUseCases: TransactionUseCases) {}

  @Post()
  async createTransaction(
    @Body() createTransaction: CreateTransactionVM
  ): Promise<TransactionVM> {
    const transaction = await this.transactionUseCases.createTransaction(
      CreateTransactionVM.fromViewModel(createTransaction)
    );
    return TransactionVM.toViewModel(transaction);
  }

  @Get(':merchantId')
  async getTransactionsByMerchant(
    @Query('merchantId') merchantId: number,
  ): Promise<TransactionVM[]> {
    const transactions = await this.transactionUseCases.getAllByMerchantId(merchantId);
    return transactions.map(TransactionVM.toViewModel);
  }
}
