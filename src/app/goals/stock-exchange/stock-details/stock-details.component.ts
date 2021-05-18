import {Component, Input, OnInit} from '@angular/core';
import {IExchange} from '../../currency-exchange/exchange';
import {ITicker, TickerDetails} from '../ticker';
import {StockExchangeServiceTest} from '../stock-exchange.service.test';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
})
export class StockDetailsComponent implements OnInit {
  @Input() ticker: ITicker = {};
  tickerDetails: TickerDetails = null;
  loading = true;

  constructor(
    public stockExchangeService: StockExchangeServiceTest,
    public modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    console.log('StockDetailsComponent ');

    if (this.ticker && this.ticker.ticker) {
      this.stockExchangeService.getTickerDetailsByTicker(this.ticker.ticker).then(res => {
        console.log('StockDetailsComponent ' + JSON.stringify(res));
        if (res && res.symbol) {
          this.tickerDetails = res;
        } else {
          this.stockExchangeService.getTickerDetails(this.ticker.ticker).subscribe(res2 => {
            console.log('StockDetailsComponent res2 ' + JSON.stringify(res2));
            if (res2 && res2.symbol) {
              this.tickerDetails = res2;
            } else {
              this.loading = false;
            }
          });
        }
      });
    }

  }


  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
