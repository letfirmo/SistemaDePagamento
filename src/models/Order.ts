//Entidade pedido
import { PaymentMethod } from "./PaymentMethod";
import { Customer } from "./Customer";
import { Product } from "./Product";
export class Order {
  public paid: boolean = false

  constructor(
    public id: string,
    public customer: Customer,
    public items: Product[],
    public amount: number,
    public paymentMethod: PaymentMethod
  ) {}
}
