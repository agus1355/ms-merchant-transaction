
import { ReceivableStatusEnum } from "../enums/ReceivableStatusEnum";
import { Transaction } from "./Transaction";

export class Receivable {
    public id?: number;
    public amount: number;
    public transaction?: Transaction;
    public feeAmount: number;
    constructor(
        public readonly status: ReceivableStatusEnum,
        public readonly date: Date,
        public readonly feePercentage: number,
    ) {
        this.amount = 0;
    }

    public calculateAmount(rawAmount: number): void {
        const percentage = 1 - this.feePercentage / 100;
        this.amount = Number((rawAmount * percentage).toFixed(2));
    }

    public calculateFeeAmount(rawAmount: number): void {
        const fee = +(rawAmount * (this.feePercentage / 100)).toFixed(2);
        this.feeAmount = fee;
    }
}