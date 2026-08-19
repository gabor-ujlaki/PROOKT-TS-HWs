export class Book {
  private _id: string;
  private _title: string;
  private _author: string;
  private _price: number;
  private _status: string;

  constructor(id: string, title: string, author: string, price: number, status: string = 'available') {
    this._id = id;
    this._title = title;
    this._author = author;
    this._price = price;
    this._status = status;
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get author(): string {
        return this._author;
    }

    public get price(): number {
        return this._price;
    }

    public get status(): string {
        return this._status;
    }

    public set status(value: string) {
        this._status = value;
    }
}
