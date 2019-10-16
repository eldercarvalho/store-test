import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Purchase } from '../models/Purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private _purchases = new BehaviorSubject<Purchase[]>([]);
  public readonly purchases$ = this._purchases.asObservable();
  private _loading = new BehaviorSubject<boolean>(false);
  private _apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  get purchases() {
    return this._purchases.getValue();
  }

  set purchases(val) {
    this._purchases.next(val);
  }

  get loading() {
    return this._loading.getValue();
  }

  set loading(val: boolean) {
    this._loading.next(val);
  }

  async index() {
    try {
      this.loading = true;
      const response = await this.http.get<Purchase[]>(`${this._apiUrl}/purchases`).toPromise();
      this.loading = false;
      this.purchases = response.map(purchase => new Purchase().from(purchase));
    } catch(e) {
      console.log(e);
    }
  }

  create(purchase: Purchase) {
    return this.http.post(`${this._apiUrl}/purchases`, purchase);
  }

}
