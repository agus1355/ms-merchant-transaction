// src/application/view-models/create-transaction.vm.ts

import { IsString, IsNotEmpty, IsEnum, Matches, IsNumber } from 'class-validator';
import { PaymentMethodEnum } from 'src/domain/enums/PaymentMethodEnum';
import { Payment } from 'src/domain/models/Payment';
import { Transaction } from 'src/domain/models/Transaction';

export class CreateTransactionVM {
  @IsString()
  @IsNotEmpty()
  amount: string; // Decimal string, e.g. "250.00"

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(PaymentMethodEnum)
  method: PaymentMethodEnum;

  @IsString()
  @Matches(/^\d{4}$/, { message: 'cardNumber must be exactly last 4 digits' })
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'cardExpirationDate must be in MM/YY format',
  })
  cardExpirationDate: string;

  @IsString()
  @Matches(/^\d{3,4}$/, {
    message: 'cardCvv must be 3 or 4 digits',
  })
  cardCvv: string;

  @IsNumber()
  merchantId: number;

  static fromViewModel(vm: CreateTransactionVM): Transaction {
    const payment = new Payment(vm.method, vm.cardNumber, vm.cardHolderName, vm.cardCvv, vm.cardExpirationDate);

    return new Transaction(vm.amount, vm.description, new Date(), payment, vm.merchantId);
  }
}
