// src/domain/models/ReceivableSummary.ts

export class ReceivableSummary {
  constructor(
    public totalAmount: number,
    public futureAmount: number, 
    public totalFee: number
  ) {}
}
