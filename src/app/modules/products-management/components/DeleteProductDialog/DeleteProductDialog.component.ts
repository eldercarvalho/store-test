import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-DeleteProductDialog',
  templateUrl: './DeleteProductDialog.component.html',
  styleUrls: ['./DeleteProductDialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  product: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.product = this.data.product;
  }

  deleteProduct(): void {
    this.productsService.delete(this.product.id, () => {
      this.dialogRef.close(true);
    });
  }

}
