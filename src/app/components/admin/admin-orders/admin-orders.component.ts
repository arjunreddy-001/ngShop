import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders: any;
  ordersSubscription: Subscription = new Subscription();

  constructor(private orderSvc: OrderService) {
    let orders$ = this.orderSvc.getOrders();
    orders$.subscribe((orders) => (this.orders = orders));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}
