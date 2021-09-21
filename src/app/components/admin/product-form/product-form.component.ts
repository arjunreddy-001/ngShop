import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$: any;

  constructor(
    private categorySvc: CategoryService,
    private productSvc: ProductService
  ) {
    this.categorySvc
      .getCategories()
      .subscribe((categories: any) => (this.categories$ = categories));
  }

  ngOnInit(): void {}

  saveProduct(product: Product) {
    console.log(product);
    this.productSvc.create(product);
    console.log('product added');
  }
}
