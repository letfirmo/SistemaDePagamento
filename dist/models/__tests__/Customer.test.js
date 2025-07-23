"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Customer_1 = require("../Customer");
const Region_1 = require("../Region");
(0, vitest_1.describe)('Customer', () => {
    // Helper function para criar uma Region válida
    const createValidRegion = () => new Region_1.Region('1', 'Norte', 10);
    (0, vitest_1.it)('When created with valid parameters, then should instantiate correctly', () => {
        // Arrange
        const id = '1';
        const name = 'John Doe';
        const region = createValidRegion();
        // Act
        const customer = new Customer_1.Customer(id, name, region);
        // Assert
        (0, vitest_1.expect)(customer).toBeInstanceOf(Customer_1.Customer);
        (0, vitest_1.expect)(customer.id).toBe(id);
        (0, vitest_1.expect)(customer.name).toBe(name);
        (0, vitest_1.expect)(customer.region).toBeInstanceOf(Region_1.Region);
        (0, vitest_1.expect)(customer.region).toEqual(region);
    });
    (0, vitest_1.it)('When comparing two customers with same id, then should be considered equal', () => {
        // Arrange
        const id = '1';
        const customer1 = new Customer_1.Customer(id, 'John Doe', createValidRegion());
        const customer2 = new Customer_1.Customer(id, 'Jane Smith', new Region_1.Region('2', 'Sul', 15));
        // Act
        const areEqual = customer1.id === customer2.id;
        // Assert
        (0, vitest_1.expect)(areEqual).toBe(true);
    });
    (0, vitest_1.it)('When comparing two customers with different ids, then should not be considered equal', () => {
        // Arrange
        const customer1 = new Customer_1.Customer('1', 'John Doe', createValidRegion());
        const customer2 = new Customer_1.Customer('2', 'John Doe', createValidRegion());
        // Act
        const areEqual = customer1.id === customer2.id;
        // Assert
        (0, vitest_1.expect)(areEqual).toBe(false);
    });
});
