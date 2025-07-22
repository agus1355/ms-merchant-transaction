import { Payment } from "./Payment";
import { Receivable } from "./Receivable";

export class Transaction {
  id?: number;
  receivable?: Receivable;
  constructor(
    public readonly amount: string,
    public readonly description: string,
    public readonly date: Date,
    public payment: Payment,
    public readonly merchantId: number
  ) {}
}