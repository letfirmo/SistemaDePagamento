import { describe, it, expect, vi } from 'vitest';
import { PaymentMethod } from '../models/PaymentMethod';

// Criamos uma classe concreta de teste para poder testar a abstrata
class TestPaymentMethod extends PaymentMethod {
  pay(amount: number): string {
    return `Paid ${amount} with test method`;
  }
}

describe('PaymentMethod', () => {
  describe('When pay method is called with valid amount, then it should return payment confirmation', () => {
    it('should return payment confirmation string', () => {
      // Arrange
      const paymentMethod = new TestPaymentMethod();
      const amount = 100;
      const expectedResult = `Paid ${amount} with test method`;

      // Act
      const result = paymentMethod.pay(amount);

      // Assert
      expect(result).toBe(expectedResult);
    });
  });

  describe('When pay method is called with zero amount, then it should return payment confirmation', () => {
    it('should handle zero amount correctly', () => {
      // Arrange
      const paymentMethod = new TestPaymentMethod();
      const amount = 0;
      const expectedResult = `Paid ${amount} with test method`;

      // Act
      const result = paymentMethod.pay(amount);

      // Assert
      expect(result).toBe(expectedResult);
    });
  });

  describe('When pay method is called with negative amount, then it should return payment confirmation', () => {
    it('should handle negative amount correctly', () => {
      // Arrange
      const paymentMethod = new TestPaymentMethod();
      const amount = -50;
      const expectedResult = `Paid ${amount} with test method`;

      // Act
      const result = paymentMethod.pay(amount);

      // Assert
      expect(result).toBe(expectedResult);
    });
  });

  describe('When pay method is called, then it should be called with correct amount', () => {
    it('should call pay with exact provided amount', () => {
      // Arrange
      const paymentMethod = new TestPaymentMethod();
      const paySpy = vi.spyOn(paymentMethod, 'pay');
      const amount = 75;

      // Act
      paymentMethod.pay(amount);

      // Assert
      expect(paySpy).toHaveBeenCalledWith(amount);
    });
  });
});