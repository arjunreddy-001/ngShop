import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  activeCategory: string | null = null;

  constructor(
    private productSvc: ProductService,
    private categorySvc: CategoryService,
    private route: ActivatedRoute
  ) {
    this.productSvc
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.activeCategory = params.get('category');

        this.filteredProducts = this.activeCategory
          ? this.products.filter((p) => p.category === this.activeCategory)
          : this.products;
      });

    this.categorySvc
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnInit(): void {}
}
