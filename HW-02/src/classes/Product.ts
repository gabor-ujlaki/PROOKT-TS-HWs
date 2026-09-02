import { IProduct, Currency, UoM } from '../interfaces/IBaseProduct';

export class Product implements IProduct { 
    private _id: string;
    private _name: string;
    private _price: number;
    private _currency: Currency;
    private _uom: UoM;
    private _description?: string;

    constructor(id: string, name: string, price: number, currency: Currency, uom: UoM, description?: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._currency = currency;
        this._uom = uom;
        this._description = description;
    }

    public get id(): string {
        return this._id;
    }
    
    public get name(): string {
        return this._name;
    }
    
    public get price(): number {
        return this._price;

    }
    
    public get currency(): Currency {
        return this._currency;
    }

    public get uom(): UoM {
        return this._uom;
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
            name: this._name,
            price: this._price,
            currency: this._currency,
            uom: this._uom,
            description: this._description,
        }
    }

    public printProduct(): void {
        console.log(`ID: ${this._id} | Termék: ${this._name} | Egys.Ár: ${this._price} ${this._currency} | Menny.Egys.: ${this._uom} | Leírás: ${this._description}`);
    }
}