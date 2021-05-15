export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  currency?: string;
  spent?: number;
  earned?: number;
  balance?: number;
}

export class User implements IUser {
  constructor(
    public id?: number,
    public name?: string,
    public currency?: string,
    public email?: string,
    public spent?: number,
    public earned?: number,
    public balance?: number
  ) {
  }
}
