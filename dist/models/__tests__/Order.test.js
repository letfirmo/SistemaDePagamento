"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Order_1 = require("../Order");
const PaymentMethod_1 = require("../PaymentMethod");
const Customer_1 = require("../Customer");
const Product_1 = require("../Product");
const Region_1 = require("../Region");
// Implementação concreta para teste
class CreditCardPayment extends PaymentMethod_1.PaymentMethod {
    pay(amount) {
        return `Paid ${amount} with Credit Card`;
    }
}
class PixPayment extends PaymentMethod_1.PaymentMethod {
    pay(amount) {
        return `Paid ${amount} with PIX`;
    }
}
(0, vitest_1.describe)('Order', () => {
    let mockCustomer;
    let mockProduct1;
    let mockProduct2;
    let mockRegion;
    let creditCardPayment;
    let pixPayment;
    (0, vitest_1.beforeEach)(() => {
        mockRegion = new Region_1.Region('region-1', 'North', 10);
        mockCustomer = new Customer_1.Customer('customer-1', 'John Doe', mockRegion);
        mockProduct1 = new Product_1.Product(1, 'Product 1', 100);
        mockProduct2 = new Product_1.Product(2, 'Product 2', 200);
        creditCardPayment = new CreditCardPayment();
        pixPayment = new PixPayment();
    });
    (0, vitest_1.describe)('When creating a new order, then it should initialize with correct values', () => {
        (0, vitest_1.it)('should initialize with default paid status as false', () => {
            // Arrange
            const items = [mockProduct1, mockProduct2];
            const amount = 300;
            // Act
            const order = new Order_1.Order('order-1', mockCustomer, items, amount, creditCardPayment);
            // Assert
            (0, vitest_1.expect)(order.paid).toBe(false);
        });
        (0, vitest_1.it)('should initialize with provided values', () => {
            // Arrange
            const id = 'order-1';
            const items = [mockProduct1, mockProduct2];
            const amount = 300;
            // Act
            const order = new Order_1.Order(id, mockCustomer, items, amount, pixPayment);
            // Assert
            (0, vitest_1.expect)(order.id).toBe(id);
            (0, vitest_1.expect)(order.customer).toBe(mockCustomer);
            (0, vitest_1.expect)(order.items).toEqual(items);
            (0, vitest_1.expect)(order.amount).toBe(amount);
            (0, vitest_1.expect)(order.paymentMethod).toBeInstanceOf(PaymentMethod_1.PaymentMethod);
        });
    });
    (0, vitest_1.describe)('When checking order properties, then they should be correct', () => {
        (0, vitest_1.it)('should have correct property types', () => {
            // Arrange
            const items = [mockProduct1];
            const amount = 100;
            // Act
            const order = new Order_1.Order('order-1', mockCustomer, items, amount, pixPayment);
            // Assert
            (0, vitest_1.expect)(typeof order.id).toBe('string');
            (0, vitest_1.expect)(order.customer).toBeInstanceOf(Customer_1.Customer);
            (0, vitest_1.expect)(Array.isArray(order.items)).toBe(true);
            (0, vitest_1.expect)(order.items[0]).toBeInstanceOf(Product_1.Product);
            (0, vitest_1.expect)(typeof order.amount).toBe('number');
            (0, vitest_1.expect)(order.paymentMethod).toBeInstanceOf(PaymentMethod_1.PaymentMethod);
            (0, vitest_1.expect)(typeof order.paid).toBe('boolean');
        });
    });
});
