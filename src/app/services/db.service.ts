import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {ICurrency, User} from '../user/User';
import {Entry} from '../entry/entry';
import {Category} from '../categories/category';
import {ITicker, TickerDetails} from '../goals/stock-exchange/ticker';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  user = new BehaviorSubject({});
  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    public datepipe: DatePipe,
    private sqlPorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bucks_db.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.createTables();
        });
    });
  }

// system
  dbState() {
    return this.isDbReady.asObservable();
  }

  createTables() {
    this.httpClient.get(
      'assets/dump.sql',
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // user
  fetchUser(): Observable<User> {
    return this.user.asObservable();
  }

  createUser(user: User) {
    const data = [1, user.email, user.name, user.balance, user.earned, user.spent, user.currency];
    return this.storage.executeSql('INSERT INTO user (id,email,name,balance,earned,spent,currency) VALUES (?,?,?,?,?,?,?)', data)
      .then(res => {
        this.getUser();
      });
  }

  // Get single object
  getUser(): Promise<User> {
    return this.storage.executeSql('SELECT * FROM user WHERE id = ?', [1]).then(res => {
      if (res && res.rows && res.rows.item(0)) {
        return {
          id: res.rows.item(0).id,
          name: res.rows.item(0).name,
          balance: res.rows.item(0).balance,
          earned: res.rows.item(0).earned,
          spent: res.rows.item(0).spent,
          email: res.rows.item(0).email,
          currency: res.rows.item(0).currency
        };
      } else {
        return null;
      }
    });
  }

  updateUser(user: User) {
    const data = [user.email, user.name, user.balance, user.earned, user.spent, user.currency];
    return this.storage.executeSql(`UPDATE user SET email = ?, name = ?, balance = ?, earned = ?, spent = ?, currency = ? WHERE id = ${user.id}`, data)
      .then(data2 => {
        this.getUser();
      });
  }

  // Entries
  getEntry(id): Promise<Entry> {
    return this.storage.executeSql('SELECT * FROM entry WHERE id = ?', [id]).then(res => {
      if (res && res.rows && res.rows.item(0)) {
        return {
          id: res.rows.item(0).id,
          amount: res.rows.item(0).amount,
          date: res.rows.item(0).date,
          title: res.rows.item(0).title,
          type: res.rows.item(0).type,
          categoryId: res.rows.item(0).categoryId
        };
      } else {
        return null;
      }
    });
  }

  getEntries(): Promise<Entry[]> {
    return this.storage.executeSql('SELECT * FROM entry', []).then(res => {
      const items: Entry[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            amount: res.rows.item(i).amount,
            date: res.rows.item(i).date,
            title: res.rows.item(i).title,
            type: res.rows.item(i).type,
            categoryId: res.rows.item(i).categoryId
          });
        }
      }
      return items;
    });
  }

  getEntriesByCategoryId(categoryId: number): Promise<Entry[]> {
    return this.storage.executeSql('SELECT * FROM entry WHERE categoryId=' + categoryId, []).then(res => {
      const items: Entry[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            amount: res.rows.item(i).amount,
            date: res.rows.item(i).date,
            title: res.rows.item(i).title,
            type: res.rows.item(i).type,
            categoryId: res.rows.item(i).categoryId
          });
        }
      }
      return items;
    });
  }

  createEntry(entry: Entry) {
    const data = [entry.type, entry.title, entry.date, entry.amount, entry.categoryId];
    return this.storage.executeSql('INSERT INTO entry (type,title,date,amount,categoryId) VALUES (?,?,?,?,?)', data)
      .then(data2 => {
      });
  }

  updateEntry(entry: Entry) {
    const data = [entry.type, entry.title, entry.date, entry.amount, entry.categoryId];
    return this.storage.executeSql(
      `UPDATE entry SET type = ?, title = ?, date = ?, amount = ?, categoryId = ? WHERE id = ${entry.id}`, data
    )
      .then(data2 => {
      });
  }

  deleteEntry(id) {
    return this.storage.executeSql('DELETE FROM entry WHERE id = ?', [id])
      .then(_ => {
      });
  }

  // Categories

  getCategory(id: number): Promise<Category> {
    return this.storage.executeSql('SELECT * FROM category WHERE id = ?', [id]).then(res => {
      if (res && res.rows && res.rows.item(0)) {
        return {
          id: res.rows.item(0).id,
          name: res.rows.item(0).name,
          color: res.rows.item(0).color,
          createdAt: res.rows.item(0).createdAt,
          updatedAt: res.rows.item(0).updatedAt
        };
      } else {
        return null;
      }
    });
  }

  getCategories(): Promise<Category[]> {
    return this.storage.executeSql('SELECT * FROM category', []).then(res => {
      const items: Category[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            color: res.rows.item(i).color,
            createdAt: res.rows.item(i).createdAt,
            updatedAt: res.rows.item(i).updatedAt
          });
        }
      }
      return items;
    });
  }

  createCategory(category: Category) {
    const data = [category.name, category.color, this.datepipe.transform(new Date(), 'yyyy-MM-dd'), this.datepipe.transform(new Date(), 'yyyy-MM-dd')];
    return this.storage.executeSql('INSERT INTO category (name,color,createdAt,updatedAt) VALUES (?,?,?,?)', data)
      .then(data2 => {
      });
  }

  updateCategory(category: Category) {
    const data = [category.name, category.color, this.datepipe.transform(new Date(), 'yyyy-MM-dd')];
    return this.storage.executeSql(
      `UPDATE category SET name = ?, color = ?, updatedAt = ?, WHERE id = ${category.id}`, data
    )
      .then(data2 => {
      });
  }

  deleteCategory(id) {
    return this.storage.executeSql('DELETE FROM category WHERE id = ?', [id])
      .then(_ => {
      });
  }

  getCurrencies(): Promise<ICurrency[]> {
    return this.storage.executeSql('SELECT * FROM currency', []).then(res => {
      const items: ICurrency[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            key: res.rows.item(i).key,
            name: res.rows.item(i).name,
            symbol: res.rows.item(i).symbol,
            flag: res.rows.item(i).flag
          });
        }
      }
      return items;
    });
  }

  getCurrency(key: string): Promise<ICurrency> {
    return this.storage.executeSql('SELECT * FROM currency WHERE key = ?', [key]).then(res => {
      if (res && res.rows && res.rows.item(0)) {
        return {
          key: res.rows.item(0).key,
          name: res.rows.item(0).name,
          symbol: res.rows.item(0).symbol,
          flag: res.rows.item(0).flag,
        };
      } else {
        return null;
      }
    });
  }

  // tickers
  createTicker(ticker: ITicker) {
    const data = [
      ticker.type,
      ticker.todaysChangePerc,
      ticker.todaysChange,
      ticker.closeVal,
      ticker.ticker,
      this.datepipe.transform(new Date(), 'yyyy-MM-dd')];
    return this.storage.executeSql(
      'INSERT INTO ticker (type,todaysChangePerc,todaysChange,closeVal,ticker,date) VALUES (?,?,?,?,?,?)', data)
      .then(data2 => {
      });
  }

  getTodaysTickers(): Promise<ITicker[]> {
    return this.storage.executeSql('SELECT * FROM ticker where date= ?', [this.datepipe.transform(new Date(), 'yyyy-MM-dd')]).then(res => {
      const items: ITicker[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            type: res.rows.item(i).type,
            todaysChangePerc: res.rows.item(i).todaysChangePerc,
            todaysChange: res.rows.item(i).todaysChange,
            closeVal: res.rows.item(i).closeVal,
            ticker: res.rows.item(i).ticker,
            date: res.rows.item(i).date
          });
        }
      }
      return items;
    });
  }

  createTickerDetails(ticker: TickerDetails) {
    const data = [
      ticker.symbol,
      ticker.logo,
      ticker.listdate,
      ticker.cik,
      ticker.bloomberg,
      ticker.figi,
      ticker.lei,
      ticker.country,
      ticker.industry,
      ticker.sector,
      ticker.marketcap,
      ticker.employees,
      ticker.phone,
      ticker.ceo,
      ticker.url,
      ticker.description,
      ticker.exchange,
      ticker.name,
      ticker.exchangeSymbol,
      ticker.hq_address,
      ticker.hq_state,
      ticker.hq_country,
      ticker.type,
      ticker.updated,
      ticker.tags,
      ticker.similar,
      ticker.active,
    ];
    return this.storage.executeSql('INSERT INTO tickerDetails (symbol,logo,listdate,cik,bloomberg,figi,lei,country,industry,sector,marketcap,employees,phone,ceo,url,description,exchange,name,exchangeSymbol,hq_address,hq_state,hq_country,type,updated,tags,similar,active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data)
      .then(data2 => {
      });
  }

  getTickerDetailsByTicker(ticker: string): Promise<TickerDetails> {
    return this.storage.executeSql('SELECT * FROM tickerDetails WHERE symbol = ?', [ticker]).then(res => {
      if (res && res.rows && res.rows.item(0)) {
        return {
          symbol: res.rows.item(0).symbol,
          logo: res.rows.item(0).logo,
          listdate: res.rows.item(0).listdate,
          cik: res.rows.item(0).cik,
          bloomberg: res.rows.item(0).bloomberg,
          figi: res.rows.item(0).figi,
          lei: res.rows.item(0).lei,
          country: res.rows.item(0).country,
          industry: res.rows.item(0).industry,
          sector: res.rows.item(0).sector,
          marketcap: res.rows.item(0).marketcap,
          employees: res.rows.item(0).employees,
          phone: res.rows.item(0).phone,
          ceo: res.rows.item(0).ceo,
          url: res.rows.item(0).url,
          description: res.rows.item(0).description,
          exchange: res.rows.item(0).exchange,
          name: res.rows.item(0).name,
          exchangeSymbol: res.rows.item(0).exchangeSymbol,
          hq_address: res.rows.item(0).hq_address,
          hq_state: res.rows.item(0).hq_state,
          hq_country: res.rows.item(0).hq_country,
          type: res.rows.item(0).type,
          updated: res.rows.item(0).updated,
          tags: res.rows.item(0).tags,
          active: res.rows.item(0).active,
          similar: res.rows.item(0).similar,
        };
      } else {
        return null;
      }
    });
  }

  getAllTickerDetails(): Promise<TickerDetails[]> {
    return this.storage.executeSql('SELECT * FROM tickerDetails', []).then(res => {
      const items: TickerDetails[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            symbol: res.rows.item(i).symbol,
            logo: res.rows.item(i).logo,
            listdate: res.rows.item(i).listdate,
            cik: res.rows.item(i).cik,
            bloomberg: res.rows.item(i).bloomberg,
            figi: res.rows.item(i).figi,
            lei: res.rows.item(i).lei,
            country: res.rows.item(i).country,
            industry: res.rows.item(i).industry,
            sector: res.rows.item(i).sector,
            marketcap: res.rows.item(i).marketcap,
            employees: res.rows.item(i).employees,
            phone: res.rows.item(i).phone,
            ceo: res.rows.item(i).ceo,
            url: res.rows.item(i).url,
            description: res.rows.item(i).description,
            exchange: res.rows.item(i).exchange,
            name: res.rows.item(i).name,
            exchangeSymbol: res.rows.item(i).exchangeSymbol,
            hq_address: res.rows.item(i).hq_address,
            hq_state: res.rows.item(i).hq_state,
            hq_country: res.rows.item(i).hq_country,
            type: res.rows.item(i).type,
            updated: res.rows.item(i).updated,
            tags: res.rows.item(i).tags,
            active: res.rows.item(i).active,
            similar: res.rows.item(i).similar,
          });
        }
      }
      return items;
    });
  }

  saveLastApiCall() {
    const data = [this.datepipe.transform(new Date(), 'yyyy-MM-dd')];
    return this.storage.executeSql('INSERT INTO lastApiCall (date) VALUES (?)', data)
      .then(data2 => {
        console.log('saveLastApiCall' + data2);
      });
  }

  getLastApiCall(): Promise<boolean> {
    const date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(date);
    return this.storage.executeSql('SELECT * FROM lastApiCall where date= ? order by id desc', [date]).then(res => {
      let exists = false;
      if (res.rows.length > 0) {
        exists = true;
      }
      return exists;
    });
  }

  getLastApiCalls(): Promise<any[]> {
    const date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(date);
    return this.storage.executeSql('SELECT * FROM lastApiCall ', []).then(res => {
      if (res && res.rows && res.rows.item(0)) {
        return res.rows;
      }
    });
  }
}
