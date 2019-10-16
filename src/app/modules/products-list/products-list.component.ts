import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { MatDialog } from '@angular/material';
import { ProductDetailsDialogComponent } from './components/product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products = [];

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.productsService.products$.subscribe(p => this.products = p);
    this.productsService.index();
  }

  showDetails(product) {
    this.dialog.open(ProductDetailsDialogComponent, {
      width: '600px',
      data: product
    })
  }

}
