import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PurchasesService } from 'src/app/shared/services/purchases.service';
import { PurchaseOrdersDialogComponent } from './components/PurchaseOrdersDialog/PurchaseOrdersDialog.component';
import { Purchase } from 'src/app/shared/models/Purchase';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  displayedColumns = ['id', 'client', 'phone', 'value', 'orders'];
  purchases = [];
  loading = false;

  constructor(
    private purchasesService: PurchasesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loading = true
    this.purchasesService.purchases$.subscribe(purchases => {
      this.purchases = purchases;
      this.loading = false;
    });

    this.purchasesService.index();
  }

  showOrders(purchase: Purchase) {
    this.dialog.open(PurchaseOrdersDialogComponent, {
      width: '700px',
      data: purchase
    })
  }

}
