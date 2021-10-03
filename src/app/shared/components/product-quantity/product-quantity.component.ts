import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input('product') product: any;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartSvc: ShoppingCartService) {}

  addToCart() {
    this.cartSvc.add(this.product);
  }

  removeFromCart() {
    this.cartSvc.remove(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.filter(
      (cartItem: any) => cartItem.key === this.product.key
    );

    return item.length > 0 ? item[0].quantity : 0;
  }
}
