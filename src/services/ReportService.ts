import { Order } from "../models/Order";

export class ReportService {
  static generateDailyReport(orders: Order[]): string {
    const total = orders.reduce((sum, order) => sum + order.amount, 0);
    return `Relatório do dia: ${orders.length} pedidos - Total R$${total.toFixed(2)}`;
  }
}
