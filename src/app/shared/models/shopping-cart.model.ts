import { ShoppingCartItem } from './shopping-cart-item.model';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[]) {}

  get cartQuantity() {
    let count = 0;
    this.items.forEach((cartItem: any) => {
      count = count + cartItem.quantity;
    });
    return count;
  }

  get cartTotal() {
    return this.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }
}
