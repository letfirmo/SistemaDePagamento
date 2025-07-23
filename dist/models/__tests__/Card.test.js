"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Card_1 = require("../Card");
const PaymentMethod_1 = require("../PaymentMethod");
(0, vitest_1.describe)("Card", () => {
    (0, vitest_1.it)("should be an instance of PaymentMethod", () => {
        // Arrange
        const cardNumber = "4111111111111111";
        const type = Card_1.CardType.Credit;
        // Act
        const card = new Card_1.Card(cardNumber, type);
        // Assert
        (0, vitest_1.expect)(card).toBeInstanceOf(PaymentMethod_1.PaymentMethod);
    });
    (0, vitest_1.describe)("When paying with credit card, then should return correct payment message", () => {
        (0, vitest_1.it)("should return payment message for credit card", () => {
            // Arrange
            const cardNumber = "4111111111111111";
            const type = Card_1.CardType.Credit;
            const amount = 100.5;
            const card = new Card_1.Card(cardNumber, type);
            // Act
            const result = card.pay(amount);
            // Assert
            (0, vitest_1.expect)(result).toBe("Pagamento de R$100.50 realizado via cartão Crédito");
        });
    });
    (0, vitest_1.describe)("When paying with debit card, then should return correct payment message", () => {
        (0, vitest_1.it)("should return payment message for debit card", () => {
            // Arrange
            const cardNumber = "5111111111111111";
            const type = Card_1.CardType.Debit;
            const amount = 75.25;
            const card = new Card_1.Card(cardNumber, type);
            // Act
            const result = card.pay(amount);
            // Assert
            (0, vitest_1.expect)(result).toBe("Pagamento de R$75.25 realizado via cartão Débito");
        });
    });
    (0, vitest_1.describe)("When paying with different amounts, then should format correctly", () => {
        vitest_1.it.each([
            [0, "0.00"],
            [10, "10.00"],
            [25.5, "25.50"],
            [100.123, "100.12"],
            [999.999, "1000.00"],
        ])("should format amount %f as %s", (amount, expected) => {
            // Arrange
            const cardNumber = "4111111111111111";
            const type = Card_1.CardType.Credit;
            const card = new Card_1.Card(cardNumber, type);
            // Act
            const result = card.pay(amount);
            // Assert
            (0, vitest_1.expect)(result).toContain(`R$${expected}`);
        });
    });
});
