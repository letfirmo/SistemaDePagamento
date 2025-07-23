"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const OrderService_1 = require("../OrderService");
const Order_1 = require("../../models/Order");
const Customer_1 = require("../../models/Customer");
const Product_1 = require("../../models/Product");
const PaymentMethod_1 = require("../../models/PaymentMethod");
const Region_1 = require("../../models/Region");
// Mock implementation for testing
class MockPaymentMethod extends PaymentMethod_1.PaymentMethod {
    pay(amount) {
        return `Mock payment for ${amount}`;
    }
}
(0, vitest_1.describe)('OrderService', () => {
    let service;
    const mockRegion = new Region_1.Region('1', 'North', 10);
    const mockCustomer = new Customer_1.Customer('1', 'John Doe', mockRegion);
    const mockProduct1 = new Product_1.Product(1, 'Product 1', 100);
    const mockProduct2 = new Product_1.Product(2, 'Product 2', 200);
    const mockPaymentMethod = new MockPaymentMethod();
    (0, vitest_1.beforeEach)(() => {
        service = new OrderService_1.OrderService();
    });
    (0, vitest_1.describe)('createOrder', () => {
        (0, vitest_1.it)('when creating a new order, then should return the order with correct amount', () => {
            // Arrange
            const items = [mockProduct1, mockProduct2];
            const expectedAmount = 310; // 100 + 200 + 10 delivery
            // Act
            const result = service.createOrder('1', mockCustomer, items, mockPaymentMethod);
            // Assert
            (0, vitest_1.expect)(result).toBeInstanceOf(Order_1.Order);
            (0, vitest_1.expect)(result.id).toBe('1');
            (0, vitest_1.expect)(result.customer).toBe(mockCustomer);
            (0, vitest_1.expect)(result.items).toEqual(items);
            (0, vitest_1.expect)(result.amount).toBe(expectedAmount);
            (0, vitest_1.expect)(result.paymentMethod).toBe(mockPaymentMethod);
            (0, vitest_1.expect)(result.paid).toBe(false);
        });
        (0, vitest_1.it)('when creating multiple orders, then should store all orders', () => {
            // Act
            service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
            service.createOrder('2', mockCustomer, [mockProduct2], mockPaymentMethod);
            // Assert
            (0, vitest_1.expect)(service.getAll()).toHaveLength(2);
        });
    });
    (0, vitest_1.describe)('getAll', () => {
        (0, vitest_1.it)('when no orders exist, then should return empty array', () => {
            // Act & Assert
            (0, vitest_1.expect)(service.getAll()).toEqual([]);
        });
        (0, vitest_1.it)('when getting all orders, then should return a copy of the array', () => {
            // Arrange
            service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
            const original = service.getAll();
            // Act
            original.push(new Order_1.Order('2', mockCustomer, [mockProduct2], 210, mockPaymentMethod));
            const result = service.getAll();
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(1);
        });
    });
    (0, vitest_1.describe)('findOrderById', () => {
        (0, vitest_1.it)('when order exists, then should return the order', () => {
            // Arrange
            const order = service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
            // Act
            const result = service.findOrderById('1');
            // Assert
            (0, vitest_1.expect)(result).toEqual(order);
        });
        (0, vitest_1.it)('when order does not exist, then should return undefined', () => {
            // Act & Assert
            (0, vitest_1.expect)(service.findOrderById('999')).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('payOrder', () => {
        (0, vitest_1.it)('when paying an unpaid order, then should mark as paid and return payment message', () => {
            // Arrange
            const order = service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
            // Act
            const result = service.payOrder('1');
            // Assert
            (0, vitest_1.expect)(result).toBe('Mock payment for 110');
            (0, vitest_1.expect)(order.paid).toBe(true);
        });
        (0, vitest_1.it)('when paying a non-existent order, then should throw error', () => {
            // Act & Assert
            (0, vitest_1.expect)(() => service.payOrder('999')).toThrowError('Pedido com id 999 não foi encontrado.');
        });
        (0, vitest_1.it)('when paying an already paid order, then should throw error', () => {
            // Arrange
            service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
            service.payOrder('1');
            // Act & Assert
            (0, vitest_1.expect)(() => service.payOrder('1')).toThrowError('Pedido com ID 1 já foi pago.');
        });
    });
    (0, vitest_1.describe)('deleteOrderById', () => {
        (0, vitest_1.it)('when deleting an existing order, then should return true and remove order', () => {
            // Arrange
            service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
            // Act
            const result = service.deleteOrderById('1');
            // Assert
            (0, vitest_1.expect)(result).toBe(true);
            (0, vitest_1.expect)(service.getAll()).toHaveLength(0);
        });
        (0, vitest_1.it)('when deleting a non-existent order, then should return false', () => {
            // Act & Assert
            (0, vitest_1.expect)(service.deleteOrderById('999')).toBe(false);
        });
        (0, vitest_1.it)('when deleting an order, then should not affect other orders', () => {
            // Arrange
            service.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
            service.createOrder('2', mockCustomer, [mockProduct2], mockPaymentMethod);
            // Act
            service.deleteOrderById('1');
            // Assert
            (0, vitest_1.expect)(service.getAll()).toHaveLength(1);
            (0, vitest_1.expect)(service.findOrderById('2')).toBeDefined();
        });
    });
    (0, vitest_1.describe)('calculateTotal', () => {
        (0, vitest_1.it)('when calculating total with multiple items, then should include delivery cost', () => {
            // Arrange
            const items = [mockProduct1, mockProduct2];
            const expectedTotal = 310; // 100 + 200 + 10 delivery
            // Act
            const result = service['calculateTotal'](items, mockCustomer);
            // Assert
            (0, vitest_1.expect)(result).toBe(expectedTotal);
        });
        (0, vitest_1.it)('when calculating total with no items, then should return just delivery cost', () => {
            // Act & Assert
            (0, vitest_1.expect)(service['calculateTotal']([], mockCustomer)).toBe(10);
        });
    });
    (0, vitest_1.describe)('orderService instance', () => {
        (0, vitest_1.it)('when using shared instance, then should behave as expected', () => {
            // Act
            OrderService_1.orderService.createOrder('1', mockCustomer, [mockProduct1], mockPaymentMethod);
            const result = OrderService_1.orderService.findOrderById('1');
            // Assert
            (0, vitest_1.expect)(result).toBeDefined();
            // Cleanup
            OrderService_1.orderService.deleteOrderById('1');
        });
    });
});
