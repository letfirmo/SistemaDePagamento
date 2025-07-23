// app.ts
import { orderService } from "./services/OrderService";
import { customerService } from "./services/CustomerService";
import { customers as predefinedCustomers } from "./database/customer";
import { products } from "./database/product";
import { Pix } from "./models/Pix";
import { Card, CardType } from "./models/Card";
import { regionService } from "./services/RegionService";
import { ReportService } from "./services/ReportService";

export function setupSimulation() {
  // Reset services for clean state
  regionService['regions'] = [];
  customerService['customers'] = [...predefinedCustomers];
  orderService['orders'] = [];

  // Criando regiões com IDs únicos
  const simoesfilho = regionService.add({ id:'23', name:'Simões Filho', delivery:34.67 });
  const brotas = regionService.add({ id:'45', name:'Brotas', delivery:12.34 });

  // Criando clientes com IDs únicos
  const cliente1 = customerService.add({ id:"101", name:"Ana", region: simoesfilho});
  const cliente2 = customerService.add({ id:"342", name:"Carlos", region: brotas});

  // Criando pedidos com IDs únicos
  const order1 = orderService.createOrder("1001", cliente1, [products[0]], new Pix('999999999'));
  const order2 = orderService.createOrder("2002", cliente2, [products[2]], new Card('234 3445 2344', CardType.Debit));
  const order3 = orderService.createOrder("3003", predefinedCustomers[0], [products[3], products[0]], new Card('73736 3664 44', CardType.Credit));

  // Pagando pedidos
  const pagamento1 = orderService.payOrder("1001");
  const pagamento2 = orderService.payOrder("2002");
  const pagamento3 = orderService.payOrder('3003');

  return {
    regions: { simoesfilho, brotas },
    customers: { cliente1, cliente2 },
    orders: { order1, order2, order3 },
    payments: { pagamento1, pagamento2, pagamento3 }
  };
}

export function generateSimulationReport() {
  const report = ReportService.generateDailyReport(orderService.getAll());
  
  const orderDetails = orderService.getAll().map(order => 
    `Pedido ${order.id} | Cliente: ${order.customer.name} | Itens: ${order.items.map(i => i.name)} | Total: R$${order.amount.toFixed(2)} | Taxa de entrega: ${order.customer.region.delivery.toFixed(2)} | Pago: ${order.paid}`
  );

  return {
    report,
    orderDetails,
    orders: orderService.getAll()
  };
}

export function main() {
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