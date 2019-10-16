import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-ProductDialog',
  templateUrl: './ProductDialog.component.html',
  styleUrls: ['./ProductDialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  title: string = '';
  productForm: FormGroup;
  imageLoaded = false;

  @ViewChild('productImage', null) productImage: ElementRef;
  @ViewChild('fileInput', null) fileInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.title = this.data.action === 'create' ? 'Novo Produto' : 'Editar Produto';
    this.initForm();
  }

  initForm() {
    const name = this.data.product && this.data.product.name || '';
    const description = this.data.product && this.data.product.description || '';
    const price = this.data.product && this.data.product.price || '';
    const image = this.data.product && this.data.product.imageUrl || '';
    if (image) this.setImage(image);
    this.productForm = this.formBuilder.group({
      name: [name , Validators.required],
      description: [description, Validators.required],
      price: [price, Validators.required],
      image: ['']
    })
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.data.action === 'create') {
        this.productsService.create(this.productForm.value, () => {
          this.dialogRef.close(true);
        });
      } else {
        const product = Object.assign(this.data.product, this.productForm.value);
        this.productsService.update(product, () => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onFileSelect(event): void {
    if (event.target.files.length) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.setImage(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.productForm.get('image').setValue(event.target.files[0]);
    }
  }

  setImage(imageUrl: any): void {
    this.productImage.nativeElement.style.background = `url(${imageUrl}) center center no-repeat`;
    this.imageLoaded = true;
  }

  removeImage(): void {
    this.imageLoaded = false;
    this.fileInput.nativeElement.value = '';
    this.productForm.get('image').setValue('');
    this.productImage.nativeElement.style.background = '';
  }

}
