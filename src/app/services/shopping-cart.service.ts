import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFirestore) {}

  private create() {
    return this.db.collection(`shopping-lists`).add({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .doc(`/shopping-lists/${cartId}`)
      .collection(`items`)
      .valueChanges({ idField: 'key' });
  }

  private getItem(cartId: string, productId: string) {
    return this.db
      .collection(`shopping-lists`)
      .doc(cartId)
      .collection(`items`)
      .doc(productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async add(product: any) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item.payload.exists) {
          // If item exists in shopping cart
          let quantityFromDb;

          item$
            .valueChanges()
            .pipe(take(1))
            .subscribe((itemPayload: any) => {
              console.log(itemPayload);
              quantityFromDb = itemPayload.quantity;
              item$.update({ quantity: quantityFromDb + 1 });
            });
        } else {
          // If item is not in shopping cart
          item$.set({ product: product, quantity: 1 });
        }
      });
  }
}
