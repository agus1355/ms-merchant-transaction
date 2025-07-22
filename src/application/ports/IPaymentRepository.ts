import { Injectable } from '@nestjs/common';



import { IRepository } from './IRepository';
import { Payment } from 'src/domain/models/Payment';

@Injectable()
export abstract class IPaymentRepository extends IRepository<Payment> {
    abstract findOneByCardNumberAndCvv(cardNumber: string, cardCvv: string): Promise<Payment|undefined>;
}