import {Component, Input, OnInit} from '@angular/core';
import {ITicker} from '../ticker';
import {StockExchangeComponent} from '../stock-exchange.component';
import {ModalController} from '@ionic/angular';
import {StockDetailsComponent} from '../stock-details/stock-details.component';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.scss'],
})
export class StockViewComponent implements OnInit {
  @Input() ticker: ITicker = {};

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
  }

  async viewDetails() {
    const modal = await this.modalController.create({
      component: StockDetailsComponent,
      componentProps: {ticker: this.ticker}
    });
    this.onDismiss(modal.onDidDismiss());

    return await modal.present();
  }

  private onDismiss(onDidDismiss: Promise<any>) {
    onDidDismiss.then(data => {
      console.log(data);
    });
  }
}
