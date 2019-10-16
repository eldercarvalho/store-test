import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ProductsManagementModule } from './pages/products-management/products-management.module';
// import { ProductsManagementComponent } from './pages/products-management/products-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './modules/products-management/products-management.module#ProductsManagementModule'
      },
      {
        path: 'products-list',
        loadChildren: './modules/products-list/products-list.module#ProductsListModule'
      },
      {
        path: 'cart',
        loadChildren: './modules/cart/cart.module#CartModule'
      },
      {
        path: 'purchases',
        loadChildren: './modules/purchases/purchases.module#PurchasesModule'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
