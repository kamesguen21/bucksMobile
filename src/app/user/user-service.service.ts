import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICurrency, IUser, User} from './User';
import {Observable} from 'rxjs';
import {DbService} from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(public http: HttpClient, public dbService: DbService) {
    console.log('Hello ServicesUsersProvider Provider');
  }


  save(user: IUser): Promise<void> {
    return this.dbService.createUser(user);
  }

  put(user: IUser): Promise<void> {
    return this.dbService.updateUser(user);
  }

  get(): Promise<User> {
    return this.dbService.getUser();
  }

  getCurrencies(): Promise<ICurrency[]> {
    return this.dbService.getCurrencies();
  }

  getCurrency(key: string): Promise<ICurrency> {
    return this.dbService.getCurrency(key);
  }
}
