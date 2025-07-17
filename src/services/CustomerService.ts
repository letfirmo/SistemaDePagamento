import { Customer } from "./../models/Customer";

export class CustomerService {
  private customers: Customer[] = [];

  add(customer: Customer): Customer {
    const exists = this.customers.some(c => c.id === customer.id);
    if (exists) {
      throw new Error(`Cliente com ID ${customer.id} já existe.`);
    }
    this.customers.push(customer);
    return customer
  }

  getAll(): Customer[] {
    return [...this.customers]; 
  }

  findById(id: string): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }
}

export const customerService = new CustomerService()