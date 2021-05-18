import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from '../category';
import {ModalController} from '@ionic/angular';
import {UserServiceService} from '../../user/user-service.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  @Input() category: ICategory;
  currency = '';

  constructor(public modalCtrl: ModalController, public  userServiceService: UserServiceService) {
  }

  ngOnInit() {
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

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
