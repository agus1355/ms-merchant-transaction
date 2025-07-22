
import { Injectable, Inject } from '@nestjs/common';
import { IPaymentRepository } from 'src/application/ports/IPaymentRepository';
import { TOKENS } from 'src/application/tokens';
import { Payment } from '../models/Payment';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(TOKENS.PaymentRepository)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async createPayment(payment: Payment): Promise<Payment> {
    return this.paymentRepository.save(payment);
  }

}