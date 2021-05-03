import {IEntry} from '../entry/entry';

export interface ICategory {
  id?: number;
  name?: string;
  color?: string;
  balance?: number;
  date?: Date;
  entries?: IEntry[];
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string,
    public color?: string,
    public balance?: number,
    public date?: Date,
    public entries?: IEntry[]
  ) {
  }
}
