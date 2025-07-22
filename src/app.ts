// services/simulation.ts
import { orderService } from "./services/OrderService";
import { customerService } from "./services/CustomerService";
import { customers } from "./database/customer";
import { products } from "./database/product";
import { Pix } from "./models/Pix";
import { Card, CardType } from "./models/Card";
import { regionService } from "./services/RegionService";
import { ReportService } from "./services/ReportService";

export function setupRegions() {
  const simoesfilho = regionService.add({ id:'23', name:'Simões Filho', delivery:34.67 });
  const brotas = regionService.add({ id:'45', name:'Brotas', delivery:12.34 });
  return { simoesfilho, brotas };
}

export function setupCustomers(regions: ReturnType<typeof setupRegions>) {
  const cliente1 = customerService.add({ id:"10", name:"Ana", region: regions.simoesfilho });
  const cliente2 = customerService.add({ id:"34", name:"Carlos", region: regions.brotas });
  return { cliente1, cliente2 };
}

export function createOrders(customers: ReturnType<typeof setupCustomers>) {
  const order1 = orderService.createOrder("1", customers.cliente1, [products[0]], new Pix('999999999'));
  const order2 = orderService.createOrder("2", customers.cliente2, [products[2]], new Card('234 3445 2344', CardType.Debit));
  const order3 = orderService.createOrder("3", customers.cliente1, [products[3], products[0]], new Card('73736 3664 44', CardType.Credit));
  return { order1, order2, order3 };
}

export function processPayments() {
  const pagamento1 = orderService.payOrder("1");
  const pagamento2 = orderService.payOrder("2");
  const pagamento3 = orderService.payOrder('3');
  return { pagamento1, pagamento2, pagamento3 };
}

export function generateReport() {
  return ReportService.generateDailyReport(orderService.getAll());
}

export function displayResults() {
  console.log('--------------------------------PEDIDOS---------------------------------');
  console.log('');
  orderService.getAll().forEach(order => {
    console.log(`Pedido ${order.id} | Cliente: ${order.customer.name} | Itens: ${order.items.map(i => i.name)} | Total: R$${order.amount.toFixed(2)} | Taxa de entrega: ${order.customer.region.delivery.toFixed(2)} | Pago: ${order.paid}`);
  });

  const payments = processPayments();
  console.log("\nPAGAMENTOS:\n");
  console.log(payments.pagamento1);
  console.log(payments.pagamento2);
  console.log(payments.pagamento3);

  console.log('\n' + generateReport());
}

// Execução principal (pode ser movida para index.ts ou main.ts)
export function runSimulation() {
  const regions = setupRegions();
  const customers = setupCustomers(regions);
  createOrders(customers);
  displayResults();
}

// Executar apenas se for o módulo principal
if (require.main === module) {
  runSimulation();
}