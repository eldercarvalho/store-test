import { Client } from './Client'
import { Order } from './Order';

export class Purchase {
  id: number;
  client: Client;
  orders: Order[];

  constructor(id: number = 0, client: Client = null, orders: Order[] = []) {
    this.id = id;
    this.client = client;
    this.orders = orders;
  }

  from(input: any): this {
    Object.assign(this, input);
    this.client = new Client().from(input.client);
    console.log(input);
    this.orders = input.orders.map(order => new Order().from(order));
    return this;
  }

  getOrdersTotal(): number {
    return this.orders.reduce((total, order) => total + order.getTotal(), 0);
  }
}
