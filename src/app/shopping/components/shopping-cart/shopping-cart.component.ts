import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: any;
  cartQuantity: number = 0;
  cartTotal: number | null = null;
  cartSubscription: Subscription | undefined;

  constructor(private cartSvc: ShoppingCartService) {}

  async ngOnInit(): Promise<any> {
    let cart$ = await this.cartSvc.getCart();

    this.cartSubscription = cart$.subscribe((cart) => {
      this.cartItems = cart.items;
      this.cartQuantity = cart.cartQuantity;
      this.cartTotal = cart.cartTotal;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  clearCart() {
    this.cartSvc.clear();
  }
}
