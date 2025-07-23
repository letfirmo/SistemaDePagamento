// app.ts (versão refatorada para testabilidade)
import { orderService } from "./services/OrderService";
import { customerService } from "./services/CustomerService";
import { customers } from "./database/customer";
import { products } from "./database/product";
import { Pix } from "./models/Pix";
import { Card, CardType } from "./models/Card";
import { regionService } from "./services/RegionService";
import { ReportService } from "./services/ReportService";

export function setupSimulation() {
  // Criando regiões
  const simoesfilho = regionService.add({ id:'23', name:'Simões Filho', delivery:34.67 });
  const brotas = regionService.add({ id:'45', name:'Brotas', delivery:12.34 });

  // Criando clientes
  const cliente1 = customerService.add({ id:"10", name:"Ana", region: simoesfilho});
  const cliente2 = customerService.add({ id:"34", name:"Carlos", region: brotas});

  // Criando pedidos
  const order1 = orderService.createOrder("1", cliente1, [products[0]], new Pix('999999999'));
  const order2 = orderService.createOrder("2", cliente2, [products[2]], new Card('234 3445 2344', CardType.Debit));
  const order3 = orderService.createOrder("3", customers[0], [products[3], products[0]], new Card('73736 3664 44', CardType.Credit));

  // Pagando pedidos
  const pagamento1 = orderService.payOrder("1");
  const pagamento2 = orderService.payOrder("2");
  const pagamento3 = orderService.payOrder('3');

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

// Execução principal
if (process.env.NODE_ENV !== 'test') {
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