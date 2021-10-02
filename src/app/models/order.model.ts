import { OrderItem } from './order-item.model';
import { Shipping } from './shipping.model';
import { ShoppingCart } from './shopping-cart.model';

export class Order {
  datePlaced: number;
  items: OrderItem[];
  totalPrice: number;
  totalQuantity: number;

  constructor(
    public userId: string,
    public shipping: Shipping,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map((item) => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price,
        },
        quantity: item.quantity,
      };
    });

    this.totalPrice = shoppingCart.cartTotal;
    this.totalQuantity = shoppingCart.cartQuantity;
  }
}
