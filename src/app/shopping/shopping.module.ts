import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsFilterComponent } from './components/products/products-filter/products-filter.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { AuthGuard } from 'shared/guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';

const shoppingRoutes: Routes = [
  {
    path: 'order-success/:oid',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductsFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    CheckoutComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(shoppingRoutes)],
})
export class ShoppingModule {}
