"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.OrderService = void 0;
const Order_1 = require(".././models/Order");
class OrderService {
    constructor() {
        this.orders = [];
    }
    createOrder(id, customer, items, paymentMethod) {
        const amount = this.calculateTotal(items, customer);
        const order = new Order_1.Order(id, customer, items, amount, paymentMethod);
        this.orders.push(order);
        return order;
    }
    getAll() {
        return [...this.orders];
    }
    findOrderById(id) {
        const orderFound = this.orders.find(o => o.id === id);
        return orderFound;
    }
    payOrder(orderId) {
        const order = this.findOrderById(orderId);
        if (!order) {
            throw new Error(`Pedido com id ${orderId} não foi encontrado.`);
        }
        if (order.paid) {
            throw new Error(`Pedido com ID ${orderId} já foi pago.`);
        }
        const paymentMessage = order.paymentMethod.pay(order.amount);
        order.paid = true;
        return paymentMessage;
    }
    deleteOrderById(id) {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
            return true;
        }
        return false;
    }
    calculateTotal(items, customer) {
        let productsTotal = 0;
        const delivery = customer.region.delivery;
        items.forEach((i) => (productsTotal += i.price));
        return productsTotal + delivery;
    }
}
exports.OrderService = OrderService;
exports.orderService = new OrderService();
