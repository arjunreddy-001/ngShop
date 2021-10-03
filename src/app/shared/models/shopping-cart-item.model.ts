import { Product } from './product.model';

export interface ShoppingCartItem {
  key: string;
  product: Product;
  quantity: number;
}
