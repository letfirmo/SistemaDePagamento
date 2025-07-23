// app.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setupSimulation, generateSimulationReport, main } from '../app';
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
    it('should create regions, customers and orders correctly', () => {
      const simulation = setupSimulation();
      
      expect(simulation.regions.simoesfilho.name).toBe('Simões Filho');
      expect(simulation.regions.brotas.delivery).toBe(12.34);
      
      expect(simulation.customers.cliente1.name).toBe('Ana');
      expect(simulation.customers.cliente2.region.name).toBe('Brotas');
      
      expect(simulation.orders.order1.items).toEqual([products[0]]);
      expect(simulation.orders.order3.items).toHaveLength(2);
      
      expect(simulation.payments.pagamento1).toContain('PIX');
      expect(simulation.payments.pagamento2).toContain('Débito');
    });

    // ... outros testes de setupSimulation ...
  });

  describe('generateSimulationReport', () => {
    it('should return correct report structure', () => {
      setupSimulation();
      const report = generateSimulationReport();
      
      expect(report.report).toContain('RELATÓRIO DO DIA');
      expect(report.report).toContain('Pedidos pagos: 3');
      expect(report.orderDetails).toHaveLength(3);
    });

    // ... outros testes de generateSimulationReport ...
  });

  describe('main execution', () => {
    it('should execute all steps without errors', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      try {
        main();
        
        expect(consoleSpy).toHaveBeenCalledWith('--------------------------------PEDIDOS---------------------------------');
        expect(consoleSpy).toHaveBeenCalledWith('\nPAGAMENTOS:\n');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('RELATÓRIO DO DIA'));
      } finally {
        consoleSpy.mockRestore();
      }
    });

    it('should log all order details', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      try {
        main();
        
        const orderLogs = consoleSpy.mock.calls
          .flat()
          .filter((call: any) => typeof call === 'string' && call.startsWith('Pedido'));
        
        expect(orderLogs).toHaveLength(3);
        expect(orderLogs[0]).toContain('Ana');
        expect(orderLogs[1]).toContain('Carlos');
      } finally {
        consoleSpy.mockRestore();
      }
    });
  });
});