import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CartComponent, PurchaseDialog } from './cart.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CartRoutingModule,
    ComponentsModule
  ],
  entryComponents: [
    PurchaseDialog
  ],
  declarations: [
    CartComponent,
    PurchaseDialog
  ]
})
export class CartModule { }
