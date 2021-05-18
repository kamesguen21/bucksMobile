import {Component, Input, OnInit} from '@angular/core';
import {IEntry} from '../entry';
import {CategoriesService} from '../../categories/categories.service';
import {ICategory} from '../../categories/category';
import {ICurrency} from '../../user/User';
import {UserServiceService} from '../../user/user-service.service';

@Component({
  selector: 'app-entry-view',
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.scss'],
})
export class EntryViewComponent implements OnInit {
  @Input() entry: IEntry;
  category: ICategory = {};
  currency = '';

  constructor(public  categoriesService: CategoriesService, public  userServiceService: UserServiceService) {
  }

  ngOnInit() {
    this.categoriesService.getOne(this.entry.categoryId).then(res => {
      this.category = res ? res : {};
    });
    this.userServiceService.get().then(res => {
      if (res && res.id && res.currency) {
        this.userServiceService.getCurrency(res.currency).then(cur => {
          if (cur) {
            this.currency = cur.symbol;
          }
        });
      }
    });
  }

}
