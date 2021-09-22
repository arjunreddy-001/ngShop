import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products$: any;

  constructor(private productScv: ProductService) {
    this.productScv.getAll().subscribe((products) => {
      this.products$ = products;
    });
  }

  ngOnInit(): void {}
}
