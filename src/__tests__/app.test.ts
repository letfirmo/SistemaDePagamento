// app.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setupSimulation, generateSimulationReport } from '../app';
import { regionService } from '../services/RegionService';
import { customerService } from '../services/CustomerService';
import { orderService } from '../services/OrderService';
import { products } from '../database/product';
import { customers } from '../database/customer';

describe('app.ts', () => {
  beforeEach(() => {
    // Reset services before each test
    regionService['regions'] = [];
    customerService['customers'] = [...customers];
    orderService['orders'] = [];
  });

  describe('setupSimulation', () => {
    it('when setting up simulation, then should create regions, customers and orders correctly', () => {
      // Act
      const simulation = setupSimulation();
      
      // Assert
      expect(simulation.regions.simoesfilho.name).toBe('Simões Filho');
      expect(simulation.regions.brotas.delivery).toBe(12.34);
      
      expect(simulation.customers.cliente1.name).toBe('Ana');
      expect(simulation.customers.cliente2.region.name).toBe('Brotas');
      
      expect(simulation.orders.order1.items).toEqual([products[0]]);
      expect(simulation.orders.order3.items).toHaveLength(2);
      
      expect(simulation.payments.pagamento1).toContain('PIX');
      expect(simulation.payments.pagamento2).toContain('Débito');
    });

    it('when setting up simulation, then should add regions to regionService', () => {
      // Act
      setupSimulation();
      
      // Assert
      expect(regionService.getAll()).toHaveLength(2);
      expect(regionService.findById('23')?.name).toBe('Simões Filho');
    });

    it('when setting up simulation, then should add customers to customerService', () => {
      // Act
      setupSimulation();
      
      // Assert
      expect(customerService.getAll().length).toBeGreaterThanOrEqual(customers.length + 2);
      expect(customerService.findById('101')?.name).toBe('Ana');
    });

    it('when setting up simulation, then should create orders in orderService', () => {
      // Act
      setupSimulation();
      
      // Assert
      expect(orderService.getAll()).toHaveLength(3);
      
      // Usando o novo método findById
      expect(orderService.findById('1001')?.customer.name).toBe('Ana');
      
      // Ou ainda usando findOrderById (para compatibilidade)
      expect(orderService.findOrderById('1001')?.customer.name).toBe('Ana');
    });
  });

  describe('generateSimulationReport', () => {
    it('when generating report after simulation, then should return correct report structure', () => {
      // Arrange
      setupSimulation();
      
      // Act
      const report = generateSimulationReport();
      
      // Assert
      expect(report.report).toContain('RELATÓRIO DO DIA');
      expect(report.report).toContain('Pedidos pagos: 3');
      expect(report.orderDetails).toHaveLength(3);
      expect(report.orders).toHaveLength(3);
    });

    it('when generating report, then order details should contain correct information', () => {
      // Arrange
      setupSimulation();
      
      // Act
      const report = generateSimulationReport();
      
      // Assert
      expect(report.orderDetails.some(d => d.includes('Ana'))).toBe(true);
      expect(report.orderDetails.some(d => d.includes(products[0].name))).toBe(true);
      expect(report.orderDetails.some(d => d.includes('Carlos'))).toBe(true);
      expect(report.orderDetails.some(d => d.includes(products[2].name))).toBe(true);
    });
  });
});