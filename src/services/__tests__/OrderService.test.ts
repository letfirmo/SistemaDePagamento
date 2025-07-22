import { describe, it, expect, beforeEach } from 'vitest';
import { OrderService, orderService } from '../OrderService';
import { Order } from '../../models/Order';
import { Customer } from '../../models/Customer';
import { Product } from '../../models/Product';
import { PaymentMethod } from '../../models/PaymentMethod';
import { Region } from '../../models/Region';

// Mock implementation for testing
class MockPaymentMethod extends PaymentMethod {
  pay(amount: number): string {
    return `Mock payment for ${amount}`;
  }
}

describe('OrderService', () => {
  let service: OrderService;
  const mockRegion = new Region('1', 'North', 10);
  const mockCustomer = new Customer('1', 'John Doe', mockRegion);
  const mockProduct1 = new Product(1, 'Product 1', 100);
  const mockProduct2 = new Product(2, 'Product 2', 200);
  const mockPaymentMethod = new MockPaymentMethod();

  beforeEach(() => {
    service = new OrderService();
  });

  describe('createOrder', () => {
    it('when creating a new order, then should return the order with correct amount', () => {
      // Arrange
      const items = [mockProduct1, mockProduct2];
      const expectedAmount = 310; // 100 + 200 + 10 delivery

      // Act
      const result = service.createOrder('1', mockCustomer, items, mockPaymentMethod);

      // Assert
      expect(result).toBeInstanceOf(Order);
      expect(result.id).toBe('1');
      expect(result.customer).toBe(mockCustomer);
      expect(result.items).toEqual(items);
      expect(result.amount).toBe(expectedAmount);
      expect(result.paymentMethod).toBe(mockPaymentMethod);
      expect(result.paid).toBe(false);
    });

    it('when creating multiple orders, then should store all orders', () => {
      // Act
      service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
      service.createOrder('2', mockCustomer, [mockProduct2], mockPaymentMethod);

      // Assert
      expect(service.getAll()).toHaveLength(2);
    });
  });

  describe('getAll', () => {
    it('when no orders exist, then should return empty array', () => {
      // Act & Assert
      expect(service.getAll()).toEqual([]);
    });

    it('when getting all orders, then should return a copy of the array', () => {
      // Arrange
      service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
      const original = service.getAll();

      // Act
      original.push(new Order('2', mockCustomer, [mockProduct2], 210, mockPaymentMethod));
      const result = service.getAll();

      // Assert
      expect(result).toHaveLength(1);
    });
  });

  describe('findOrderById', () => {
    it('when order exists, then should return the order', () => {
      // Arrange
      const order = service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);

      // Act
      const result = service.findOrderById('1');

      // Assert
      expect(result).toEqual(order);
    });

    it('when order does not exist, then should return undefined', () => {
      // Act & Assert
      expect(service.findOrderById('999')).toBeUndefined();
    });
  });

  describe('payOrder', () => {
    it('when paying an unpaid order, then should mark as paid and return payment message', () => {
      // Arrange
      const order = service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);

      // Act
      const result = service.payOrder('1');

      // Assert
      expect(result).toBe('Mock payment for 110');
      expect(order.paid).toBe(true);
    });

    it('when paying a non-existent order, then should throw error', () => {
      // Act & Assert
      expect(() => service.payOrder('999')).toThrowError('Pedido com id 999 não foi encontrado.');
    });

    it('when paying an already paid order, then should throw error', () => {
      // Arrange
      service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
      service.payOrder('1');

      // Act & Assert
      expect(() => service.payOrder('1')).toThrowError('Pedido com ID 1 já foi pago.');
    });
  });

  describe('deleteOrderById', () => {
    it('when deleting an existing order, then should return true and remove order', () => {
      // Arrange
      service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);

      // Act
      const result = service.deleteOrderById('1');

      // Assert
      expect(result).toBe(true);
      expect(service.getAll()).toHaveLength(0);
    });

    it('when deleting a non-existent order, then should return false', () => {
      // Act & Assert
      expect(service.deleteOrderById('999')).toBe(false);
    });

    it('when deleting an order, then should not affect other orders', () => {
      // Arrange
      service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
      service.createOrder('2', mockCustomer, [mockProduct2], mockPaymentMethod);

      // Act
      service.deleteOrderById('1');

      // Assert
      expect(service.getAll()).toHaveLength(1);
      expect(service.findOrderById('2')).toBeDefined();
    });
  });

  describe('calculateTotal', () => {
    it('when calculating total with multiple items, then should include delivery cost', () => {
      // Arrange
      const items = [mockProduct1, mockProduct2];
      const expectedTotal = 310; // 100 + 200 + 10 delivery

      // Act
      const result = service['calculateTotal'](items, mockCustomer);

      // Assert
      expect(result).toBe(expectedTotal);
    });

    it('when calculating total with no items, then should return just delivery cost', () => {
      // Act & Assert
      expect(service['calculateTotal']([], mockCustomer)).toBe(10);
    });
  });

  describe('orderService instance', () => {
    it('when using shared instance, then should behave as expected', () => {
      // Act
      orderService.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
      const result = orderService.findOrderById('1');

      // Assert
      expect(result).toBeDefined();

      // Cleanup
      orderService.deleteOrderById('1');
    });
  });
});