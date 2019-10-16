export class Client {
  name;
  phone;

  constructor(name: string = '', phone: string = '') {
    this.name = name;
    this.phone = phone;
  }

  from(input: any): this {
    return Object.assign(input);
  }
}
