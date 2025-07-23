"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSimulation = setupSimulation;
exports.generateSimulationReport = generateSimulationReport;
exports.main = main;
// app.ts
const OrderService_1 = require("./services/OrderService");
const CustomerService_1 = require("./services/CustomerService");
const customer_1 = require("./database/customer");
const product_1 = require("./database/product");
const Pix_1 = require("./models/Pix");
const Card_1 = require("./models/Card");
const RegionService_1 = require("./services/RegionService");
const ReportService_1 = require("./services/ReportService");
function setupSimulation() {
    // Reset services for clean state
    RegionService_1.regionService['regions'] = [];
    CustomerService_1.customerService['customers'] = [...customer_1.customers];
    OrderService_1.orderService['orders'] = [];
    // Criando regiões com IDs únicos
    const simoesfilho = RegionService_1.regionService.add({ id: '23', name: 'Simões Filho', delivery: 34.67 });
    const brotas = RegionService_1.regionService.add({ id: '45', name: 'Brotas', delivery: 12.34 });
    // Criando clientes com IDs únicos
    const cliente1 = CustomerService_1.customerService.add({ id: "101", name: "Ana", region: simoesfilho });
    const cliente2 = CustomerService_1.customerService.add({ id: "342", name: "Carlos", region: brotas });
    // Criando pedidos com IDs únicos
    const order1 = OrderService_1.orderService.createOrder("1001", cliente1, [product_1.products[0]], new Pix_1.Pix('999999999'));
    const order2 = OrderService_1.orderService.createOrder("2002", cliente2, [product_1.products[2]], new Card_1.Card('234 3445 2344', Card_1.CardType.Debit));
    const order3 = OrderService_1.orderService.createOrder("3003", customer_1.customers[0], [product_1.products[3], product_1.products[0]], new Card_1.Card('73736 3664 44', Card_1.CardType.Credit));
    // Pagando pedidos
    const pagamento1 = OrderService_1.orderService.payOrder("1001");
    const pagamento2 = OrderService_1.orderService.payOrder("2002");
    const pagamento3 = OrderService_1.orderService.payOrder('3003');
    return {
        regions: { simoesfilho, brotas },
        customers: { cliente1, cliente2 },
        orders: { order1, order2, order3 },
        payments: { pagamento1, pagamento2, pagamento3 }
    };
}
function generateSimulationReport() {
    const report = ReportService_1.ReportService.generateDailyReport(OrderService_1.orderService.getAll());
    const orderDetails = OrderService_1.orderService.getAll().map(order => `Pedido ${order.id} | Cliente: ${order.customer.name} | Itens: ${order.items.map(i => i.name)} | Total: R$${order.amount.toFixed(2)} | Taxa de entrega: ${order.customer.region.delivery.toFixed(2)} | Pago: ${order.paid}`);
    return {
        report,
        orderDetails,
        orders: OrderService_1.orderService.getAll()
    };
}
function main() {
    const simulation = setupSimulation();
    const report = generateSimulationReport();
    console.log('--------------------------------PEDIDOS---------------------------------');
    console.log('');
    report.orderDetails.forEach(detail => console.log(detail));
    console.log("\nPAGAMENTOS:\n");
    console.log(simulation.payments.pagamento1);
    console.log(simulation.payments.pagamento2);
    console.log(simulation.payments.pagamento3);
    console.log('\n' + report.report);
}
// Execução principal apenas se não for teste
if (process.env.NODE_ENV !== 'test' && require.main === module) {
    main();
}
