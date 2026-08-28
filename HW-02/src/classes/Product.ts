export enum Currency {
    HUF = "HUF",
    EUR = "EUR",
    USD = "USD"
}

export abstract class GUID {
    public abstract getId(): string;
}

export class Product extends GUID {
    
    public id: string;
    public name: string;
    public price: number;
    public currency: Currency;
    public description?: string;

    constructor(id: string, name: string, price: number, currency: Currency, description?: string) {
        super();
        this.id = id;
        this.name = name;
        this.price = price;
         this.currency = currency;
        this.description = description;
    }

    public getId(): string {
        return this.id;
    }
}
