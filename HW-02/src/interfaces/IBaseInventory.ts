import { Product } from '../classes/Product';

export interface IInventoryItem {
    product: Product;
    qty: number;
}

export interface IInventory {
    readonly id: string;
    assignItem(inventoryItem: IInventoryItem): void;
    addItemQty(product: Product, qty: number): void;
    substItemQty(product: Product, qty: number): void;
    removeItem(productId: string): void;
    printStock(): void;
}