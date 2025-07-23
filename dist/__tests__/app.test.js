"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// app.test.ts
const vitest_1 = require("vitest");
const app_1 = require("../app");
const RegionService_1 = require("../services/RegionService");
const CustomerService_1 = require("../services/CustomerService");
const OrderService_1 = require("../services/OrderService");
const product_1 = require("../database/product");
const customer_1 = require("../database/customer");
(0, vitest_1.describe)('app.ts', () => {
    (0, vitest_1.beforeEach)(() => {
        // Reset services before each test
        RegionService_1.regionService['regions'] = [];
        CustomerService_1.customerService['customers'] = [...customer_1.customers];
        OrderService_1.orderService['orders'] = [];
    });
    (0, vitest_1.describe)('setupSimulation', () => {
        (0, vitest_1.it)('should create regions, customers and orders correctly', () => {
            const simulation = (0, app_1.setupSimulation)();
            (0, vitest_1.expect)(simulation.regions.simoesfilho.name).toBe('Simões Filho');
            (0, vitest_1.expect)(simulation.regions.brotas.delivery).toBe(12.34);
            (0, vitest_1.expect)(simulation.customers.cliente1.name).toBe('Ana');
            (0, vitest_1.expect)(simulation.customers.cliente2.region.name).toBe('Brotas');
            (0, vitest_1.expect)(simulation.orders.order1.items).toEqual([product_1.products[0]]);
            (0, vitest_1.expect)(simulation.orders.order3.items).toHaveLength(2);
            (0, vitest_1.expect)(simulation.payments.pagamento1).toContain('PIX');
            (0, vitest_1.expect)(simulation.payments.pagamento2).toContain('Débito');
        });
        // ... outros testes de setupSimulation ...
    });
    (0, vitest_1.describe)('generateSimulationReport', () => {
        (0, vitest_1.it)('should return correct report structure', () => {
            (0, app_1.setupSimulation)();
            const report = (0, app_1.generateSimulationReport)();
            (0, vitest_1.expect)(report.report).toContain('RELATÓRIO DO DIA');
            (0, vitest_1.expect)(report.report).toContain('Pedidos pagos: 3');
            (0, vitest_1.expect)(report.orderDetails).toHaveLength(3);
        });
        // ... outros testes de generateSimulationReport ...
    });
    (0, vitest_1.describe)('main execution', () => {
        (0, vitest_1.it)('should execute all steps without errors', () => {
            const consoleSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            try {
                (0, app_1.main)();
                (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith('--------------------------------PEDIDOS---------------------------------');
                (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith('\nPAGAMENTOS:\n');
                (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith(vitest_1.expect.stringContaining('RELATÓRIO DO DIA'));
            }
            finally {
                consoleSpy.mockRestore();
            }
        });
        (0, vitest_1.it)('should log all order details', () => {
            const consoleSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            try {
                (0, app_1.main)();
                const orderLogs = consoleSpy.mock.calls
                    .flat()
                    .filter((call) => typeof call === 'string' && call.startsWith('Pedido'));
                (0, vitest_1.expect)(orderLogs).toHaveLength(3);
                (0, vitest_1.expect)(orderLogs[0]).toContain('Ana');
                (0, vitest_1.expect)(orderLogs[1]).toContain('Carlos');
            }
            finally {
                consoleSpy.mockRestore();
            }
        });
    });
});
