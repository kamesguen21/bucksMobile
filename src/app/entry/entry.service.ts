import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../user/User';
import {Observable} from 'rxjs';
import {IEntry} from './entry';
import {DbService} from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  constructor(
    public http: HttpClient,
    public dbService: DbService
  ) {
    console.log('Hello ServicesUsersProvider Provider');
  }


  save(entry: IEntry): Promise<void> {
    return this.dbService.createEntry(entry);
  }

  put(entry: IEntry): Promise<void> {
    return this.dbService.updateEntry(entry);

  }

  get(): Promise<IEntry[]> {
    return this.dbService.getEntries();
  }

  getOne(id: string): Promise<IEntry> {
    return this.dbService.getEntry(id);

  }
}
