"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const RegionService_1 = require("../RegionService");
const Region_1 = require("../../models/Region");
const regions_1 = require("../../database/regions");
(0, vitest_1.describe)('RegionService', () => {
    let service;
    const initialRegionCount = regions_1.regions.length;
    const mockRegion = new Region_1.Region('11', 'Novo Bairro', 15.5);
    // Cria uma cópia fresca das regiões para cada teste
    (0, vitest_1.beforeEach)(() => {
        service = new RegionService_1.RegionService();
        // Reseta o array de regiões para o estado inicial
        service['regions'] = [...regions_1.regions];
    });
    // Limpa a instância compartilhada após cada teste
    (0, vitest_1.afterEach)(() => {
        RegionService_1.regionService['regions'] = [...regions_1.regions];
    });
    (0, vitest_1.describe)('add', () => {
        (0, vitest_1.it)('when adding a new region, then should store the region', () => {
            // Act
            const result = service.add(mockRegion);
            // Assert
            (0, vitest_1.expect)(result).toBe(mockRegion);
            (0, vitest_1.expect)(service.getAll()).toHaveLength(initialRegionCount + 1);
            (0, vitest_1.expect)(service.findById('11')).toEqual(mockRegion);
        });
        (0, vitest_1.it)('when adding a region with existing ID, then should throw error', () => {
            // Arrange
            const existingRegion = regions_1.regions[0];
            // Act & Assert
            (0, vitest_1.expect)(() => service.add(existingRegion)).toThrowError(`Região com ID ${existingRegion.id} já existe.`);
        });
    });
    (0, vitest_1.describe)('getAll', () => {
        (0, vitest_1.it)('when getting all regions, then should return all predefined regions', () => {
            // Act
            const result = service.getAll();
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(initialRegionCount);
            (0, vitest_1.expect)(result).toEqual(vitest_1.expect.arrayContaining(regions_1.regions));
        });
        (0, vitest_1.it)('when getting all regions, then should return a copy of the array', () => {
            // Arrange
            const original = service.getAll();
            // Act
            original.push(mockRegion);
            const result = service.getAll();
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(initialRegionCount);
            (0, vitest_1.expect)(original).toHaveLength(initialRegionCount + 1);
        });
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('when region exists, then should return the region', () => {
            // Arrange
            const expectedRegion = regions_1.regions[0];
            // Act
            const result = service.findById('1');
            // Assert
            (0, vitest_1.expect)(result).toEqual(expectedRegion);
        });
        (0, vitest_1.it)('when region does not exist, then should return undefined', () => {
            // Act & Assert
            (0, vitest_1.expect)(service.findById('999')).toBeUndefined();
        });
        (0, vitest_1.it)('when searching with empty string, then should return undefined', () => {
            // Act & Assert
            (0, vitest_1.expect)(service.findById('')).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('regionService instance', () => {
        (0, vitest_1.it)('when using shared instance, then should maintain state between calls', () => {
            // Arrange
            const newRegion = new Region_1.Region('20', 'Test Region', 10);
            // Act
            RegionService_1.regionService.add(newRegion);
            const result = RegionService_1.regionService.findById('20');
            // Assert
            (0, vitest_1.expect)(result).toEqual(newRegion);
        });
        (0, vitest_1.it)('when using shared instance, then should contain initial regions', () => {
            // Act & Assert
            (0, vitest_1.expect)(RegionService_1.regionService.getAll()).toHaveLength(initialRegionCount);
        });
    });
    (0, vitest_1.describe)('Predefined regions', () => {
        (0, vitest_1.it)('should contain Brotas with correct delivery fee', () => {
            const brotas = service.findById('1');
            (0, vitest_1.expect)(brotas?.name).toBe('Brotas');
            (0, vitest_1.expect)(brotas?.delivery).toBe(12.8);
        });
        (0, vitest_1.it)('should contain Centro with correct delivery fee', () => {
            const centro = service.findById('4');
            (0, vitest_1.expect)(centro?.name).toBe('Centro');
            (0, vitest_1.expect)(centro?.delivery).toBe(10);
        });
        (0, vitest_1.it)('should contain Itapuã with correct delivery fee', () => {
            const itapua = service.findById('5');
            (0, vitest_1.expect)(itapua?.name).toBe('Itapuã');
            (0, vitest_1.expect)(itapua?.delivery).toBe(18.5);
        });
        (0, vitest_1.it)('should contain all 10 initial regions', () => {
            (0, vitest_1.expect)(regions_1.regions).toHaveLength(10);
            (0, vitest_1.expect)(regions_1.regions.map(r => r.id)).toEqual(vitest_1.expect.arrayContaining(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']));
        });
    });
});
