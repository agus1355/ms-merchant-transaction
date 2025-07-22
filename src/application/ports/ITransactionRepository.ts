import { Injectable } from '@nestjs/common';



import { IRepository } from './IRepository';
import { Transaction } from 'src/domain/models/Transaction';

@Injectable()
export abstract class ITransactionRepository extends IRepository<Transaction> {
    abstract findByMerchantId(merchantId: number): Promise<Transaction[]>;
}