import { Injectable } from '@nestjs/common';



import { IRepository } from './IRepository';
import { Receivable } from 'src/domain/models/Receivable';

@Injectable()
export abstract class IReceivableRepository extends IRepository<Receivable> {
    abstract findReceivablesByMerchantAndPeriod(merchantId: number, dateFrom: Date|undefined, dateTo: Date|undefined):Promise<Receivable[]>;
}