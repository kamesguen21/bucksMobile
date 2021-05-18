import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CurrencyExchangeComponent} from './currency-exchange/currency-exchange.component';
import {StockExchangeComponent} from './stock-exchange/stock-exchange.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {

  constructor(public modalController: ModalController
  ) {
  }

  ngOnInit() {
  }

  async currency() {
    const modal = await this.modalController.create({
      component: CurrencyExchangeComponent,
      componentProps: {}
    });
    this.onDismiss(modal.onDidDismiss());

    return await modal.present();
  }

  async stock() {
    const modal = await this.modalController.create({
      component: StockExchangeComponent,
      componentProps: {}
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
