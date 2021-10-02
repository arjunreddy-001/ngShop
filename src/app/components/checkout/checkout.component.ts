import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Shipping } from 'src/app/models/shipping.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };

  cart!: ShoppingCart;
  cartSubscription!: Subscription;
  userId!: string;
  authSubscription!: Subscription;

  constructor(
    private cartSvc: ShoppingCartService,
    private orderSvc: OrderService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    let cart$ = await this.cartSvc.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
    this.authSubscription = this.authSvc.user$.subscribe(
      (user: any) => (this.userId = user.uid)
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let orderResponse = await this.orderSvc.placeOrder(order);

    this.router.navigate(['order-success', orderResponse.id]);
  }
}
