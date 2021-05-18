import {ICurrency} from '../../user/User';

export interface IExchange {
  base?: string;
  to?: string;
  value?: number | any;
  changePerc?: number;
  currency?: ICurrency;
  hide?: boolean;
}

export class Exchange implements IExchange {
  constructor(
    public base?: string,
    public to?: string,
    public value?: number | any,
    public changePerc?: number,
    public currency?: ICurrency,
    public hide?: boolean
  ) {
  }
}

export interface IExchangeOperation {
  amount?: number;
  from?: string;
  to?: string;
}

export class ExchangeOperation implements IExchangeOperation {
  constructor(
    public amount?: number,
    public from?: string,
    public to?: string
  ) {
  }
}

