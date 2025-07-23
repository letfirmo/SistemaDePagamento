"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
class ReportService {
    static generateDailyReport(orders) {
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
    static calculateTotal(orders) {
        return orders.reduce((sum, order) => sum + order.amount, 0);
    }
}
exports.ReportService = ReportService;
