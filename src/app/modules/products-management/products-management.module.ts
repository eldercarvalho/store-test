import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { NgxCurrencyModule } from "ngx-currency";
import { ProductsManagementRoutingModule } from './products-management-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProductsManagementComponent } from './products-management.component';
import { ProductDialogComponent } from './components/ProductDialog/ProductDialog.component';
import { DeleteProductDialogComponent } from './components/DeleteProductDialog/DeleteProductDialog.component';


@NgModule({
  imports: [
    CommonModule,
    ProductsManagementRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  entryComponents: [
    DeleteProductDialogComponent,
    ProductDialogComponent
  ],
  declarations: [
    ProductsManagementComponent,
    ProductDialogComponent,
    DeleteProductDialogComponent
  ]
})
export class ProductsManagementModule { }
