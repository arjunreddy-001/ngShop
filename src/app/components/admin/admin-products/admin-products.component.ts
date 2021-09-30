import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnDestroy {
  products: any[] = [];
  dataSource: any;
  items: any[] = [];
  itemsCount: number = 0;
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'price', 'edit'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private productScv: ProductService) {
    this.subscription = this.productScv.getAll().subscribe((products) => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initializeTable(products: any): void {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(query: any) {
    let filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.initializeTable(filteredProducts);
  }
}
