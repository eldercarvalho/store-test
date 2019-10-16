import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Purchase } from 'src/app/shared/models/Purchase';

@Component({
  selector: 'app-PurchaseOrdersDialog',
  templateUrl: './PurchaseOrdersDialog.component.html',
  styleUrls: ['./PurchaseOrdersDialog.component.css']
})
export class PurchaseOrdersDialogComponent implements OnInit {

  displayedColumns = ['image', 'name', 'quantity', 'value'];

  constructor(
    public dialogRef: MatDialogRef<PurchaseOrdersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public purchase: Purchase
  ) { }

  ngOnInit() {
  }

}
