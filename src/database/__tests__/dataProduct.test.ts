import { describe, it, expect } from 'vitest';
import { products } from '../product';
import { Product } from '../../models/Product';

describe('Products List', () => {
  it('when list is loaded, then should contain 5 products', () => {
    // Arrange
    const expectedLength = 5;

    // Act
    const result = products.length;

    // Assert
    expect(result).toBe(expectedLength);
  });

  it('when list is loaded, then all products should have valid properties', () => {
    // Act & Assert
    products.forEach(product => {
      expect(product).toBeInstanceOf(Product);
      expect(product.id).toBeGreaterThan(0);
      expect(product.name.trim()).not.toBe('');
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it('when list is loaded, then product names should be properly trimmed', () => {
    // Act & Assert
    products.forEach(product => {
      expect(product.name).toEqual(product.name.trim());
    });
  });

  describe('Product 1 - Sashimis', () => {
    it('when product is created, then should have correct properties', () => {
      // Arrange
      const sashimi = products[0];

      // Act & Assert
      expect(sashimi.id).toBe(1);
      expect(sashimi.name).toBe('Sashimis');
      expect(sashimi.price).toBe(50);
    });
  });

  describe('Product 2 - Barca de sushis', () => {
    it('when product is created, then should have correct properties', () => {
      // Arrange
      const sushiBoat = products[1];

      // Act & Assert
      expect(sushiBoat.id).toBe(2);
      expect(sushiBoat.name).toBe('Barca de sushis');
      expect(sushiBoat.price).toBe(189);
    });
  });

  describe('Product 3 - Salada de Polvo', () => {
    it('when product is created, then should have correct properties', () => {
      // Arrange
      const octopusSalad = products[2];

      // Act & Assert
      expect(octopusSalad.id).toBe(3);
      expect(octopusSalad.name).toBe('Salada de Polvo');
      expect(octopusSalad.price).toBe(80);
    });
  });

  describe('Product 4 - Temaki de Salmão Grelhado', () => {
    it('when product is created, then should have correct properties', () => {
      // Arrange
      const temaki = products[3];

      // Act & Assert
      expect(temaki.id).toBe(4);
      expect(temaki.name).toBe('Temaki de Salmão Grelhado');
      expect(temaki.price).toBe(46.99);
    });
  });

  describe('Product 5 - Temaki de Camarão', () => {
    it('when product is created, then should have correct properties', () => {
      // Arrange
      const temaki = products[4];

      // Act & Assert
      expect(temaki.id).toBe(5);
      expect(temaki.name).toBe('Temaki de Camarão');
      expect(temaki.price).toBe(40.80);
    });
  });
});