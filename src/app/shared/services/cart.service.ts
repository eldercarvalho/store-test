import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Order } from '../models/Order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart = new BehaviorSubject<Order[]>([]);
  public cart$ = this._cart.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  get cart() {
    return this._cart.getValue();
  }

  set cart(val: Order[]) {
    this._cart.next(val);
  }

  addToCart(item: Order): void {
    this.cart = [ ...this.cart, item ];
  }

  getTotal(): number {
    return this.cart.reduce((total: number, cartItem: Order) => total + cartItem.getTotal(), 0)
  }

  clearCart(): void {
    this.cart = [];
  }

  deleteItem(itemIndex: number): void {
    this.cart = this.cart.filter((cartItem, index) => index !== itemIndex);
  }

  changeQuantity(index: number, quantity: number): void {
    this.cart = this.cart.map((cartItem, itemIndex) => {
      if (itemIndex === index) {
        cartItem.quantity = quantity;
        return cartItem;
      }
      return cartItem;
    })
  }
}
