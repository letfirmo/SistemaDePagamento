import { Order } from "../models/Order";

export class ReportService {
  static generateDailyReport(orders: Order[]): string {
    const total = this.calculateTotal(orders);
    const pagos = orders.filter(order => order.paid).length;
    const naoPagos = orders.length - pagos;

    return [
      "================ RELATÓRIO DO DIA ================",
      `Total de pedidos: ${orders.length}`,
      `Pedidos pagos: ${pagos}`,
      `Pedidos não pagos: ${naoPagos}`,
      `Valor total arrecadado: R$ ${total.toFixed(2)}`,
      "=================================================="
    ].join('\n');
  }

  private static calculateTotal(orders: Order[]): number {
    return orders.reduce((sum, order) => sum + order.amount, 0);
  }
}
