export class User {
  private _name: string;
  private _lastName: string;
  constructor() {
    this._name = '';
    this._lastName = '';
  }

  get name() {
    return this._name;
  }
  get lastName() {
    return this._lastName;
  }

  set name(name) {
    this._name = name;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }
}
