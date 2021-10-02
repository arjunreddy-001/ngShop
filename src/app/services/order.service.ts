import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../models/order.model';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFirestore,
    private cartSvc: ShoppingCartService
  ) {}

  async placeOrder(order: Order) {
    let result = await this.db
      .collection(`orders`)
      .add(JSON.parse(JSON.stringify(order)));
    this.cartSvc.clear();
    return result;
  }

  getOrders() {
    return this.db.collection(`orders`).valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db
      .collection('orders', (ref) => {
        return ref.where('userId', '==', userId);
      })
      .valueChanges();
  }
}
