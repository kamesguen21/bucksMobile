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
export class StockExchangeServiceTest {
  url = 'http://localhost:3000/';

  constructor(
    public http: HttpClient,
    public dbService: DbService,
    public datepipe: DatePipe
  ) {
  }

  getLastWeekEods(symbols: string[]): Observable<EOD> {
    return this.http.get<EOD>(this.url + `eod`);
  }

  getTickers(): Observable<TickersResponse> {
    return this.http.get<EOD>(this.url + `tickers`);
  }

  getTickerDetails(id: string): Observable<TickerDetails> {
    return this.http.get<TickerDetails>(this.url + `details?symbol=${id}`);
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
