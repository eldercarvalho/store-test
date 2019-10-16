import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartLength: number;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => this.cartLength = cart.length);
  }

}
