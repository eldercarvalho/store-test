import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { PurchasesComponent } from './purchases.component';
import { PurchasesRoutingMoudule } from './purchases-routing.module';
import { PurchaseOrdersDialogComponent } from './components/PurchaseOrdersDialog/PurchaseOrdersDialog.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PurchasesRoutingMoudule,
    ComponentsModule
  ],
  entryComponents: [ PurchaseOrdersDialogComponent ],
  declarations: [PurchasesComponent, PurchaseOrdersDialogComponent]
})
export class PurchasesModule { }
