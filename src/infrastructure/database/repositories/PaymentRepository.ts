import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { InjectDataSource } from '@nestjs/typeorm';
import { IPaymentRepository } from 'src/application/ports/IPaymentRepository';
import { Payment } from 'src/domain/models/Payment';
import { PaymentEntity } from '../mapper/payment.entity';

@Injectable()
export class PaymentRepository
  extends BaseRepository<Payment>
  implements IPaymentRepository
{
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    super(dataSource, PaymentEntity);
  }

  public async findOneByCardNumberAndCvv(cardNumber: string, cardCvv: string): Promise<Payment|undefined>{
    const payment = await this.find({where: {cardNumber, cardCvv}});
    return payment[0];
  }
}
