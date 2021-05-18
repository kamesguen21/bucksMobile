import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GoalsComponent} from './goals.component';
import {CurrencyExchangeComponent} from './currency-exchange/currency-exchange.component';
import {CurrencyExchangeOperationComponent} from './currency-exchange/currency-exchange-operation/currency-exchange-operation.component';
import {StockExchangeComponent} from './stock-exchange/stock-exchange.component';

const routes: Routes = [
  {
    path: '',
    component: GoalsComponent,
    children: [
      {
        path: 'currency',
        component: CurrencyExchangeComponent,
      },
      {
        path: 'currency-exchange',
        component: CurrencyExchangeOperationComponent,
      },
      {
        path: 'stock',
        component: StockExchangeComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule {
}
