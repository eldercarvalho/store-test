import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';

import { CartService } from 'src/app/shared/services/cart.service';
import { PurchasesService } from 'src/app/shared/services/purchases.service';
import { Order } from 'src/app/shared/models/Order';
import { Purchase } from 'src/app/shared/models/Purchase';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns = ['image', 'name', 'quantity', 'value', 'actions'];
  cart = new MatTableDataSource<Order>([]);
  purchaseTotal: number;
  purchaseForm: FormGroup;

  constructor(
    private cartService: CartService,
    private purchaseService: PurchasesService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart.data = cart;
      this.purchaseTotal = this.cartService.getTotal();
    });

    this.purchaseForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['']
    })
  }

  removeCartItem(index: number): void {
    this.cartService.deleteItem(index)
  }

  onChangeProductQty(itemIndex: number, quantity: number) {
    this.cartService.changeQuantity(itemIndex, quantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  onPurchaseFormSubmit(clientData: any): void {
    if (this.purchaseForm.valid) {
      const newPurchase = new Purchase(0, clientData, this.cart.data);
      this.purchaseService.loading = true;
      this.purchaseService.create(newPurchase).subscribe(
        (purchase: Purchase) => {
          this.purchaseService.loading = false;
          this.cartService.clearCart();
          this.purchaseService.purchases = [ purchase, ...this.purchaseService.purchases ];
          this.dialog.open(PurchaseDialog, { width: '300px' });
        },
        error => {
          this.purchaseService.loading = false;
          this.snackBar.open('Ocorreu um erro ao tentar finalizar a compra.', 'Fechar');
        }
      )

    }
  }

}

@Component({
  template: `
    <mat-dialog-content>
      <p class="check">
        <mat-icon>check_circle_outline</mat-icon>
      </p>
      <p>Sua compra foi finalizada com sucesso!<p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fechar</button>
      <button mat-flat-button color="primary" mat-dialog-close routerLink="/purchases">Ver Compras</button>
    <mat-dialog-actions>
  `,
  styles: [
    `
      .check {
        color: #00C851;
        text-align: center;
      }
      .check mat-icon {
        font-size: 45px;
        height: 45px;
        width: 45px;
      }
    `
  ]
})
export class PurchaseDialog {}
