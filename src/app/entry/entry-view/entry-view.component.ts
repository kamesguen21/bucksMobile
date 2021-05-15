import {Component, Input, OnInit} from '@angular/core';
import {IEntry} from '../entry';
import {CategoriesService} from '../../categories/categories.service';
import {ICategory} from '../../categories/category';

@Component({
  selector: 'app-entry-view',
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.scss'],
})
export class EntryViewComponent implements OnInit {
  @Input() entry: IEntry;
  category: ICategory = {};

  constructor(public  categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService.getOne(this.entry.categoryId).then(res => {
      this.category = res ? res : {};
    });
  }

}
