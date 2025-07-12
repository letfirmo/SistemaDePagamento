import { PaymentMethod } from "./PaymentMethod";

export class Pix extends PaymentMethod {
  constructor(private chavePix: string) {
    super();
  }

  pay(amount: number): string {
    return `Pagamento de R$${amount.toFixed(2)} realizado via PIX para a chave ${this.chavePix}`;
  }
}
