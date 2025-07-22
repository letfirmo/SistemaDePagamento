import { describe, it, expect } from 'vitest';
import { Customer } from '../Customer';
import { Region } from '../Region';

describe('Customer', () => {
  // Helper function para criar uma Region válida
  const createValidRegion = () => new Region('1', 'Norte', 10);

  it('When created with valid parameters, then should instantiate correctly', () => {
    // Arrange
    const id = '1';
    const name = 'John Doe';
    const region = createValidRegion();

    // Act
    const customer = new Customer(id, name, region);

    // Assert
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBe(id);
    expect(customer.name).toBe(name);
    expect(customer.region).toBeInstanceOf(Region);
    expect(customer.region).toEqual(region);
  });
  

  it('When comparing two customers with same id, then should be considered equal', () => {
    // Arrange
    const id = '1';
    const customer1 = new Customer(id, 'John Doe', createValidRegion());
    const customer2 = new Customer(id, 'Jane Smith', new Region('2', 'Sul', 15));

    // Act
    const areEqual = customer1.id === customer2.id;

    // Assert
    expect(areEqual).toBe(true);
  });

  it('When comparing two customers with different ids, then should not be considered equal', () => {
    // Arrange
    const customer1 = new Customer('1', 'John Doe', createValidRegion());
    const customer2 = new Customer('2', 'John Doe', createValidRegion());

    // Act
    const areEqual = customer1.id === customer2.id;

    // Assert
    expect(areEqual).toBe(false);
  });
});