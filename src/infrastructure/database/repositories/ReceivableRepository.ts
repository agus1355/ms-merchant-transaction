import { Injectable, Inject } from '@nestjs/common';
import { Between, DataSource, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { BaseRepository } from './BaseRepository';
import { InjectDataSource } from '@nestjs/typeorm';
import { Receivable } from 'src/domain/models/Receivable';
import { IReceivableRepository } from 'src/application/ports/IReceivableRepository';
import { ReceivableEntity } from '../mapper/receivable.entity';

@Injectable()
export class ReceivableRepository
  extends BaseRepository<Receivable>
  implements IReceivableRepository
{
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    super(dataSource, ReceivableEntity);
  }

  public async findReceivablesByMerchantAndPeriod(
    merchantId: number,
    dateFrom: Date|undefined,
    dateTo: Date|undefined
  ){
    const where: any = {};

    if (dateFrom && dateTo) {
      dateFrom.setHours(0,0,0);
      dateTo.setHours(23,59,59);
      where.date = Between(dateFrom, dateTo);
    } else if (dateFrom) {
      dateFrom.setHours(0,0,0);
      where.date = MoreThanOrEqual(dateFrom);
    } else if (dateTo) {
      dateTo.setHours(23,59,59);
      where.date = LessThanOrEqual(dateTo);
    }

    if (merchantId) {
      where.transaction = { merchantId };
    }

    return this.find({
      where,
      relations: ['transaction'],
    });
  }
}
