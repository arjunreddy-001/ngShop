import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from 'shared/guards/auth.guard';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';

const adminRoutes: Routes = [
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products/:pid',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
];

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
  ],
  imports: [
    SharedModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NarikCustomValidatorsModule,
    RouterModule.forChild(adminRoutes),
  ],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
