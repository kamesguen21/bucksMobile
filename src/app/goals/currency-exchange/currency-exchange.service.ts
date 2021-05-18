import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {
  url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

  constructor(public http: HttpClient) {
  }

  get(from: string, to: string): Observable<any> {
    from = from.toLowerCase();
    to = to.toLowerCase();

    return this.http.get<any>(this.url + '/' + from + '/' + to + '.json');
  }

  getBase(base: string): Observable<any> {
    base = base.toLowerCase();
    return this.http.get<any>(this.url + '/' + base + '.json');
  }

  getBaseByDate(base: string, date: string): Observable<any> {
    base = base.toLowerCase();
    return this.http.get<any>(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${base}.json`);
  }
}
