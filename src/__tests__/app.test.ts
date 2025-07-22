// tests/simulation.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  setupRegions, 
  setupCustomers, 
  createOrders, 
  processPayments, 
  generateReport,
  runSimulation,
  displayResults
} from '../app';
import { regionService } from '../services/RegionService';
import { customerService } from '../services/CustomerService';
import { orderService } from '../services/OrderService';

describe('Simulation', () => {
  beforeEach(() => {
    // Reset services before each test
    regionService['regions'] = [];
    customerService['customers'] = [];
    orderService['orders'] = [];
  });

  describe('setupRegions', () => {
    it('should create regions with correct data', () => {
      const result = setupRegions();
      
      expect(result.simoesfilho.name).toBe('Simões Filho');
      expect(result.simoesfilho.delivery).toBe(34.67);
      expect(result.brotas.name).toBe('Brotas');
      expect(result.brotas.delivery).toBe(12.34);
      
      expect(regionService.getAll()).toHaveLength(2);
    });
  });

  describe('setupCustomers', () => {
    it('should create customers with correct data', () => {
      const regions = setupRegions();
      const result = setupCustomers(regions);
      
      expect(result.cliente1.name).toBe('Ana');
      expect(result.cliente2.name).toBe('Carlos');
      expect(customerService.getAll()).toHaveLength(2);
    });
  });

  describe('createOrders', () => {
    it('should create orders with correct data', () => {
      const regions = setupRegions();
      const customers = setupCustomers(regions);
      const result = createOrders(customers);
      
      expect(orderService.getAll()).toHaveLength(3);
      expect(result.order1.customer.name).toBe('Ana');
      expect(result.order2.items.length).toBe(1);
    });
  });

  describe('processPayments', () => {
    it('should process payments correctly', () => {
      const regions = setupRegions();
      const customers = setupCustomers(regions);
      createOrders(customers);
      
      const result = processPayments();
      
      expect(result.pagamento1).toContain('PIX');
      expect(result.pagamento2).toContain('Débito');
      expect(orderService.findOrderById('1')?.paid).toBe(true);
    });
  });

  describe('generateReport', () => {
    it('should generate correct report', () => {
      const regions = setupRegions();
      const customers = setupCustomers(regions);
      createOrders(customers);
      processPayments();
      
      const result = generateReport();
      
      expect(result).toContain('RELATÓRIO DO DIA');
      expect(result).toContain('Pedidos pagos: 3');
    });
  });

  describe('displayResults', () => {
    it('should display results without errors', () => {
      // Mock console.log to avoid output during tests
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const regions = setupRegions();
      const customers = setupCustomers(regions);
      createOrders(customers);
      
      expect(() => {
        displayResults();
      }).not.toThrow();
      
      // Verify console.log was called
      expect(consoleSpy).toHaveBeenCalled();
      
      // Restore console.log
      consoleSpy.mockRestore();
    });

    it('should display results and process payments internally', () => {
      // Mock console.log to avoid output during tests
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const regions = setupRegions();
      const customers = setupCustomers(regions);
      createOrders(customers);
      // Note: displayResults() calls processPayments() internally, so we don't call it here
      
      expect(() => {
        displayResults();
      }).not.toThrow();
      
      // Verify console.log was called multiple times (should be more than just once)
      expect(consoleSpy.mock.calls.length).toBeGreaterThan(1);
      
      // After displayResults(), all orders should be paid
      expect(orderService.getAll().every(order => order.paid)).toBe(true);
      
      consoleSpy.mockRestore();
    });
  });

  describe('Integration Tests', () => {
    it('should run full workflow step by step', () => {
      // Step 1: Setup regions
      const regions = setupRegions();
      expect(regionService.getAll()).toHaveLength(2);
      
      // Step 2: Setup customers
      const customers = setupCustomers(regions);
      expect(customerService.getAll()).toHaveLength(2);
      
      // Step 3: Create orders
      const orders = createOrders(customers);
      expect(orderService.getAll()).toHaveLength(3);
      expect(orders.order1.paid).toBe(false);
      
      // Step 4: Process payments
      const payments = processPayments();
      expect(payments.pagamento1).toBeDefined();
      expect(payments.pagamento2).toBeDefined();
      expect(payments.pagamento3).toBeDefined();
      expect(orderService.findOrderById('1')?.paid).toBe(true);
      
      // Step 5: Generate report
      const report = generateReport();
      expect(report).toContain('RELATÓRIO DO DIA');
    });
  });

  describe('runSimulation', () => {
    it('should run complete simulation without errors', () => {
      expect(() => runSimulation()).not.toThrow();
    });

    it('should run complete simulation and verify final state', () => {
      // Mock console.log to avoid output during tests
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      runSimulation();
      
      // Verify that orders were created and processed
      const allOrders = orderService.getAll();
      expect(allOrders).toHaveLength(3);
      expect(allOrders.every(order => order.paid)).toBe(true);
      
      // Verify console.log was called (from displayResults)
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });
});