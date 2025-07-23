"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Product_1 = require("../Product");
(0, vitest_1.describe)('Product', () => {
    (0, vitest_1.describe)('When creating a product with valid data', () => {
        (0, vitest_1.it)('then should create a product instance with correct properties', () => {
            // Arrange
            const id = 1;
            const name = 'Valid Product';
            const price = 10.99;
            // Act
            const product = new Product_1.Product(id, name, price);
            // Assert
            (0, vitest_1.expect)(product).toBeInstanceOf(Product_1.Product);
            (0, vitest_1.expect)(product.id).toBe(id);
            (0, vitest_1.expect)(product.name).toBe(name);
            (0, vitest_1.expect)(product.price).toBe(price);
        });
    });
    (0, vitest_1.describe)('When creating a product with negative price', () => {
        (0, vitest_1.it)('then should throw an error', () => {
            // Arrange
            const id = 2;
            const name = 'Invalid Price Product';
            const price = -5.99;
            // Act & Assert
            (0, vitest_1.expect)(() => new Product_1.Product(id, name, price)).toThrowError('O preço do produto não pode ser negativo.');
        });
    });
    (0, vitest_1.describe)('When creating a product with empty name', () => {
        (0, vitest_1.it)('then should throw an error for empty string', () => {
            // Arrange
            const id = 3;
            const name = '';
            const price = 15.99;
            // Act & Assert
            (0, vitest_1.expect)(() => new Product_1.Product(id, name, price)).toThrowError('O nome do produto não pode ser vazio.');
        });
        (0, vitest_1.it)('then should throw an error for whitespace-only string', () => {
            // Arrange
            const id = 4;
            const name = '   ';
            const price = 20.99;
            // Act & Assert
            (0, vitest_1.expect)(() => new Product_1.Product(id, name, price)).toThrowError('O nome do produto não pode ser vazio.');
        });
    });
    (0, vitest_1.describe)('When creating a product with zero price', () => {
        (0, vitest_1.it)('then should create the product successfully', () => {
            // Arrange
            const id = 5;
            const name = 'Free Product';
            const price = 0;
            // Act
            const product = new Product_1.Product(id, name, price);
            // Assert
            (0, vitest_1.expect)(product).toBeInstanceOf(Product_1.Product);
            (0, vitest_1.expect)(product.price).toBe(0);
        });
    });
    (0, vitest_1.describe)('When creating a product with minimal valid name', () => {
        (0, vitest_1.it)('then should create the product successfully', () => {
            // Arrange
            const id = 6;
            const name = 'a';
            const price = 1.99;
            // Act
            const product = new Product_1.Product(id, name, price);
            // Assert
            (0, vitest_1.expect)(product).toBeInstanceOf(Product_1.Product);
            (0, vitest_1.expect)(product.name).toBe('a');
        });
    });
});
