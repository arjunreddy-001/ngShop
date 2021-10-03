import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: any;
  ordersSubscription: Subscription = new Subscription();

  constructor(private authScv: AuthService, private orderSvc: OrderService) {
    let orders$ = this.authScv.user$.pipe(
      switchMap((u: any) => {
        return this.orderSvc.getOrdersByUser(u.uid);
      })
    );

    orders$.subscribe((orders) => (this.orders = orders));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}
