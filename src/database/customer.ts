import { Customer } from "../models/Customer";
import { regions } from "./regions";

export const customers = [
  new Customer('1', 'Maria', regions[0]),
  new Customer('2', 'João', regions[1]),
  new Customer('3', 'Ana', regions[2]),
  new Customer('4', 'Carlos', regions[3]),
  new Customer('5', 'Fernanda', regions[4]),
  new Customer('6', 'Lucas', regions[5]),
  new Customer('7', 'Juliana', regions[6]),
  new Customer('8', 'Pedro', regions[7]),
  new Customer('9', 'Clara', regions[8]),
  new Customer('10', 'Bruno', regions[9]),
];
