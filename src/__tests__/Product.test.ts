import { describe, it, expect } from 'vitest';
import { Product } from '../models/Product';

describe('Product', () => {
  describe('When creating a product with valid data', () => {
    it('then should create a product instance with correct properties', () => {
      // Arrange
      const id = 1;
      const name = 'Valid Product';
      const price = 10.99;

      // Act
      const product = new Product(id, name, price);

      // Assert
      expect(product).toBeInstanceOf(Product);
      expect(product.id).toBe(id);
      expect(product.name).toBe(name);
      expect(product.price).toBe(price);
    });
  });

  describe('When creating a product with negative price', () => {
    it('then should throw an error', () => {
      // Arrange
      const id = 2;
      const name = 'Invalid Price Product';
      const price = -5.99;

      // Act & Assert
      expect(() => new Product(id, name, price)).toThrowError(
        'O preço do produto não pode ser negativo.'
      );
    });
  });

  describe('When creating a product with empty name', () => {
    it('then should throw an error for empty string', () => {
      // Arrange
      const id = 3;
      const name = '';
      const price = 15.99;

      // Act & Assert
      expect(() => new Product(id, name, price)).toThrowError(
        'O nome do produto não pode ser vazio.'
      );
    });

    it('then should throw an error for whitespace-only string', () => {
      // Arrange
      const id = 4;
      const name = '   ';
      const price = 20.99;

      // Act & Assert
      expect(() => new Product(id, name, price)).toThrowError(
        'O nome do produto não pode ser vazio.'
      );
    });
  });

  describe('When creating a product with zero price', () => {
    it('then should create the product successfully', () => {
      // Arrange
      const id = 5;
      const name = 'Free Product';
      const price = 0;

      // Act
      const product = new Product(id, name, price);

      // Assert
      expect(product).toBeInstanceOf(Product);
      expect(product.price).toBe(0);
    });
  });

  describe('When creating a product with minimal valid name', () => {
    it('then should create the product successfully', () => {
      // Arrange
      const id = 6;
      const name = 'a';
      const price = 1.99;

      // Act
      const product = new Product(id, name, price);

      // Assert
      expect(product).toBeInstanceOf(Product);
      expect(product.name).toBe('a');
    });
  });
});