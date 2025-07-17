//Execução da simulação da aplicação
import { orderService } from "./services/OrderService"
import { customerService } from "./services/CustomerService"
import { customers } from "./database/customer"
import { products } from "./database/product"
import { Pix } from "./models/Pix"
import { Card, CardType } from "./models/Card"
import { regionService } from "./services/RegionService"

// Criando regiões
const simoesfilho = regionService.add({ id:'23', name:'Simões Filho', delivery:34.67 });
const brotas = regionService.add({ id:'45', name:'Brotas', delivery:12.34 });

// Criando clientes
const cliente1 = customerService.add({ id:"10", name:"Ana", region: simoesfilho});
const cliente2 = customerService.add({ id:"34", name:"Carlos", region: brotas});

// Criando pedidos
const order1 = orderService.createOrder("1", cliente1, [products[0]], new Pix('999999999'));
const order2 = orderService.createOrder("2", cliente2, [products[2]], new Card('234 3445 2344', CardType.Debit));

// Pagando pedidos
const pagamento1 = orderService.payOrder("1");
const pagamento2 = orderService.payOrder("2");

// Mostrando resultados
console.log("PEDIDOS:");
orderService.getAll().forEach(order => {
  console.log(`Pedido ${order.id} | Cliente: ${order.customer.name} | Total: R$${order.amount.toFixed(2)} | Pago: ${order.paid}`);
});

console.log("\nPAGAMENTOS:");
console.log(pagamento1);
console.log(pagamento2);