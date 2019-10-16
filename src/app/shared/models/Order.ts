import { Product } from './Product';

export class Order {
  product: Product;
  quantity: number;

  constructor(product: Product = null, quantity: number = 0) {
    this.product = product;
    this.quantity = quantity;
  }

  from(input: any): this {
    Object.assign(this, input);
    this.product = new Product().from(input.product);
    return this;
  }

  getTotal(): number {
    return this.quantity * this.product.price;
  }
}
