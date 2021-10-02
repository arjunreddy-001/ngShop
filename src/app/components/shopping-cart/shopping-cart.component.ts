import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

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
    this.cartSubscription = cart$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.cartQuantity = this.cartSvc.getCartQuantity(cartItems);
      this.cartTotal = cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  clearCart() {
    this.cartSvc.clear();
  }
}
