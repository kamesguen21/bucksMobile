import {Component, Input, OnInit} from '@angular/core';
import {IEntry} from './entry';
import {NgForm} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {ICategory} from '../categories/category';
import {CategoriesService} from '../categories/categories.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  @Input() entry: IEntry = {};
  @Input() type: string;
  date: string;
  categories: ICategory[] = [];


  constructor(
    public modalCtrl: ModalController,
    public categoriesService: CategoriesService
  ) {
  }

  ngOnInit() {
    console.log('ff');
    if (this.entry.id == null) {
      this.entry.date = new Date();
    }
    this.categoriesService.get().then(res => {
      this.categories = res;
    });
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  save(form: NgForm) {
    console.log('ed');
    console.log(this.date);
    if (form.status === 'VALID') {
      this.entry.type = this.type;
      this.entry.categoryId = this.entry.categoryId ? this.entry.categoryId : 1;
      this.modalCtrl.dismiss({
        dismissed: true,
        entry: this.entry,
      });
    }
  }
}
