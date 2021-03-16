import { ProductService } from './services/products/product.service';
import { Component,ChangeDetectorRef } from '@angular/core';
import { StatusesService } from './services/statuses/statuses.service';
import { SizesService } from './services/sizes/sizes.service';
import { CategoriesService } from './services/categories/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title ="";
  value='';
counter = 0;

constructor( private statusesService: StatusesService,private sizesService: SizesService, private categoriesService: CategoriesService) {}

ngOnInit() {
  this.statusesService.loadStatuses()
  this.sizesService.loadCategories()
  this.categoriesService.loadCategories()

}

onChange(event) {
  this.value = event;
  this.counter = this.counter + 1;
}
}
