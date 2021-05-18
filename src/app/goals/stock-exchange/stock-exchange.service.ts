import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EOD, ITicker, TickerDetails, TickersResponse} from './ticker';
import {DatePipe} from '@angular/common';
import {DbService} from '../../services/db.service';
import {ICategory} from '../../categories/category';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {
  EodUrl = 'http://api.marketstack.com/v1/eod';
  tickerUrl = 'http://api.marketstack.com/v1/tickers?limit=5&access_key=';
  key = 'd6d0764b4e7d5dfbaed4cf7a5446033e';
  polygonKey = 'EJPQpCO2HhyTMR15kOVwpKmmkjiB39Rz';
  polygonUrl = 'https://api.polygon.io/v1/meta/symbols/';

  constructor(
    public http: HttpClient,
    public dbService: DbService,
    public datepipe: DatePipe
  ) {
  }

  getLastWeekEods(symbols: string[]): Observable<EOD> {
    const symbolsString = symbols.join(',');
    const today = new Date();
    const todaystr = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    today.setDate(today.getDate() - 7);
    const lastweek = this.datepipe.transform(today, 'yyyy-MM-dd');
    console.log('data' + lastweek + today);
    return this.http.get<EOD>(this.EodUrl + `?access_key=${this.key}&symbols=${symbolsString}&date_from=${lastweek}&data_to=${todaystr}`);
  }

  getTickers(): Observable<TickersResponse> {
    return this.http.get<TickersResponse>(this.tickerUrl + this.key);
  }

  getTickerDetails(id: string): Observable<TickerDetails> {
    return this.http.get<TickerDetails>(this.polygonUrl + `${id}/company?&apiKey=${this.polygonKey}`);
  }

  getLastApiCall(): Promise<boolean> {
    return this.dbService.getLastApiCall();
  }

  getDbTickers(): Promise<ITicker[]> {
    return this.dbService.getTodaysTickers();
  }

  getLastApiCalls(): Promise<any[]> {
    return this.dbService.getLastApiCalls();
  }

  saveLastApiCall(): Promise<any> {
    return this.dbService.saveLastApiCall();
  }

  createTickerDetails(ticker: TickerDetails): Promise<any> {
    return this.dbService.createTickerDetails(ticker);
  }

  createTicker(ticker: ITicker): Promise<any> {
    return this.dbService.createTicker(ticker);
  }

  getTodaysTickers(): Promise<ITicker[]> {
    return this.dbService.getTodaysTickers();
  }

  getTickerDetailsByTicker(ticker: string): Promise<TickerDetails> {
    return this.dbService.getTickerDetailsByTicker(ticker);
  }
  getAllTickerDetails(): Promise<TickerDetails[]> {
    return this.dbService.getAllTickerDetails();
  }
}
