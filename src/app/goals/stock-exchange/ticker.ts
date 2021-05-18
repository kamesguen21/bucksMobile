export interface TickersResponse {
  pagination: Pagination;
  data?: (DataEntity)[] | any;
}

export interface EOD {
  pagination: Pagination;
  data?: (DataEntity2)[] | any;
}

export interface DataEntity {
  name: string;
  symbol: string;
  has_intraday: boolean;
  has_eod: boolean;
  country?: any;
  stock_exchange: StockExchange;
}

export interface StockExchange {
  name: string;
  acronym: string;
  mic: string;
  country: string;
  country_code: string;
  city: string;
  website: string;
}


export interface Pagination {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

export interface DataEntity2 {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_high?: any;
  adj_low?: any;
  adj_close: number;
  adj_open?: any;
  adj_volume?: any;
  split_factor: number;
  symbol: string;
  exchange: string;
  date: string;
}

export interface TickerDetails {
  logo: string;
  listdate: string;
  cik: string;
  bloomberg: string;
  figi?: null;
  lei: string;
  country: string;
  industry: string;
  sector: string;
  marketcap: number;
  employees: number;
  phone: string;
  ceo: string;
  url: string;
  description: string;
  exchange: string;
  name: string;
  symbol: string;
  exchangeSymbol: string;
  hq_address: string;
  hq_state: string;
  hq_country: string;
  type: string;
  updated: string;
  tags?: (string)[] | null;
  similar?: (string)[] | null;
  active: boolean;
}

export interface ITicker {
  ticker?: string;
  closeVal?: number;
  todaysChange?: number;
  todaysChangePerc?: number;
  type?: string;
  date?: string;
}
export interface SimpleEod {
  date: string;
  symbol: string;
  close: number;
}
