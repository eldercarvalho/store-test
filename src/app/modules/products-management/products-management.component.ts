import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProductsService } from 'src/app/shared/services/products.service';
import { ProductDialogComponent } from './components/ProductDialog/ProductDialog.component';
import { DeleteProductDialogComponent } from './components/DeleteProductDialog/DeleteProductDialog.component';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'imageUrl', 'name', 'description',  'price', 'actions'];
  products = new MatTableDataSource([]);
  productsSubscription: Subscription;
  errorMessageSubscription: Subscription;


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productsSubscription = this.productsService.products$.subscribe(products => this.products.data = products);
    this.errorMessageSubscription = this.productsService.errorMessage$.subscribe(message => {
      if (message) {
        console.log(message);
        this.productsService.errorMessage = '';
        this.snackBar.open(message, 'Fechar');
      }
    });
    this.products.sort = this.sort;
    this.products.paginator = this.paginator;
    this.productsService.index();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.errorMessageSubscription.unsubscribe();
  }

  openDialog(action: string, product: any) {
    if (action === 'create' || action === 'edit') {
      let dialogRef = this.dialog.open(ProductDialogComponent, {
        width: "400px",
        data: { action, product }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackBar.open(`Produto ${action === 'create' ? 'cadastrado' : 'atualizado' } com sucesso!`, '' ,{
            duration: 3000
          });
        }
      });
    } else if (action === 'delete') {
      let dialogRef = this.dialog.open(DeleteProductDialogComponent, {
        width: "350px",
        data: { product }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackBar.open(`Produto excluído com sucesso!`, '' ,{
            duration: 3000
          });
        }
      });
    }
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();
  }
}
