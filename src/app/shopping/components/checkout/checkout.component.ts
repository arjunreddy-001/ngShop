import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart!: ShoppingCart;
  cartSubscription!: Subscription;

  constructor(private cartSvc: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
    let cart$ = await this.cartSvc.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
