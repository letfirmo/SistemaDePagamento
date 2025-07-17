
import { Order } from ".././models/Order";
import { Customer } from ".././models/Customer";
import { Product } from ".././models/Product";
import { PaymentMethod } from "../models/PaymentMethod";

export class OrderService {
  private orders: Order[] = [];

  createOrder(
    id: string, 
    customer: Customer, 
    items: Product[],
    paymentMethod: PaymentMethod
   ): Order { 
    const amount = this.calculateTotal(items, customer);
    const order = new Order(id, customer, items, amount, paymentMethod);
    this.orders.push(order);
    return order;
   }

   getAll(): Order[]{
    return [...this.orders];
   }

   findOrderById(id:string):Order | undefined{
    const orderFound = this.orders.find( o => o.id === id);
    return orderFound
   }


   payOrder(orderId: string): string{
    const order = this.findOrderById(orderId)
    if(!order){
      throw new Error(`Pedido com id ${orderId} não foi encontrado.`)
    }
    if(order.paid){
       throw new Error(`Pedido com ID ${orderId} já foi pago.`);
    }

    const paymentMessage = order.paymentMethod.pay(order.amount);
    order.paid = true;
    return paymentMessage;
   }

   deleteOrderById(id: string): boolean {
      const index = this.orders.findIndex(o => o.id === id);
      if (index !== -1) {
        this.orders.splice(index, 1);
        return true;
      }
      return false;
    }


  private calculateTotal(items: Product[], customer: Customer): number{
    let productsTotal = 0;
    const delivery = customer.region.delivery;
    items.forEach((i)=> (productsTotal += i.price))
    return productsTotal + delivery;
    }
}

export const orderservice = new OrderService();