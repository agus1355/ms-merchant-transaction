// src/application/view-models/transaction.vm.ts

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import { PaymentMethodEnum } from 'src/domain/enums/PaymentMethodEnum';
import { Transaction } from 'src/domain/models/Transaction';

export class TransactionVM {
  @Expose()
  @ApiProperty({
    description: 'The amount of the transaction as a decimal string',
    example: '250.00',
  })
  amount: string;

  @Expose()
  @ApiProperty({
    description: 'Description of the transaction',
    example: 'T-Shirt Black M',
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'Payment method',
    enum: PaymentMethodEnum,
    example: PaymentMethodEnum.CREDIT_CARD,
  })
  method: PaymentMethodEnum;

  @Expose()
  @ApiProperty({
    description: 'Last 4 digits of the card number',
    example: '2222',
  })
  cardNumber: string;

  @Expose()
  @ApiProperty({
    description: 'Name of the cardholder',
    example: 'Simplenube Store',
  })
  cardHolderName: string;

  @Expose()
  @ApiProperty({
    description: 'Card expiration date in MM/YY format',
    example: '04/28',
  })
  cardExpirationDate: string;

  @Expose()
  @ApiProperty({
    description: 'Card CVV code',
    example: '222',
  })
  cardCvv: string;

  static toViewModel(transaction: Transaction): TransactionVM {
    const merged = {
      ...transaction,
      ...(transaction.payment ?? {})  // Esto aplana los campos de `payment` al mismo nivel
    };

    return plainToClass(TransactionVM, merged, { excludeExtraneousValues: true });
  }
}
