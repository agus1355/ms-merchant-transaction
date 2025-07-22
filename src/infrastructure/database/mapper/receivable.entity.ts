import { EntitySchema } from 'typeorm';
import { Receivable } from 'src/domain/models/Receivable';

export const ReceivableEntity = new EntitySchema<Receivable>({
  name: 'Receivable',
  tableName: 'receivable',
  target: Receivable,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    status: {
      type: String,
    },
    date: {
      type: Date,
    },
    feePercentage: {
      type: Number,
    },
    feeAmount: {
      type: Number,
    },
    amount: {
      type: Number,
    }
  },
  relations: {
    transaction: {
      type: 'one-to-one',
      target: () => 'Transaction',
      joinColumn: true,
      eager: true,
    },
  },
});
