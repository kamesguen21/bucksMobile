import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {IExchange, IExchangeOperation} from '../exchange';
import {ICurrency, IUser} from '../../../user/User';
import {NgForm} from '@angular/forms';
import {CurrencyExchangeService} from '../currency-exchange.service';

@Component({
  selector: 'app-currency-exchange-operation',
  templateUrl: './currency-exchange-operation.component.html',
  styleUrls: ['./currency-exchange-operation.component.scss'],
})
export class CurrencyExchangeOperationComponent implements OnInit {
  @Input() exchangeRates: IExchange[] = [];
  @Input() currencies: ICurrency[] = [];
  @Input() user: IUser = {};
  exchangeOperation: IExchangeOperation = {};
  path = 'assets/flag/';
  result: string;
  loading: any = null;
  @Input() base = '';

  constructor(
    public modalCtrl: ModalController,
    public currencyExchangeService: CurrencyExchangeService,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    if (this.base.length === 0) {
      this.base = this.user.currency;

    }
    this.exchangeOperation = {
      amount: 0,
      from: this.base,
      to: this.findNextCurrency(this.base).key
    };
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  convert(form: NgForm) {
    if (form.status === 'VALID') {
      this.findRate(this.exchangeOperation.from, this.exchangeOperation.to);
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 50
    });
    await loading.present();

    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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

  private findNextCurrency(currency: string) {
    return this.currencies.find(cc => cc.key.toLowerCase() !== currency.toLowerCase());
  }

  private findRate(from: string, to: string) {
    this.presentLoading();
    this.currencyExchangeService.get(from, to).subscribe(res => {
      if (res[to.toLowerCase()]) {
        const rate = res[to.toLowerCase()];
        const result = this.exchangeOperation.amount * rate;
        this.result = result.toFixed(4);
      }
    }, error1 => {
      this.presentAlert();
    });
  }
}
