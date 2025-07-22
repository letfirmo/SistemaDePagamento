import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { RegionService, regionService } from '../RegionService';
import { Region } from '../../models/Region';
import { regions as predefinedRegions } from '../../database/regions';

describe('RegionService', () => {
  let service: RegionService;
  const initialRegionCount = predefinedRegions.length;
  const mockRegion = new Region('11', 'Novo Bairro', 15.5);

  // Cria uma cópia fresca das regiões para cada teste
  beforeEach(() => {
    service = new RegionService();
    // Reseta o array de regiões para o estado inicial
    service['regions'] = [...predefinedRegions];
  });

  // Limpa a instância compartilhada após cada teste
  afterEach(() => {
    regionService['regions'] = [...predefinedRegions];
  });

  describe('add', () => {
    it('when adding a new region, then should store the region', () => {
      // Act
      const result = service.add(mockRegion);

      // Assert
      expect(result).toBe(mockRegion);
      expect(service.getAll()).toHaveLength(initialRegionCount + 1);
      expect(service.findById('11')).toEqual(mockRegion);
    });

    it('when adding a region with existing ID, then should throw error', () => {
      // Arrange
      const existingRegion = predefinedRegions[0];

      // Act & Assert
      expect(() => service.add(existingRegion)).toThrowError(
        `Região com ID ${existingRegion.id} já existe.`
      );
    });
  });

  describe('getAll', () => {
    it('when getting all regions, then should return all predefined regions', () => {
      // Act
      const result = service.getAll();

      // Assert
      expect(result).toHaveLength(initialRegionCount);
      expect(result).toEqual(expect.arrayContaining(predefinedRegions));
    });

    it('when getting all regions, then should return a copy of the array', () => {
      // Arrange
      const original = service.getAll();

      // Act
      original.push(mockRegion);
      const result = service.getAll();

      // Assert
      expect(result).toHaveLength(initialRegionCount);
      expect(original).toHaveLength(initialRegionCount + 1);
    });
  });

  describe('findById', () => {
    it('when region exists, then should return the region', () => {
      // Arrange
      const expectedRegion = predefinedRegions[0];

      // Act
      const result = service.findById('1');

      // Assert
      expect(result).toEqual(expectedRegion);
    });

    it('when region does not exist, then should return undefined', () => {
      // Act & Assert
      expect(service.findById('999')).toBeUndefined();
    });

    it('when searching with empty string, then should return undefined', () => {
      // Act & Assert
      expect(service.findById('')).toBeUndefined();
    });
  });

  describe('regionService instance', () => {
    it('when using shared instance, then should maintain state between calls', () => {
      // Arrange
      const newRegion = new Region('20', 'Test Region', 10);

      // Act
      regionService.add(newRegion);
      const result = regionService.findById('20');

      // Assert
      expect(result).toEqual(newRegion);
    });

    it('when using shared instance, then should contain initial regions', () => {
      // Act & Assert
      expect(regionService.getAll()).toHaveLength(initialRegionCount);
    });
  });

  describe('Predefined regions', () => {
    it('should contain Brotas with correct delivery fee', () => {
      const brotas = service.findById('1');
      expect(brotas?.name).toBe('Brotas');
      expect(brotas?.delivery).toBe(12.8);
    });

    it('should contain Centro with correct delivery fee', () => {
      const centro = service.findById('4');
      expect(centro?.name).toBe('Centro');
      expect(centro?.delivery).toBe(10);
    });

    it('should contain Itapuã with correct delivery fee', () => {
      const itapua = service.findById('5');
      expect(itapua?.name).toBe('Itapuã');
      expect(itapua?.delivery).toBe(18.5);
    });

    it('should contain all 10 initial regions', () => {
      expect(predefinedRegions).toHaveLength(10);
      expect(predefinedRegions.map(r => r.id)).toEqual(
        expect.arrayContaining(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
      );
    });
  });
});