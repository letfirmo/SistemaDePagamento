"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const CustomerService_1 = require("../CustomerService");
const Customer_1 = require("../../models/Customer");
const Region_1 = require("../../models/Region");
(0, vitest_1.describe)('CustomerService', () => {
    let service;
    const mockRegion = new Region_1.Region('1', 'North', 10);
    const mockCustomer1 = new Customer_1.Customer('1', 'John Doe', mockRegion);
    const mockCustomer2 = new Customer_1.Customer('2', 'Jane Smith', mockRegion);
    (0, vitest_1.beforeEach)(() => {
        service = new CustomerService_1.CustomerService();
    });
    (0, vitest_1.describe)('add', () => {
        (0, vitest_1.it)('when adding a new customer, then should store the customer', () => {
            // Act
            const result = service.add(mockCustomer1);
            // Assert
            (0, vitest_1.expect)(result).toBe(mockCustomer1);
            (0, vitest_1.expect)(service.getAll()).toHaveLength(1);
            (0, vitest_1.expect)(service.getAll()[0]).toEqual(mockCustomer1);
        });
        (0, vitest_1.it)('when adding a customer with existing ID, then should throw error', () => {
            // Arrange
            service.add(mockCustomer1);
            // Act & Assert
            (0, vitest_1.expect)(() => service.add(mockCustomer1)).toThrowError(`Cliente com ID ${mockCustomer1.id} já existe.`);
        });
    });
    (0, vitest_1.describe)('getAll', () => {
        (0, vitest_1.it)('when no customers are added, then should return empty array', () => {
            // Act
            const result = service.getAll();
            // Assert
            (0, vitest_1.expect)(result).toEqual([]);
            (0, vitest_1.expect)(result).toHaveLength(0);
        });
        (0, vitest_1.it)('when customers are added, then should return all customers', () => {
            // Arrange
            service.add(mockCustomer1);
            service.add(mockCustomer2);
            // Act
            const result = service.getAll();
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(2);
            (0, vitest_1.expect)(result).toContainEqual(mockCustomer1);
            (0, vitest_1.expect)(result).toContainEqual(mockCustomer2);
        });
        (0, vitest_1.it)('when getting all customers, then should return a copy of the array', () => {
            // Arrange
            service.add(mockCustomer1);
            const original = service.getAll();
            // Act
            original.push(mockCustomer2);
            const result = service.getAll();
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(1);
            (0, vitest_1.expect)(original).toHaveLength(2);
        });
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('when customer exists, then should return the customer', () => {
            // Arrange
            service.add(mockCustomer1);
            service.add(mockCustomer2);
            // Act
            const result = service.findById('1');
            // Assert
            (0, vitest_1.expect)(result).toEqual(mockCustomer1);
        });
        (0, vitest_1.it)('when customer does not exist, then should return undefined', () => {
            // Act
            const result = service.findById('999');
            // Assert
            (0, vitest_1.expect)(result).toBeUndefined();
        });
        (0, vitest_1.it)('when searching with empty string, then should return undefined', () => {
            // Arrange
            service.add(mockCustomer1);
            // Act
            const result = service.findById('');
            // Assert
            (0, vitest_1.expect)(result).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('customerService instance', () => {
        (0, vitest_1.it)('when using shared instance, then should behave as expected', () => {
            // Act
            CustomerService_1.customerService.add(mockCustomer1);
            const result = CustomerService_1.customerService.findById('1');
            // Assert
            (0, vitest_1.expect)(result).toEqual(mockCustomer1);
            // Cleanup
            CustomerService_1.customerService.getAll().splice(0); // Clear the array
        });
    });
});
