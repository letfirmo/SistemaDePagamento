import { describe, it, expect } from 'vitest';
import { customers } from '../customer';
import { Customer } from '../../models/Customer';

describe('Customers Module', () => {
  describe('When customers array is loaded, then it should', () => {
    it('contain exactly 10 customer instances', () => {
      // Arrange
      const expectedLength = 10;
      
      // Act
      const actualLength = customers.length;
      
      // Assert
      expect(actualLength).toBe(expectedLength);
      expect(customers.every(c => c instanceof Customer)).toBe(true);
    });

    it('have customers with valid ids', () => {
      // Arrange
      const expectedIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      
      // Act
      const actualIds = customers.map(c => c.id);
      
      // Assert
      expect(actualIds).toEqual(expectedIds);
    });

    it('have customers with non-empty names', () => {
      // Act & Assert
      customers.forEach(customer => {
        expect(customer.name).toBeDefined();
        expect(customer.name.trim().length).toBeGreaterThan(0);
      });
    });
  });
});