export class Product {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';

  constructor(name: string = '', description: string = '', price: number = 0, imageUrl: string = '') {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  public from(input: any): this {
    return Object.assign(this, input);
  }
}
