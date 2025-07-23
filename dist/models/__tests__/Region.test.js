"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Region_1 = require("../Region");
(0, vitest_1.describe)('Region', () => {
    (0, vitest_1.it)('When creating a valid region, then all properties should be set correctly', () => {
        // Arrange
        const id = '1';
        const name = 'North';
        const delivery = 10.5;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.id).toBe(id);
        (0, vitest_1.expect)(region.name).toBe(name);
        (0, vitest_1.expect)(region.delivery).toBe(delivery);
    });
    (0, vitest_1.it)('When creating a region with empty id, then id should be empty', () => {
        // Arrange
        const id = '';
        const name = 'South';
        const delivery = 8.0;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.id).toBe('');
        (0, vitest_1.expect)(region.name).toBe(name);
        (0, vitest_1.expect)(region.delivery).toBe(delivery);
    });
    (0, vitest_1.it)('When creating a region with negative delivery, then delivery should be negative', () => {
        // Arrange
        const id = '3';
        const name = 'West';
        const delivery = -5.0;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.id).toBe(id);
        (0, vitest_1.expect)(region.name).toBe(name);
        (0, vitest_1.expect)(region.delivery).toBe(delivery);
    });
    (0, vitest_1.it)('When creating a region with zero delivery, then delivery should be zero', () => {
        // Arrange
        const id = '4';
        const name = 'East';
        const delivery = 0;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.id).toBe(id);
        (0, vitest_1.expect)(region.name).toBe(name);
        (0, vitest_1.expect)(region.delivery).toBe(0);
    });
    (0, vitest_1.it)('When creating a region with long name, then name should be preserved', () => {
        // Arrange
        const id = '5';
        const name = 'Very Long Region Name With Many Characters';
        const delivery = 12.75;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.id).toBe(id);
        (0, vitest_1.expect)(region.name).toBe(name);
        (0, vitest_1.expect)(region.delivery).toBe(delivery);
    });
});
