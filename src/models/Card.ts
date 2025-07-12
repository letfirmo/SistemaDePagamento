import { PaymentMethod } from "./PaymentMethod";

export enum CardType {
  Credit = "Crédito",
  Debit = "Débito",
}

export class Card extends PaymentMethod {
  constructor(private cardNumber: string, private type: CardType) {
    super();
  }

  pay(amount: number): string {
    return `Pagamento de R$${amount.toFixed(2)} realizado via cartão ${this.type}`;
  }
}
