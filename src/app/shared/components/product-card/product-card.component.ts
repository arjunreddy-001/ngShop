import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product: any;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartSvc: ShoppingCartService) {}

  addToCart() {
    this.cartSvc.add(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.filter(
      (cartItem: any) => cartItem.key === this.product.key
    );

    return item.length > 0 ? item[0].quantity : 0;
  }
}
