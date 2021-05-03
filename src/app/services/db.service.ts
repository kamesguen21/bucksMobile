import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {User} from '../user/User';
import {Entry} from '../entry/entry';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  user = new BehaviorSubject({});
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
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
    const data = [1, user.email, user.name, user.balance, user.earned, user.spent];
    return this.storage.executeSql('INSERT INTO user (id,email,name,balance,earned,spent) VALUES (?,?,?,?,?,?)', data)
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
          email: res.rows.item(0).email
        };
      } else {
        return null;
      }
    });
  }

  updateUser(user: User) {
    const data = [user.email, user.name, user.balance, user.earned, user.spent];
    return this.storage.executeSql(`UPDATE user SET email = ?, name = ?, balance = ?, earned = ?, spent = ? WHERE id = ${user.id}`, data)
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
}
