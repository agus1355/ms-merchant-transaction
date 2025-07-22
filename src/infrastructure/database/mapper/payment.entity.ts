import { EntitySchema, Transaction } from 'typeorm';
import { Payment } from 'src/domain/models/Payment';

export const PaymentEntity = new EntitySchema<Payment>({
  name: 'Payment',
  tableName: 'payment',
  target: Payment,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    method: {
      type: String,
    },
    cardNumber: {
      type: String,
      length: 4,
    },
    cardHolderName: {
      type: String,
    },
    cardExpirationDate: {
      type: String,
    },
    cardCvv: {
      type: String,
    },
  },
  // relations: {
  //   transactions: {
  //     type: 'one-to-many',
  //     target: () => 'Transaction',
  //     inverseSide: 'payment',
  //   },
  // },
});
