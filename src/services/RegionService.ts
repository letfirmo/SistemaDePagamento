import { Region } from './models/Region';
import { regions } from './database/regions';

export class RegionService {
  private regions = regions;

  add(region: Region): void {
    if (this.regions.some(r => r.id === region.id)) {
      throw new Error(`Região com ID ${region.id} já existe.`);
    }
    this.regions.push(region);
  }

  getAll(): Region[] {
    return [...this.regions];
  }

  findById(id: string): Region | undefined {
    return this.regions.find(r => r.id === id);
  }
}

export const regionService = new RegionService();
