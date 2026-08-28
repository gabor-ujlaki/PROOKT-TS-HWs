import { Product } from "./Product";

export class InventoryItem {
    public product: Product;
    public quantity: number;

    constructor(product: Product, quantity: number = 0) {
        this.product = product;
        this.quantity = quantity;
    }
}

export class Inventory {
    
    private items: InventoryItem[];

    constructor() {
        this.items = [];
    }

    public registerProduct(product: Product): void {
        if (this.findItemById(product.id) === null) {
            this.items.push(new InventoryItem(product, 0));
            console.log(`[Inventory] Új ${product.id} ${product.name} termék létrehozva.`);
        }
    }

    public increaseStock(productId: string, amount: number): void {
        const item = this.findItemById(productId);
        if (item !== null) {
            item.quantity += amount;
            console.log(`[Inventory] ${productId} ${item.product.name} árubeérkezés +${amount} DB.\nÚj készlet: ${item.quantity} DB`);
        } else {
            console.error(`[Inventory] Ismeretlen termék ID: ${productId}`);
        }
    }

    public decreaseStock(productId: string, amount: number): void {
        const item = this.findItemById(productId);
        if (item !== null) {
            if (item.quantity - amount < 0) {
                console.warn(`[Inventory] Nincs elég készlet: ${productId} ${item.product.name}.\nAktuális készlet: ${item.quantity} DB.`);
                item.quantity = 0;
            } else {
                item.quantity -= amount;
                console.log(`[Inventory] ${productId} ${item.product.name} árukiadás -${amount} DB.\nÚj készlet: ${item.quantity} DB`);
            }
        } else {
            console.error(`[Inventory] Ismeretlen termék ID: ${productId}`);
        }
    }

    public findProduct(searchKey: string): Product | null {
        for (const item of this.items) {
            if (item.product.id === searchKey || item.product.name === searchKey) {
                if (item.quantity > 0) {
                    return item.product;
                }
            }
        }
        return null;
    }

    private findItemById(id: string): InventoryItem | null {
        for (const item of this.items) {
            if (item.product.id === id) {
                return item;
            }
        }
        return null;
    }

    public listAllProducts(): void {
        console.log(`\n${'-'.repeat(30)} Raktárkészlet ${'-'.repeat(30)}`)
        for (const item of this.items) {
            console.log(`ID: ${item.product.id} | Név: ${item.product.name} | Ár: ${item.product.price} ${item.product.currency} | Készlet: ${item.quantity} DB`);
        }
        console.log(`\n${'-'.repeat(75)}`);
    }
}

