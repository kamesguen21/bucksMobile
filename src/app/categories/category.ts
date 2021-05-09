import {IEntry} from '../entry/entry';

export interface ICategory {
  id?: number;
  name?: string;
  color?: string;
  balance?: number;
  updatedAt?: Date;
  createdAt?: Date;
  entries?: IEntry[];
}
export interface IColor {
  selected?: boolean;
  color?: string;
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string,
    public color?: string,
    public balance?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public entries?: IEntry[]
  ) {
  }
}
