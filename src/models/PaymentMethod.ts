// Entidade método de pagamento
export abstract class PaymentMethod {
  abstract pay(amount: number): string;
}
