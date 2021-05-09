import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from '../category';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  @Input() category: ICategory;

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
