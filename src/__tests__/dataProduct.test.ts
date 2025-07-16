import { describe, it, expect } from 'vitest';
import { Product } from '../models/Product';
import { products } from '../database/product';

describe('Product Entity', () => {
  describe('When creating a valid product', () => {
    it('then should create a product with correct properties', () => {
      // Arrange
      const id = 1;
      const name = 'Notebook';
      const price = 3500;

      // Act
      const product = new Product(id, name, price);

      // Assert
      expect(product).toBeInstanceOf(Product);
      expect(product.id).toBe(id);
      expect(product.name).toBe(name);
      expect(product.price).toBe(price);
    });

    it('then should allow decimal prices', () => {
      // Arrange
      const decimalPrice = 899.99;

      // Act
      const product = new Product(4, 'Monitor 24"', decimalPrice);

      // Assert
      expect(product.price).toBe(decimalPrice);
    });
  });

  describe('When creating a product with invalid price', () => {
    it('then should throw error for negative price', () => {
      // Arrange
      const negativePrice = -100;

      // Act & Assert
      expect(() => new Product(1, 'Notebook', negativePrice)).toThrowError(
        'O preço do produto não pode ser negativo.'
      );
    });
  });

  describe('When creating a product with invalid name', () => {
    it('then should throw error for empty name', () => {
      // Arrange
      const emptyName = '';

      // Act & Assert
      expect(() => new Product(1, emptyName, 3500)).toThrowError(
        'O nome do produto não pode ser vazio.'
      );
    });

    it('then should throw error for whitespace-only name', () => {
      // Arrange
      const whitespaceName = '   ';

      // Act & Assert
      expect(() => new Product(1, whitespaceName, 3500)).toThrowError(
        'O nome do produto não pode ser vazio.'
      );
    });
  });

  describe('Products List', () => {
    it('then should contain predefined products', () => {
      // Arrange
      const expectedProducts = [
        { id: 1, name: 'Notebook', price: 3500 },
        { id: 2, name: 'Teclado Mecânico', price: 450 },
        { id: 3, name: 'Mouse Gamer', price: 230 },
        { id: 4, name: 'Monitor 24"', price: 899.99 },
        { id: 5, name: 'Headset', price: 329.5 },
      ];

      // Act & Assert
      expect(products.length).toBe(expectedProducts.length);
      
      products.forEach((product, index) => {
        expect(product).toBeInstanceOf(Product);
        expect(product.id).toBe(expectedProducts[index].id);
        expect(product.name).toBe(expectedProducts[index].name);
        expect(product.price).toBe(expectedProducts[index].price);
      });
    });

    it('then all products should have valid prices', () => {
      // Act & Assert
      products.forEach(product => {
        expect(product.price).toBeGreaterThan(0);
      });
    });

    it('then all products should have valid names', () => {
      // Act & Assert
      products.forEach(product => {
        expect(product.name.trim()).not.toBe('');
      });
    });
  });
});