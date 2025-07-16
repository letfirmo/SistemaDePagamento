import { describe, it, expect } from 'vitest';
import { Region } from '../models/Region';
import { regions } from '../database/regions';

describe('Region Class', () => {
  it('When creating a new Region with valid parameters, then all properties should be correctly assigned', () => {
    // Arrange
    const id = '11';
    const name = 'New Region';
    const delivery = 12.5;

    // Act
    const region = new Region(id, name, delivery);

    // Assert
    expect(region.id).toBe(id);
    expect(region.name).toBe(name);
    expect(region.delivery).toBe(delivery);
  });

  it('When creating a new Region with empty name, then name should be empty string', () => {
    // Arrange
    const id = '12';
    const name = '';
    const delivery = 10;

    // Act
    const region = new Region(id, name, delivery);

    // Assert
    expect(region.name).toBe('');
  });

  it('When creating a new Region with zero delivery fee, then delivery should be zero', () => {
    // Arrange
    const id = '13';
    const name = 'Free Delivery';
    const delivery = 0;

    // Act
    const region = new Region(id, name, delivery);

    // Assert
    expect(region.delivery).toBe(0);
  });

  it('When creating a new Region with negative delivery fee, then delivery should be negative', () => {
    // Arrange
    const id = '14';
    const name = 'Invalid Delivery';
    const delivery = -5;

    // Act
    const region = new Region(id, name, delivery);

    // Assert
    expect(region.delivery).toBe(-5);
  });
});

describe('Regions List', () => {
  it('When accessing regions list, then it should contain 10 predefined regions', () => {
    // Arrange & Act
    const regionsCount = regions.length;

    // Assert
    expect(regionsCount).toBe(10);
  });

  it('When checking first region in list, then it should be Brotas with delivery fee 12.8', () => {
    // Arrange & Act
    const firstRegion = regions[0];

    // Assert
    expect(firstRegion.id).toBe('1');
    expect(firstRegion.name).toBe('Brotas');
    expect(firstRegion.delivery).toBe(12.8);
  });

  it('When checking last region in list, then it should be São Caetano with delivery fee 19', () => {
    // Arrange & Act
    const lastRegion = regions[regions.length - 1];

    // Assert
    expect(lastRegion.id).toBe('10');
    expect(lastRegion.name).toBe('São Caetano');
    expect(lastRegion.delivery).toBe(19);
  });

  it('When checking all regions, then each should be an instance of Region class', () => {
    // Arrange & Act
    const allAreRegions = regions.every(region => region instanceof Region);

    // Assert
    expect(allAreRegions).toBe(true);
  });

  it('When checking regions list, then delivery fees should be in expected range (10-20)', () => {
    // Arrange & Act
    const deliveryFees = regions.map(region => region.delivery);
    const allInRange = deliveryFees.every(fee => fee >= 10 && fee <= 20);

    // Assert
    expect(allInRange).toBe(true);
  });
});