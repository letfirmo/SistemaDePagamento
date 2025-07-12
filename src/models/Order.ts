import { PaymentMethod } from "./PaymentMethod";
import { Customer } from "./Customer";

export class Order {
  constructor(
    public id: string,
    public customer: Customer,
    public amount: number,
    public paymentMethod: PaymentMethod
  ) {}

  processPayment(): string {
    return this.paymentMethod.pay(this.amount + this.customer.region.deliveryFee);
  }
}
