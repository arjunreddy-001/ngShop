import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product.model';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  categories$: any;
  product: any = {};
  pid;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categorySvc: CategoryService,
    private productSvc: ProductService
  ) {
    this.categorySvc
      .getAll()
      .subscribe((categories: any) => (this.categories$ = categories));

    this.pid = this.route.snapshot.paramMap.get('pid');

    if (this.pid) {
      this.productSvc
        .get(this.pid)
        .pipe(take(1))
        .subscribe((p) => (this.product = p));
    }
  }

  saveProduct(product: Product) {
    if (this.pid) {
      this.productSvc.update(this.pid, product);
    } else {
      this.productSvc.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (this.pid) {
      if (!confirm('Are you sure you want to delete this product?')) return;

      this.productSvc.delete(this.pid);
      this.router.navigate(['/admin/products']);
    }
  }
}
