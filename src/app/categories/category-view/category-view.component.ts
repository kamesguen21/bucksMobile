import {Component, Input, OnInit} from '@angular/core';
import {IEntry} from '../../entry/entry';
import {ICategory} from '../category';
import {EntryService} from '../../entry/entry.service';
import {CategoryAddComponent} from '../category-add/category-add.component';
import {ModalController} from '@ionic/angular';
import {CategoryDetailsComponent} from '../category-details/category-details.component';
import {CategoriesService} from '../categories.service';
import {UserServiceService} from '../../user/user-service.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {
  @Input() category: ICategory;
  currency = '';

  constructor(
    public entryService: EntryService,
    public modalController: ModalController,
    public  userServiceService: UserServiceService
  ) {
  }

  ngOnInit() {
    this.entryService.getByCategoryId(this.category.id).then(entries => {
      console.log(entries);
      this.category.entries = entries;
      let amount = 0;
      for (const entry of entries) {
        switch (entry.type) {
          case 'in':
            amount += entry.amount;
            break;
          case 'out':
            amount -= entry.amount;
        }
      }
      this.category.balance = amount;
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: CategoryDetailsComponent,
      componentProps: {
        category: this.category
      }
    });
    this.onDismiss(modal.onDidDismiss());

    return await modal.present();
  }

  openCategory() {
    this.presentModal();
  }

  private onDismiss(onDidDismiss: Promise<any>) {
    onDidDismiss.then(data => {
      console.log(data);
    });
  }
}
