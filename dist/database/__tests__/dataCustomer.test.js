"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const customer_1 = require("../customer");
const Customer_1 = require("../../models/Customer");
(0, vitest_1.describe)('Customers Module', () => {
    (0, vitest_1.describe)('When customers array is loaded, then it should', () => {
        (0, vitest_1.it)('contain exactly 10 customer instances', () => {
            // Arrange
            const expectedLength = 10;
            // Act
            const actualLength = customer_1.customers.length;
            // Assert
            (0, vitest_1.expect)(actualLength).toBe(expectedLength);
            (0, vitest_1.expect)(customer_1.customers.every(c => c instanceof Customer_1.Customer)).toBe(true);
        });
        (0, vitest_1.it)('have customers with valid ids', () => {
            // Arrange
            const expectedIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
            // Act
            const actualIds = customer_1.customers.map(c => c.id);
            // Assert
            (0, vitest_1.expect)(actualIds).toEqual(expectedIds);
        });
        (0, vitest_1.it)('have customers with non-empty names', () => {
            // Act & Assert
            customer_1.customers.forEach(customer => {
                (0, vitest_1.expect)(customer.name).toBeDefined();
                (0, vitest_1.expect)(customer.name.trim().length).toBeGreaterThan(0);
            });
        });
    });
});
