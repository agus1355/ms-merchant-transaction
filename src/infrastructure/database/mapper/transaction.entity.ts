import { EntitySchema } from 'typeorm';
import { Transaction } from 'src/domain/models/Transaction';

export const TransactionEntity = new EntitySchema<Transaction>({
  name: 'Transaction',
  tableName: 'transaction',
  target: Transaction,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    amount: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
    merchantId: {
      type: Number,
    },
  },
  relations: {
    payment: {
      type: 'many-to-one',
      target: 'Payment',
      joinColumn: true,
      eager: true,
    },
    // receivable: {
    //   type: 'one-to-one',
    //   target: 'Receivable',
    //   cascade: true,
    //   eager: false,
    //   joinColumn: true,
    // },
  },
});
