"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ReportService_1 = require("../ReportService");
const Order_1 = require("../../models/Order");
const Customer_1 = require("../../models/Customer");
const Region_1 = require("../../models/Region");
const Product_1 = require("../../models/Product");
const PaymentMethod_1 = require("../../models/PaymentMethod");
// Mock para PaymentMethod para simplificar os testes
class MockPaymentMethod extends PaymentMethod_1.PaymentMethod {
    pay(amount) {
        return `Paid ${amount} with mock`;
    }
}
(0, vitest_1.describe)('ReportService', () => {
    const mockCustomer = new Customer_1.Customer('1', 'John Doe', new Region_1.Region('1', 'North', 10));
    const mockProduct1 = new Product_1.Product(1, 'Product 1', 100);
    const mockProduct2 = new Product_1.Product(2, 'Product 2', 200);
    const mockPaymentMethod = new MockPaymentMethod();
    (0, vitest_1.describe)('generateDailyReport', () => {
        (0, vitest_1.it)('when there are no orders, then should return report with zeros', () => {
            // Arrange
            const orders = [];
            // Act
            const result = ReportService_1.ReportService.generateDailyReport(orders);
            // Assert
            (0, vitest_1.expect)(result).toContain('Total de pedidos: 0');
            (0, vitest_1.expect)(result).toContain('Pedidos pagos: 0');
            (0, vitest_1.expect)(result).toContain('Pedidos não pagos: 0');
            (0, vitest_1.expect)(result).toContain('Valor total arrecadado: R$ 0.00');
        });
        (0, vitest_1.it)('when there are only paid orders, then should report all as paid', () => {
            // Arrange
            const order1 = new Order_1.Order('1', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
            const order2 = new Order_1.Order('2', mockCustomer, [mockProduct2], 200, mockPaymentMethod);
            order1.paid = true;
            order2.paid = true;
            const orders = [order1, order2];
            // Act
            const result = ReportService_1.ReportService.generateDailyReport(orders);
            // Assert
            (0, vitest_1.expect)(result).toContain('Total de pedidos: 2');
            (0, vitest_1.expect)(result).toContain('Pedidos pagos: 2');
            (0, vitest_1.expect)(result).toContain('Pedidos não pagos: 0');
            (0, vitest_1.expect)(result).toContain('Valor total arrecadado: R$ 300.00');
        });
        (0, vitest_1.it)('when there are only unpaid orders, then should report all as unpaid', () => {
            // Arrange
            const order1 = new Order_1.Order('1', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
            const order2 = new Order_1.Order('2', mockCustomer, [mockProduct1, mockProduct2], 300, mockPaymentMethod);
            const orders = [order1, order2];
            // Act
            const result = ReportService_1.ReportService.generateDailyReport(orders);
            // Assert
            (0, vitest_1.expect)(result).toContain('Total de pedidos: 2');
            (0, vitest_1.expect)(result).toContain('Pedidos pagos: 0');
            (0, vitest_1.expect)(result).toContain('Pedidos não pagos: 2');
            (0, vitest_1.expect)(result).toContain('Valor total arrecadado: R$ 400.00');
        });
        (0, vitest_1.it)('when there are mixed paid and unpaid orders, then should report correct counts', () => {
            // Arrange
            const order1 = new Order_1.Order('1', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
            const order2 = new Order_1.Order('2', mockCustomer, [mockProduct2], 200, mockPaymentMethod);
            const order3 = new Order_1.Order('3', mockCustomer, [mockProduct1, mockProduct2], 300, mockPaymentMethod);
            order1.paid = true;
            order3.paid = true;
            const orders = [order1, order2, order3];
            // Act
            const result = ReportService_1.ReportService.generateDailyReport(orders);
            // Assert
            (0, vitest_1.expect)(result).toContain('Total de pedidos: 3');
            (0, vitest_1.expect)(result).toContain('Pedidos pagos: 2');
            (0, vitest_1.expect)(result).toContain('Pedidos não pagos: 1');
            (0, vitest_1.expect)(result).toContain('Valor total arrecadado: R$ 600.00');
        });
        (0, vitest_1.it)('when orders have decimal amounts, then should format total correctly', () => {
            // Arrange
            const productWithDecimal = new Product_1.Product(3, 'Product 3', 49.99);
            const order1 = new Order_1.Order('1', mockCustomer, [productWithDecimal], 49.99, mockPaymentMethod);
            const order2 = new Order_1.Order('2', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
            order1.paid = true;
            const orders = [order1, order2];
            // Act
            const result = ReportService_1.ReportService.generateDailyReport(orders);
            // Assert
            (0, vitest_1.expect)(result).toContain('Valor total arrecadado: R$ 149.99');
        });
    });
    (0, vitest_1.describe)('calculateTotal', () => {
        (0, vitest_1.it)('when orders array is empty, then should return 0', () => {
            // Arrange
            const orders = [];
            // Act
            const result = ReportService_1.ReportService['calculateTotal'](orders);
            // Assert
            (0, vitest_1.expect)(result).toBe(0);
        });
        (0, vitest_1.it)('when there are multiple orders, then should return sum of amounts', () => {
            // Arrange
            const order1 = new Order_1.Order('1', mockCustomer, [mockProduct1], 100, mockPaymentMethod);
            const order2 = new Order_1.Order('2', mockCustomer, [mockProduct2], 200, mockPaymentMethod);
            const orders = [order1, order2];
            // Act
            const result = ReportService_1.ReportService['calculateTotal'](orders);
            // Assert
            (0, vitest_1.expect)(result).toBe(300);
        });
    });
});
