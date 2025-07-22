import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from './BaseRepository';
import { Transaction } from 'src/domain/models/Transaction';
import { ITransactionRepository } from 'src/application/ports/ITransactionRepository';
import { InjectDataSource } from '@nestjs/typeorm';
import { TransactionEntity } from '../mapper/transaction.entity';

@Injectable()
export class TransactionRepository
  extends BaseRepository<Transaction>
  implements ITransactionRepository
{
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    super(dataSource, TransactionEntity);
  }

  async findByMerchantId(merchantId: number): Promise<Transaction[]> {
    return this.find({
      where: { merchantId },
    });
  }
}
