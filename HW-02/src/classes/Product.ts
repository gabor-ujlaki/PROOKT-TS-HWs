import { IProduct, Currency, UoM } from '../interfaces/IBaseProduct';

export class Product implements IProduct { 
    private _id: string;
    private name: string;
    private _price: number;
    private currency: Currency;
    private uom: UoM;
    private _description?: string;

    constructor(id: string, name: string, price: number, currency: Currency, uom: UoM, description?: string) {
        this._id = id;
        this.name = name;
        this._price = price;
        this.currency = currency;
        this.uom = uom;
        this._description = description;
    }

    public get id(): string {
        return this._id;
    }

    public get price(): number {
        return this._price;

    }

    public set price(newPrice: number) {
        this._price = newPrice;
    }

    public set description(newDescription: string) {
        this._description = newDescription;
    }

    public getProductDetails() {
        return {
            id: this._id,
            name: this.name,
            price: this._price,
            currency: this.currency,
            uom: this.uom,
            description: this._description,
        }
    }

    public printProduct(): void {
        console.log(`ID: ${this._id} | Termék: ${this.name} | Egys.Ár: ${this._price} ${this.currency} | Menny.Egys.: ${this.uom} | Leírás: ${this._description}`);
    }
}