import { Component, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss'],
})
export class ProductsFilterComponent {
  categories: any[] = [];

  @Input('activeCategory') activeCategory: any;

  constructor(private categorySvc: CategoryService) {
    this.categorySvc
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }
}
