"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerService = exports.CustomerService = void 0;
class CustomerService {
    constructor() {
        this.customers = [];
    }
    add(customer) {
        const exists = this.customers.some(c => c.id === customer.id);
        if (exists) {
            throw new Error(`Cliente com ID ${customer.id} já existe.`);
        }
        this.customers.push(customer);
        return customer;
    }
    getAll() {
        return [...this.customers];
    }
    findById(id) {
        return this.customers.find(c => c.id === id);
    }
}
exports.CustomerService = CustomerService;
exports.customerService = new CustomerService();
