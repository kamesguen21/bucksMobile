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

export interface ICurrency {
  key?: string;
  name?: string;
  symbol?: string;
  flag?: string;
}

export class Currency implements ICurrency {
  constructor(
    public key?: string,
    public name?: string,
    public symbol?: string,
    public flag?: string,
  ) {
  }
}
