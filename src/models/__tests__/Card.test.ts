import { describe, it, expect } from "vitest";
import { Card, CardType } from "../Card";
import { PaymentMethod } from "../PaymentMethod";

describe("Card", () => {
  it("should be an instance of PaymentMethod", () => {
    // Arrange
    const cardNumber = "4111111111111111";
    const type = CardType.Credit;

    // Act
    const card = new Card(cardNumber, type);

    // Assert
    expect(card).toBeInstanceOf(PaymentMethod);
  });

  describe("When paying with credit card, then should return correct payment message", () => {
    it("should return payment message for credit card", () => {
      // Arrange
      const cardNumber = "4111111111111111";
      const type = CardType.Credit;
      const amount = 100.5;
      const card = new Card(cardNumber, type);

      // Act
      const result = card.pay(amount);

      // Assert
      expect(result).toBe("Pagamento de R$100.50 realizado via cartão Crédito");
    });
  });

  describe("When paying with debit card, then should return correct payment message", () => {
    it("should return payment message for debit card", () => {
      // Arrange
      const cardNumber = "5111111111111111";
      const type = CardType.Debit;
      const amount = 75.25;
      const card = new Card(cardNumber, type);

      // Act
      const result = card.pay(amount);

      // Assert
      expect(result).toBe("Pagamento de R$75.25 realizado via cartão Débito");
    });
  });

  describe("When paying with different amounts, then should format correctly", () => {
    it.each([
      [0, "0.00"],
      [10, "10.00"],
      [25.5, "25.50"],
      [100.123, "100.12"],
      [999.999, "1000.00"],
    ])("should format amount %f as %s", (amount, expected) => {
      // Arrange
      const cardNumber = "4111111111111111";
      const type = CardType.Credit;
      const card = new Card(cardNumber, type);

      // Act
      const result = card.pay(amount as number);

      // Assert
      expect(result).toContain(`R$${expected}`);
    });
  });
});