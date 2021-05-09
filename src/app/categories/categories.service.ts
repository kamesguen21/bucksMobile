import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DbService} from '../services/db.service';
import {IEntry} from '../entry/entry';
import {ICategory} from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    public http: HttpClient,
    public dbService: DbService
  ) {
    console.log('Hello ServicesUsersProvider Provider');
  }

  save(entry: ICategory): Promise<void> {
    return this.dbService.createCategory(entry);
  }

  put(entry: ICategory): Promise<void> {
    return this.dbService.updateCategory(entry);

  }

  get(): Promise<ICategory[]> {
    return this.dbService.getCategories();
  }

  getOne(id: string): Promise<ICategory> {
    return this.dbService.getCategory(id);

  }
}
