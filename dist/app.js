"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Execução da simulação da aplicação
const OrderService_1 = require("./services/OrderService");
const CustomerService_1 = require("./services/CustomerService");
const customer_1 = require("./database/customer");
const product_1 = require("./database/product");
const Pix_1 = require("./models/Pix");
const Card_1 = require("./models/Card");
const RegionService_1 = require("./services/RegionService");
const ReportService_1 = require("./services/ReportService");
// Criando regiões
const simoesfilho = RegionService_1.regionService.add({ id: '23', name: 'Simões Filho', delivery: 34.67 });
const brotas = RegionService_1.regionService.add({ id: '45', name: 'Brotas', delivery: 12.34 });
// Criando clientes
const cliente1 = CustomerService_1.customerService.add({ id: "10", name: "Ana", region: simoesfilho });
const cliente2 = CustomerService_1.customerService.add({ id: "34", name: "Carlos", region: brotas });
// Criando pedidos
OrderService_1.orderService.createOrder("1", cliente1, [product_1.products[0]], new Pix_1.Pix('999999999'));
OrderService_1.orderService.createOrder("2", cliente2, [product_1.products[2]], new Card_1.Card('234 3445 2344', Card_1.CardType.Debit));
OrderService_1.orderService.createOrder("3", customer_1.customers[0], [product_1.products[3], product_1.products[0]], new Card_1.Card('73736 3664 44', Card_1.CardType.Credit));
// Pagando pedidos
const pagamento1 = OrderService_1.orderService.payOrder("1");
const pagamento2 = OrderService_1.orderService.payOrder("2");
const pagamento3 = OrderService_1.orderService.payOrder('3');
//Relatórios
const report = ReportService_1.ReportService.generateDailyReport(OrderService_1.orderService.getAll());
// Mostrando resultados
console.log('--------------------------------PEDIDOS---------------------------------');
console.log('');
OrderService_1.orderService.getAll().forEach(order => {
    console.log(`Pedido ${order.id} | Cliente: ${order.customer.name} | Itens: ${order.items.map(i => i.name)} | Total: R$${order.amount.toFixed(2)} | Taxa de entrega: ${order.customer.region.delivery.toFixed(2)} | Pago: ${order.paid}`);
});
console.log("\nPAGAMENTOS:\n");
console.log(pagamento1);
console.log(pagamento2);
console.log(pagamento3);
console.log('\n' + report);
