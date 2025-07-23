"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const PaymentMethod_1 = require("../PaymentMethod");
// Criamos uma classe concreta de teste para poder testar a abstrata
class TestPaymentMethod extends PaymentMethod_1.PaymentMethod {
    pay(amount) {
        return `Paid ${amount} with test method`;
    }
}
(0, vitest_1.describe)('PaymentMethod', () => {
    (0, vitest_1.describe)('When pay method is called with valid amount, then it should return payment confirmation', () => {
        (0, vitest_1.it)('should return payment confirmation string', () => {
            // Arrange
            const paymentMethod = new TestPaymentMethod();
            const amount = 100;
            const expectedResult = `Paid ${amount} with test method`;
            // Act
            const result = paymentMethod.pay(amount);
            // Assert
            (0, vitest_1.expect)(result).toBe(expectedResult);
        });
    });
    (0, vitest_1.describe)('When pay method is called with zero amount, then it should return payment confirmation', () => {
        (0, vitest_1.it)('should handle zero amount correctly', () => {
            // Arrange
            const paymentMethod = new TestPaymentMethod();
            const amount = 0;
            const expectedResult = `Paid ${amount} with test method`;
            // Act
            const result = paymentMethod.pay(amount);
            // Assert
            (0, vitest_1.expect)(result).toBe(expectedResult);
        });
    });
    (0, vitest_1.describe)('When pay method is called with negative amount, then it should return payment confirmation', () => {
        (0, vitest_1.it)('should handle negative amount correctly', () => {
            // Arrange
            const paymentMethod = new TestPaymentMethod();
            const amount = -50;
            const expectedResult = `Paid ${amount} with test method`;
            // Act
            const result = paymentMethod.pay(amount);
            // Assert
            (0, vitest_1.expect)(result).toBe(expectedResult);
        });
    });
    (0, vitest_1.describe)('When pay method is called, then it should be called with correct amount', () => {
        (0, vitest_1.it)('should call pay with exact provided amount', () => {
            // Arrange
            const paymentMethod = new TestPaymentMethod();
            const paySpy = vitest_1.vi.spyOn(paymentMethod, 'pay');
            const amount = 75;
            // Act
            paymentMethod.pay(amount);
            // Assert
            (0, vitest_1.expect)(paySpy).toHaveBeenCalledWith(amount);
        });
    });
});
