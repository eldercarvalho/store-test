import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { CartService } from 'src/app/shared/services/cart.service';
import { Order } from 'src/app/shared/models/Order';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.scss']
})
export class ProductDetailsDialogComponent implements OnInit {
  product: Product;
  quantity = 1;
  addToCartButtonText = 'Adicionar ao carrinho';
  showCheckIcon = false;
  showGoToCartButton = false;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.product = this.data
  }

  addToCart(): void {
    this.cartService.addToCart(new Order(this.product, this.quantity));
    this.addToCartButtonText = 'Adicionado!';
    this.showCheckIcon = true;
    this.showGoToCartButton = true;
    setTimeout(() => {
      this.addToCartButtonText = 'Adicionar ao carrinho';
      this.showCheckIcon = false
    }, 2000)
  }

  goToCart(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/cart');
  }

}
