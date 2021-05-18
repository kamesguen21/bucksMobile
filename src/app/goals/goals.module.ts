import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {GoalsRoutingModule} from './goals-routing.module';
import {GoalsComponent} from './goals.component';
import {CurrencyExchangeComponent} from './currency-exchange/currency-exchange.component';
import {StockExchangeComponent} from './stock-exchange/stock-exchange.component';
import {CurrencyExchangeOperationComponent} from './currency-exchange/currency-exchange-operation/currency-exchange-operation.component';
import {StockViewComponent} from './stock-exchange/stock-view/stock-view.component';
import {StockDetailsComponent} from './stock-exchange/stock-details/stock-details.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GoalsRoutingModule
  ],
  declarations: [
    GoalsComponent,
    CurrencyExchangeComponent,
    StockExchangeComponent,
    CurrencyExchangeOperationComponent,
    StockDetailsComponent, StockViewComponent]
})

export class GoalsModule {
}
