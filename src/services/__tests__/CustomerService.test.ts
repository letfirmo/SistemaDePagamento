import { describe, it, expect, beforeEach } from 'vitest';
import { CustomerService, customerService } from '../CustomerService';
import { Customer } from '../../models/Customer';
import { Region } from '../../models/Region';

describe('CustomerService', () => {
  let service: CustomerService;
  const mockRegion = new Region('1', 'North', 10);
  const mockCustomer1 = new Customer('1', 'John Doe', mockRegion);
  const mockCustomer2 = new Customer('2', 'Jane Smith', mockRegion);

  beforeEach(() => {
    service = new CustomerService();
  });

  describe('add', () => {
    it('when adding a new customer, then should store the customer', () => {
      // Act
      const result = service.add(mockCustomer1);

      // Assert
      expect(result).toBe(mockCustomer1);
      expect(service.getAll()).toHaveLength(1);
      expect(service.getAll()[0]).toEqual(mockCustomer1);
    });

    it('when adding a customer with existing ID, then should throw error', () => {
      // Arrange
      service.add(mockCustomer1);

      // Act & Assert
      expect(() => service.add(mockCustomer1)).toThrowError(
        `Cliente com ID ${mockCustomer1.id} já existe.`
      );
    });
  });

  describe('getAll', () => {
    it('when no customers are added, then should return empty array', () => {
      // Act
      const result = service.getAll();

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('when customers are added, then should return all customers', () => {
      // Arrange
      service.add(mockCustomer1);
      service.add(mockCustomer2);

      // Act
      const result = service.getAll();

      // Assert
      expect(result).toHaveLength(2);
      expect(result).toContainEqual(mockCustomer1);
      expect(result).toContainEqual(mockCustomer2);
    });

    it('when getting all customers, then should return a copy of the array', () => {
      // Arrange
      service.add(mockCustomer1);
      const original = service.getAll();

      // Act
      original.push(mockCustomer2);
      const result = service.getAll();

      // Assert
      expect(result).toHaveLength(1);
      expect(original).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('when customer exists, then should return the customer', () => {
      // Arrange
      service.add(mockCustomer1);
      service.add(mockCustomer2);

      // Act
      const result = service.findById('1');

      // Assert
      expect(result).toEqual(mockCustomer1);
    });

    it('when customer does not exist, then should return undefined', () => {
      // Act
      const result = service.findById('999');

      // Assert
      expect(result).toBeUndefined();
    });

    it('when searching with empty string, then should return undefined', () => {
      // Arrange
      service.add(mockCustomer1);

      // Act
      const result = service.findById('');

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('customerService instance', () => {
    it('when using shared instance, then should behave as expected', () => {
      // Act
      customerService.add(mockCustomer1);
      const result = customerService.findById('1');

      // Assert
      expect(result).toEqual(mockCustomer1);

      // Cleanup
      customerService.getAll().splice(0); // Clear the array
    });
  });
});