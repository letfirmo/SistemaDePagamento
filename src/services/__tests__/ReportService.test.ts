import { describe, it, expect } from 'vitest';
import { ReportService } from '../ReportService';
import { Order } from '../../models/Order';
import { Customer } from '../../models/Customer';
import { Region } from '../../models/Region';
import { Product } from '../../models/Product';
import { PaymentMethod } from '../../models/PaymentMethod';

// Mock para PaymentMethod para simplificar os testes
class MockPaymentMethod extends PaymentMethod {
  pay(amount: number): string {
    return `Paid ${amount} with mock`;
  }
}

describe('ReportService', () => {
  const mockCustomer = new Customer('1', 'John Doe', new Region('1', 'North', 10));
  const mockProduct1 = new Product(1, 'Product 1', 100);
  const mockProduct2 = new Product(2, 'Product 2', 200);
  const mockPaymentMethod = new MockPaymentMethod();

  describe('generateDailyReport', () => {
    it('when there are no orders, then should return report with zeros', () => {
      // Arrange
      const orders: Order[] = [];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toContain('Total de pedidos: 0');
      expect(result).toContain('Pedidos pagos: 0');
      expect(result).toContain('Pedidos não pagos: 0');
      expect(result).toContain('Valor total arrecadado: R$ 0.00');
    });

    it('when there are only paid orders, then should report all as paid', () => {
      // Arrange
      const order1 = new Order('1', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
      const order2 = new Order('2', mockCustomer, [mockProduct2], 200, mockPaymentMethod);
      order1.paid = true;
      order2.paid = true;
      const orders = [order1, order2];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toContain('Total de pedidos: 2');
      expect(result).toContain('Pedidos pagos: 2');
      expect(result).toContain('Pedidos não pagos: 0');
      expect(result).toContain('Valor total arrecadado: R$ 300.00');
    });

    it('when there are only unpaid orders, then should report all as unpaid', () => {
      // Arrange
      const order1 = new Order('1', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
      const order2 = new Order('2', mockCustomer, [mockProduct1, mockProduct2], 300, mockPaymentMethod);
      const orders = [order1, order2];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toContain('Total de pedidos: 2');
      expect(result).toContain('Pedidos pagos: 0');
      expect(result).toContain('Pedidos não pagos: 2');
      expect(result).toContain('Valor total arrecadado: R$ 400.00');
    });

    it('when there are mixed paid and unpaid orders, then should report correct counts', () => {
      // Arrange
      const order1 = new Order('1', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
      const order2 = new Order('2', mockCustomer, [mockProduct2], 200, mockPaymentMethod);
      const order3 = new Order('3', mockCustomer, [mockProduct1, mockProduct2], 300, mockPaymentMethod);
      order1.paid = true;
      order3.paid = true;
      const orders = [order1, order2, order3];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toContain('Total de pedidos: 3');
      expect(result).toContain('Pedidos pagos: 2');
      expect(result).toContain('Pedidos não pagos: 1');
      expect(result).toContain('Valor total arrecadado: R$ 600.00');
    });

    it('when orders have decimal amounts, then should format total correctly', () => {
      // Arrange
      const productWithDecimal = new Product(3, 'Product 3', 49.99);
      const order1 = new Order('1', mockCustomer, [productWithDecimal], 49.99, mockPaymentMethod);
      const order2 = new Order('2', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
      order1.paid = true;
      const orders = [order1, order2];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toContain('Valor total arrecadado: R$ 149.99');
    });
  });

  describe('calculateTotal', () => {
    it('when orders array is empty, then should return 0', () => {
      // Arrange
      const orders: Order[] = [];

      // Act
      const result = ReportService['calculateTotal'](orders);

      // Assert
      expect(result).toBe(0);
    });

    it('when there are multiple orders, then should return sum of amounts', () => {
      // Arrange
      const order1 = new Order('1', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
      const order2 = new Order('2', mockCustomer, [mockProduct2], 200, mockPaymentMethod);
      const orders = [order1, order2];

      // Act
      const result = ReportService['calculateTotal'](orders);

      // Assert
      expect(result).toBe(300);
    });
  });
});