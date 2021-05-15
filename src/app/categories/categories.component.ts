import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CategoryAddComponent} from './category-add/category-add.component';
import {IEntry} from '../entry/entry';
import {ICategory} from './category';
import {CategoriesService} from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(
    public modalController: ModalController,
    public categoriesService: CategoriesService
  ) {
  }

  ngOnInit() {
    this.getCategories();
  }

  ionViewDidEnter() {
    console.log('hello category');
    this.getCategories();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CategoryAddComponent,
      componentProps: {}
    });
    this.onDismiss(modal.onDidDismiss());

    return await modal.present();
  }

  private getCategories() {
    this.categoriesService.get().then(data => {
      this.categories = data;
    });
  }

  private onDismiss(onDidDismiss: Promise<any>) {
    onDidDismiss.then(data => {
      console.log(data);
      const category: ICategory = data.data.category;
      if (category) {
        this.categoriesService.save(category).then(() => {
          this.getCategories();
        });
      }
    });
  }
}
