"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Pix_1 = require("../Pix");
(0, vitest_1.describe)('Pix Payment Method', () => {
    (0, vitest_1.it)('When creating a Pix instance with a valid key, then the instance should be created successfully', () => {
        // Arrange
        const validPixKey = '123.456.789-00';
        // Act
        const pixInstance = new Pix_1.Pix(validPixKey);
        // Assert
        (0, vitest_1.expect)(pixInstance).toBeInstanceOf(Pix_1.Pix);
    });
    (0, vitest_1.it)('When paying with Pix, then it should return the correct payment message', () => {
        // Arrange
        const pixKey = 'test@email.com';
        const amount = 100.5;
        const pixInstance = new Pix_1.Pix(pixKey);
        const expectedMessage = `Pagamento de R$100.50 realizado via PIX para a chave ${pixKey}`;
        // Act
        const result = pixInstance.pay(amount);
        // Assert
        (0, vitest_1.expect)(result).toBe(expectedMessage);
    });
    (0, vitest_1.it)('When paying with decimal amount, then it should format with 2 decimal places', () => {
        // Arrange
        const pixKey = '11987654321';
        const amount = 99.999;
        const pixInstance = new Pix_1.Pix(pixKey);
        const expectedMessage = `Pagamento de R$100.00 realizado via PIX para a chave ${pixKey}`;
        // Act
        const result = pixInstance.pay(amount);
        // Assert
        (0, vitest_1.expect)(result).toBe(expectedMessage);
    });
    (0, vitest_1.it)('When paying with integer amount, then it should format with .00 decimal places', () => {
        // Arrange
        const pixKey = 'random-key-123';
        const amount = 200;
        const pixInstance = new Pix_1.Pix(pixKey);
        const expectedMessage = `Pagamento de R$200.00 realizado via PIX para a chave ${pixKey}`;
        // Act
        const result = pixInstance.pay(amount);
        // Assert
        (0, vitest_1.expect)(result).toBe(expectedMessage);
    });
    (0, vitest_1.it)('When paying with zero amount, then it should return valid message', () => {
        // Arrange
        const pixKey = 'merchant-key';
        const amount = 0;
        const pixInstance = new Pix_1.Pix(pixKey);
        const expectedMessage = `Pagamento de R$0.00 realizado via PIX para a chave ${pixKey}`;
        // Act
        const result = pixInstance.pay(amount);
        // Assert
        (0, vitest_1.expect)(result).toBe(expectedMessage);
    });
});
