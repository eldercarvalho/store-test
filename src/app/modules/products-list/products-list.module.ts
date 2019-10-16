import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { ProductsListRoutingModule } from './products-list-routing.module';
import { ProductsListComponent } from './products-list.component';
import { ProductDetailsDialogComponent } from './components/product-details-dialog/product-details-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductsListRoutingModule,
    FormsModule
  ],
  entryComponents: [
    ProductDetailsDialogComponent
  ],
  declarations: [
    ProductsListComponent,
    ProductDetailsDialogComponent
  ]
})
export class ProductsListModule { }
