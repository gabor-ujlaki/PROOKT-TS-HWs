import { Product } from '../classes/Product';

export enum Status {
    new = 'new',
    ongoing = 'ongoing',
    delivered = 'delivered',
    cancelled = 'cancelled'
}

export interface IOrderItem {
    product: Product;
    qty: number;
}

export interface IOrder {
    readonly id: string;
    readonly customer: string;
    status: Status;

    addItem(product: Product, qty: number): void;
    removeItem(productId: string): void;
    printOrders(): void;
}
