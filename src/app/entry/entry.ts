export interface IEntry {
  id?: number;
  title?: string;
  type?: string;
  amount?: number;
  date?: Date;
  categoryId?: number;
}

export class Entry implements IEntry {
  constructor(
    public id?: number,
    public title?: string,
    public type?: string,
    public amount?: number,
    public date?: Date,
    public categoryId?: number
  ) {
  }
}
