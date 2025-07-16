import { Customer } from "./Customer";

export class CustomerService {
  private customers: Customer[] = [];

  add(customer: Customer): void {
    const exists = this.customers.some(c => c.id === customer.id);
    if (exists) {
      throw new Error(`Cliente com ID ${customer.id} já existe.`);
    }
    this.customers.push(customer);
  }

  getAll(): Customer[] {
    return [...this.customers]; 
  }

  findById(id: string): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }
}