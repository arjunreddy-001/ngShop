import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  create(product: Product) {
    return this.db.collection(`products`).add(product);
  }

  getAll() {
    return this.db.collection(`products`).valueChanges({ idField: 'key' });
  }

  get(productId: string) {
    return this.db.collection(`products`).doc(productId).valueChanges();
  }

  update(productId: string, product: Product) {
    return this.db.collection(`products`).doc(productId).update(product);
  }

  delete(productId: string) {
    return this.db.collection(`products`).doc(productId).delete();
  }
}
