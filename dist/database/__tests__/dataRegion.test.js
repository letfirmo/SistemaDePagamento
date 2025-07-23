"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Region_1 = require("../../models/Region");
const regions_1 = require("../regions");
(0, vitest_1.describe)('Region Class', () => {
    (0, vitest_1.it)('When creating a new Region with valid parameters, then all properties should be correctly assigned', () => {
        // Arrange
        const id = '11';
        const name = 'New Region';
        const delivery = 12.5;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.id).toBe(id);
        (0, vitest_1.expect)(region.name).toBe(name);
        (0, vitest_1.expect)(region.delivery).toBe(delivery);
    });
    (0, vitest_1.it)('When creating a new Region with empty name, then name should be empty string', () => {
        // Arrange
        const id = '12';
        const name = '';
        const delivery = 10;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.name).toBe('');
    });
    (0, vitest_1.it)('When creating a new Region with zero delivery fee, then delivery should be zero', () => {
        // Arrange
        const id = '13';
        const name = 'Free Delivery';
        const delivery = 0;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.delivery).toBe(0);
    });
    (0, vitest_1.it)('When creating a new Region with negative delivery fee, then delivery should be negative', () => {
        // Arrange
        const id = '14';
        const name = 'Invalid Delivery';
        const delivery = -5;
        // Act
        const region = new Region_1.Region(id, name, delivery);
        // Assert
        (0, vitest_1.expect)(region.delivery).toBe(-5);
    });
});
(0, vitest_1.describe)('Regions List', () => {
    (0, vitest_1.it)('When accessing regions list, then it should contain 10 predefined regions', () => {
        // Arrange & Act
        const regionsCount = regions_1.regions.length;
        // Assert
        (0, vitest_1.expect)(regionsCount).toBe(10);
    });
    (0, vitest_1.it)('When checking first region in list, then it should be Brotas with delivery fee 12.8', () => {
        // Arrange & Act
        const firstRegion = regions_1.regions[0];
        // Assert
        (0, vitest_1.expect)(firstRegion.id).toBe('1');
        (0, vitest_1.expect)(firstRegion.name).toBe('Brotas');
        (0, vitest_1.expect)(firstRegion.delivery).toBe(12.8);
    });
    (0, vitest_1.it)('When checking last region in list, then it should be São Caetano with delivery fee 19', () => {
        // Arrange & Act
        const lastRegion = regions_1.regions[regions_1.regions.length - 1];
        // Assert
        (0, vitest_1.expect)(lastRegion.id).toBe('10');
        (0, vitest_1.expect)(lastRegion.name).toBe('São Caetano');
        (0, vitest_1.expect)(lastRegion.delivery).toBe(19);
    });
    (0, vitest_1.it)('When checking all regions, then each should be an instance of Region class', () => {
        // Arrange & Act
        const allAreRegions = regions_1.regions.every(region => region instanceof Region_1.Region);
        // Assert
        (0, vitest_1.expect)(allAreRegions).toBe(true);
    });
    (0, vitest_1.it)('When checking regions list, then delivery fees should be in expected range (10-20)', () => {
        // Arrange & Act
        const deliveryFees = regions_1.regions.map(region => region.delivery);
        const allInRange = deliveryFees.every(fee => fee >= 10 && fee <= 20);
        // Assert
        (0, vitest_1.expect)(allInRange).toBe(true);
    });
});
