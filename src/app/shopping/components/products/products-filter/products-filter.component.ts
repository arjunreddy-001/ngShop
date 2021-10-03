import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss'],
})
export class ProductsFilterComponent implements OnInit {
  categories: any[] = [];

  @Input('activeCategory') activeCategory: any;

  constructor(private categorySvc: CategoryService) {}

  ngOnInit() {
    this.categorySvc
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }
}
