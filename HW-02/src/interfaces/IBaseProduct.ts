export enum Currency {
    HUF = "HUF",
    EUR = "EUR",
    USD = "USD"
}
export enum UoM {
    DB = "DB",
    KG = "KG"
}

export interface IProduct {
    readonly id: string;
    price: number;
}