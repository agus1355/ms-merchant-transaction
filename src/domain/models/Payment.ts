import { PaymentMethodEnum } from "../enums/PaymentMethodEnum";

export class Payment {
  public id?: number;
  constructor(
    public readonly method: PaymentMethodEnum,
    public readonly cardNumber: string,
    public readonly cardHolderName: string,
    public readonly cardCvv: string,
    public readonly cardExpirationDate: string,
  ) {}
}