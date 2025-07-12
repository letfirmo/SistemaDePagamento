import { Region } from "../models/Region";
import { Customer } from "../models/Customer";
import { Pix } from "../models/Pix";
import { Order } from "../models/Order";

export function createMockOrder(): Order {
  const zonaSul = new Region("Zona Sul", 10);
  const cliente = new Customer("1", "Letícia", zonaSul);
  const pagamentoPix = new Pix("leticia@pix.com");

  return new Order("001", cliente, 90, pagamentoPix);
}
