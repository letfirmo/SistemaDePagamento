"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const product_1 = require("../product");
const Product_1 = require("../../models/Product");
(0, vitest_1.describe)('Products List', () => {
    (0, vitest_1.it)('when list is loaded, then should contain 5 products', () => {
        // Arrange
        const expectedLength = 5;
        // Act
        const result = product_1.products.length;
        // Assert
        (0, vitest_1.expect)(result).toBe(expectedLength);
    });
    (0, vitest_1.it)('when list is loaded, then all products should have valid properties', () => {
        // Act & Assert
        product_1.products.forEach(product => {
            (0, vitest_1.expect)(product).toBeInstanceOf(Product_1.Product);
            (0, vitest_1.expect)(product.id).toBeGreaterThan(0);
            (0, vitest_1.expect)(product.name.trim()).not.toBe('');
            (0, vitest_1.expect)(product.price).toBeGreaterThan(0);
        });
    });
    (0, vitest_1.it)('when list is loaded, then product names should be properly trimmed', () => {
        // Act & Assert
        product_1.products.forEach(product => {
            (0, vitest_1.expect)(product.name).toEqual(product.name.trim());
        });
    });
    (0, vitest_1.describe)('Product 1 - Sashimis', () => {
        (0, vitest_1.it)('when product is created, then should have correct properties', () => {
            // Arrange
            const sashimi = product_1.products[0];
            // Act & Assert
            (0, vitest_1.expect)(sashimi.id).toBe(1);
            (0, vitest_1.expect)(sashimi.name).toBe('Sashimis');
            (0, vitest_1.expect)(sashimi.price).toBe(50);
        });
    });
    (0, vitest_1.describe)('Product 2 - Barca de sushis', () => {
        (0, vitest_1.it)('when product is created, then should have correct properties', () => {
            // Arrange
            const sushiBoat = product_1.products[1];
            // Act & Assert
            (0, vitest_1.expect)(sushiBoat.id).toBe(2);
            (0, vitest_1.expect)(sushiBoat.name).toBe('Barca de sushis');
            (0, vitest_1.expect)(sushiBoat.price).toBe(189);
        });
    });
    (0, vitest_1.describe)('Product 3 - Salada de Polvo', () => {
        (0, vitest_1.it)('when product is created, then should have correct properties', () => {
            // Arrange
            const octopusSalad = product_1.products[2];
            // Act & Assert
            (0, vitest_1.expect)(octopusSalad.id).toBe(3);
            (0, vitest_1.expect)(octopusSalad.name).toBe('Salada de Polvo');
            (0, vitest_1.expect)(octopusSalad.price).toBe(80);
        });
    });
    (0, vitest_1.describe)('Product 4 - Temaki de Salmão Grelhado', () => {
        (0, vitest_1.it)('when product is created, then should have correct properties', () => {
            // Arrange
            const temaki = product_1.products[3];
            // Act & Assert
            (0, vitest_1.expect)(temaki.id).toBe(4);
            (0, vitest_1.expect)(temaki.name).toBe('Temaki de Salmão Grelhado');
            (0, vitest_1.expect)(temaki.price).toBe(46.99);
        });
    });
    (0, vitest_1.describe)('Product 5 - Temaki de Camarão', () => {
        (0, vitest_1.it)('when product is created, then should have correct properties', () => {
            // Arrange
            const temaki = product_1.products[4];
            // Act & Assert
            (0, vitest_1.expect)(temaki.id).toBe(5);
            (0, vitest_1.expect)(temaki.name).toBe('Temaki de Camarão');
            (0, vitest_1.expect)(temaki.price).toBe(40.80);
        });
    });
});
