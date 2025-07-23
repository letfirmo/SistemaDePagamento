"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, customer, items, amount, paymentMethod) {
        this.id = id;
        this.customer = customer;
        this.items = items;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.paid = false;
    }
}
exports.Order = Order;
