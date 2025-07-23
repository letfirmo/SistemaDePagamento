"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionService = exports.RegionService = void 0;
const regions_1 = require("../database/regions");
class RegionService {
    constructor() {
        this.regions = regions_1.regions;
    }
    add(region) {
        if (this.regions.some(r => r.id === region.id)) {
            throw new Error(`Região com ID ${region.id} já existe.`);
        }
        this.regions.push(region);
        return region;
    }
    getAll() {
        return [...this.regions];
    }
    findById(id) {
        return this.regions.find(r => r.id === id);
    }
}
exports.RegionService = RegionService;
exports.regionService = new RegionService();
