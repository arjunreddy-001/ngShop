import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  activeCategory: string | null = null;
  cart: any;

  constructor(
    private productSvc: ProductService,
    private route: ActivatedRoute,
    private cartSvc: ShoppingCartService
  ) {}

  async ngOnInit() {
    (await this.cartSvc.getCart()).subscribe((cart) => {
      this.cart = cart;
    });

    this.populateProducts();
  }

  private populateProducts() {
    this.productSvc
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.activeCategory = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.activeCategory
      ? this.products.filter((p) => p.category === this.activeCategory)
      : this.products;
  }
}
