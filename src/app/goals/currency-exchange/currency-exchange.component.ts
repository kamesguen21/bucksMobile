import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../../user/user-service.service';
import {ICurrency, IUser} from '../../user/User';
import {AlertController, ModalController} from '@ionic/angular';
import {CurrencyExchangeOperationComponent} from './currency-exchange-operation/currency-exchange-operation.component';
import {CurrencyExchangeService} from './currency-exchange.service';
import {DatePipe} from '@angular/common';
import {IExchange} from './exchange';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent implements OnInit {
  currencies: ICurrency[];
  user: IUser;
  path = 'assets/flag/';
  dateString = 'date';
  userCurrency: ICurrency = {};
  exchangeRates: IExchange[] = [];
  fullExchangeRates: IExchange[] = [];
  searchQuery: string;
  base = '';

  constructor(
    public userService: UserServiceService,
    public modalCtrl: ModalController,
    public currencyExchangeService: CurrencyExchangeService,
    public modalController: ModalController,
    public alertController: AlertController,
    public datepipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.userService.getCurrencies().then(currencies => {
      console.log(currencies);
      this.currencies = currencies;
      this.userService.get().then(res => {
        if (res && res.id && res.currency) {
          this.user = res;
          this.userCurrency = this.findCurrency(this.user.currency);
          this.base = this.userCurrency.key;
          this.configureCurrencies();
        }
      });

    });
  }

  switchBase(key: string) {
    this.userCurrency = this.findCurrency(key);
    if (this.userCurrency) {
      this.base = this.userCurrency.key;
      this.configureCurrencies();
    }

  }

  configureCurrencies() {
    this.exchangeRates = [];
    this.fullExchangeRates = [];
    this.currencyExchangeService.getBase(this.base).subscribe(exchange => {
      if (exchange[this.dateString]) {
        const dateString = exchange[this.dateString] + 'T00:00:00';
        const newDate = new Date(dateString);
        newDate.setDate(newDate.getDate() - 1);
        const lastDay = this.datepipe.transform(newDate, 'yyyy-MM-dd');
        console.log('data' + lastDay);
        this.currencyExchangeService.getBaseByDate(this.base, lastDay).subscribe(lastExchange => {
          for (let [key, value] of Object.entries(exchange[this.base.toLowerCase()])) {
            console.log(key + ':' + value);
            // @ts-ignore
            value = value * 1;
            // @ts-ignore
            let lastRate = value * 1;
            for (const [key2, value2] of Object.entries(lastExchange[this.base.toLowerCase()])) {
              if (key === key2) {
                // @ts-ignore
                lastRate = 1 * value2;
                break;
              }
            }
            // @ts-ignore
            const perc: number = (((lastRate) - (1 * value)) / (1 * value)) * 100;
            const exchangeData: IExchange = {
              base: this.base.toLowerCase(),
              to: key,
              value,
              changePerc: perc,
              currency: this.findCurrency(key),
              hide: false,
            };
            this.exchangeRates.push(exchangeData);
          }
          const ratess: IExchange[] = [];
          for (const currency of this.currencies) {
            const rate = this.exchangeRates.find(rr => rr.to.toLowerCase() === currency.key.toLowerCase());
            if (rate && rate.to.toLowerCase() !== this.base.toLowerCase()) {
              ratess.push(rate);
            }
          }
          this.exchangeRates = ratess;
          this.fullExchangeRates = ratess;
        }, error2 => {
          this.presentAlert();
        });
      }
    }, error1 => {
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Network issue',
      message: 'please verify that you\'re connected to the internet.',
      buttons: ['OK']
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  findCurrency(curr) {
    return this.currencies.find(cc => cc.key.toLowerCase() === curr.toLowerCase());
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async currencyExchange() {
    const modal = await this.modalController.create({
      component: CurrencyExchangeOperationComponent,
      componentProps: {
        exchangeRates: this.fullExchangeRates,
        user: this.user,
        currencies: this.currencies
      }
    });
    this.onDismiss(modal.onDidDismiss());

    return await modal.present();
  }

  handleSearch() {
    this.exchangeRates = this.fullExchangeRates;
    if (this.searchQuery && this.searchQuery.length > 0) {
      this.exchangeRates = this.exchangeRates.filter(cc => cc.to.toLowerCase().includes(this.searchQuery));
    } else {
      this.exchangeRates = this.fullExchangeRates;
    }
  }

  private onDismiss(onDidDismiss: Promise<any>) {
    onDidDismiss.then(data => {
      console.log(data);
    });
  }
}
