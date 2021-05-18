import {Component, OnInit} from '@angular/core';
import {StockExchangeService} from './stock-exchange.service';
import {DataEntity, DataEntity2, ITicker, TickerDetails} from './ticker';
import {forkJoin} from 'rxjs';
import {StockExchangeServiceTest} from './stock-exchange.service.test';
import {DatePipe} from '@angular/common';
import {UserServiceService} from '../../user/user-service.service';
import {AlertController, ModalController} from '@ionic/angular';
import {CurrencyExchangeService} from '../currency-exchange/currency-exchange.service';

@Component({
  selector: 'app-stock-exchange',
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.scss'],
})
export class StockExchangeComponent implements OnInit {
  tickers: ITicker[] = [];
  private tickersDetails: TickerDetails[] = [];

  constructor(
    public stockExchangeService: StockExchangeService,
    public datepipe: DatePipe,
    public userService: UserServiceService,
    public modalCtrl: ModalController,
    public modalController: ModalController,
    public alertController: AlertController,
  ) {
  }

  test() {
    this.stockExchangeService.getLastApiCall().then(res => {
      console.log('ngOnInit' + res);
      this.stockExchangeService.saveLastApiCall().then(res2 => {
        console.log('ngOnInit2' + res2);
        this.stockExchangeService.getLastApiCalls().then(res4 => {
          console.log('res4' + res4);
          this.stockExchangeService.getLastApiCall().then(res3 => {
            console.log('ngOnInitres3' + res3);
            this.stockExchangeService.getLastApiCalls().then(res5 => {
              console.log('res5' + res5);

            });
          });
        });

      });
    });
  }

  prepareTickers() {
    this.stockExchangeService.getLastApiCall().then(test => {
      if (!test) {
        this.stockExchangeService.getDbTickers().then(dbticks => {
          if (dbticks && dbticks.length > 0) {
            this.tickers = dbticks;
          } else {
            this.stockExchangeService.getTickers().subscribe(apiticks => {
              if (apiticks && apiticks.data && apiticks.data.length > 0) {
                const data: DataEntity[] = apiticks.data;
                const requests = [];
                for (const datum of data) {
                  requests.push(this.stockExchangeService.getTickerDetails(datum.symbol));
                }
                forkJoin(requests).subscribe((results: TickerDetails[]) => {
                  console.log(' this.results  ' + JSON.stringify(results));
                  const dbreq = [];
                  for (const result of results) {
                    if (result) { // TODO:remeber to remove [0]
                      this.tickersDetails.push(result);
                    }
                  }
                  console.log(' this.tickersDetails  ' + JSON.stringify(this.tickersDetails));

                  for (const resut of this.tickersDetails) {
                    dbreq.push(this.stockExchangeService.createTickerDetails(resut));
                  }
                  forkJoin(dbreq).subscribe(dbresults => {
                    const symbols = [];
                    for (const datum of data) {
                      symbols.push(datum.symbol);
                    }
                    this.stockExchangeService.getAllTickerDetails().then(erwww => {
                      console.log('getAllTickerDetails ' + JSON.stringify(erwww));
                    });
                    this.stockExchangeService.getLastWeekEods(symbols).subscribe(eods => {
                      if (eods.data) {
                        const eodMap = new Map();
                        for (const symbol of symbols) {
                          eodMap.set(symbol, []);
                        }
                        for (const [key, value] of eodMap) {
                          console.log(key, value);
                          const val = [];
                          for (const result of eods.data) {
                            if (result.symbol.toLowerCase() === key.toLowerCase()) {
                              val.push(result);
                            }
                          }
                          eodMap.set(key, val);
                        }
                        for (const [key, value] of eodMap) {
                          console.log(key, value);
                          let tik1: DataEntity2 = null;
                          let tik2: DataEntity2 = null;
                          for (const eodVal of value) {
                            if (!tik1) {
                              tik1 = eodVal;
                            }
                            if (tik1 && !this.isDateSupp(tik1.date, eodVal.date)) {
                              tik1 = eodVal;
                            }
                          }
                          for (const eodVal of value) {
                            if (!tik2 && this.isDateSupp(tik1.date, eodVal.date)) {
                              tik2 = eodVal;
                            }
                            if (tik2 && tik1 && !this.isDateSupp(tik2.date, eodVal.date) && !this.isDateSupp(tik2.date, tik1.date)) {
                              tik2 = eodVal;
                            }
                          }
                          eodMap.set(key, [tik1, tik2]);
                        }
                        for (const [key, value] of eodMap) {
                          console.log('FinaleodMap ' + key + ' ' + JSON.stringify(value));

                          if (value[0] && value[1]) {
                            this.tickers.push({
                              date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
                              ticker: key,
                              todaysChange: this.getTodaysChange(value[0], value[1]),
                              todaysChangePerc: this.getTodaysChangePerc(value[0], value[1]),
                              closeVal: value[0].close
                            });
                          }
                        }
                        console.log('FinalTicks' + JSON.stringify(this.tickers));
                        const tickreq = [];
                        for (const ticker of this.tickers) {
                          tickreq.push(this.stockExchangeService.createTicker(ticker));
                        }
                        forkJoin(tickreq).subscribe(fdfdfs => {
                          this.stockExchangeService.saveLastApiCall().then();
                        });
                      }
                    });

                  });
                });
              }
            });
          }
        });
      } else {
        this.stockExchangeService.getDbTickers().then(dbticks => {
          if (dbticks && dbticks.length > 0) {
            this.tickers = dbticks;
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

  ngOnInit() {
    this.prepareTickers();
  }

  private isDateSupp(date: string, date2: any | Date) {
    const d1 = new Date(date);
    const d2 = new Date(date2);
    return d1.getTime() > d2.getTime();
  }

  private getTodaysChange(d1: DataEntity2, d0: DataEntity2) {
    return d1.adj_close - d0.adj_close;
  }

  private getTodaysChangePerc(d1: DataEntity2, d0: DataEntity2) {

    return ((d1.adj_close - d0.adj_close) / d1.adj_close) * 100;
  }
}
