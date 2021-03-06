import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order.model';
import { Shipping } from 'shared/models/shipping.model';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart!: ShoppingCart;

  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };

  userId!: string;
  authSubscription!: Subscription;

  constructor(
    private router: Router,
    private orderSvc: OrderService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authSvc.user$.subscribe(
      (user: any) => (this.userId = user.uid)
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let orderResponse = await this.orderSvc.placeOrder(order);

    this.router.navigate(['order-success', orderResponse.id]);
  }
}
