import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart.model';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss'],
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart: ShoppingCart = {
    items: [],
    cartQuantity: 0,
    cartTotal: 0,
  };

  constructor() {}
}
