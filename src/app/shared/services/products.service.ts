import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products = new BehaviorSubject<Product[]>([]);
  public readonly products$ = this._products.asObservable();
  private _errorMessage = new BehaviorSubject<string>('');
  public readonly errorMessage$ = this._errorMessage.asObservable();
  private _loading = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  get products() {
    return this._products.getValue();
  }

  set products(val) {
    this._products.next(val);
  }

  get loading() {
    return this._loading.getValue();
  }

  set loading(val: boolean) {
    this._loading.next(val);
  }

  set errorMessage(val: string) {
    this._errorMessage.next(val);
  }

  get errorMessage() {
    return this._errorMessage.getValue();
  }

  async index() {
    try {
      this.loading = true
      const products = await this.http.get<Product[]>(`${this.apiUrl}/products`).toPromise();
      this.loading = false
      this.products = products.reverse();
    } catch(e) {
      this.loading = false
      this._errorMessage.next('Ocorreu um erro ao tentar buscar os produtos.');
    }
  }

  async create(product, cb: Function) {
    try {
      const formData = new FormData();
      formData.append('image', product.image);
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      this.loading = true;
      const response = await this.http.post<Product>(`${this.apiUrl}/products`, product).toPromise();
      this.loading = false;
      this.products = [ response, ...this.products ];
      cb();
    } catch(e) {
      this.loading = false;
      this._errorMessage.next('Ocorreu um erro ao tentar cadastrar o produto.');
    }
  }

  async update(product, cb: Function) {
    try {
      const formData = new FormData();
      formData.append('image', product.image);
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);

      this.loading = true;
      let response = await this.http.put<Product>(`${this.apiUrl}/products/${product.id}`, product).toPromise();
      this.loading = false;
      this.products = this.products.map(p => {
        if (p.id === product.id) {
          return response;
        }
        return p
      })
      cb();
    } catch(e) {
      this._errorMessage.next('Ocorreu um erro ao tentar atualizar o produto.');
    }
  }

  async delete(id, cb: Function) {
    try {
      this.loading = true;
      const response = await this.http.delete(`${this.apiUrl}/products/${id}`).toPromise();
      this.loading = false;
      this.products = this.products.filter(p => p.id !== id);
      cb();
    } catch(e) {
      this.loading = false;
      this._errorMessage.next('Ocorreu um erro ao tentar excluir o produto.');
    }
  }
}
