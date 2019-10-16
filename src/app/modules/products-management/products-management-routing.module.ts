import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsManagementComponent } from './products-management.component';

const routes: Routes = [{ path: '', component: ProductsManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManagementRoutingModule {}
