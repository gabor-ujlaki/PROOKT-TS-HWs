import { Currency } from '../interfaces/IBaseProduct';
import { Product } from './Product';
import { IInventory, IInventoryItem } from '../interfaces/IBaseInventory';

export class Inventory implements IInventory {
    private _id: string;
    private name: string;
    private items: IInventoryItem[];

    constructor(id: string, name: string) {
        this._id = id;
        this.name = name;
        this.items = [];
    }

    public get id():string {
        return this._id;
    }

    private findItemById(id: string): IInventoryItem | undefined {
        return this.items.find(item => item.product.id === id);
    }
    
    public assignItem(product: Product): void {
        const existingItem = this.findItemById(product.id);

        if (existingItem) {
            console.warn(`\nA ${product.id} termék már szerepel a készlet listában!`);
            return;
        }

        this.items.push({product: product, qty: 0});
        console.log(`\nA ${product.id} termék hozzáadva a készlet listához.`)
    }

    public addItemQty(product: Product, qty: number): void {
        const existingItem = this.findItemById(product.id);

        if (qty === 0) {
            console.warn('\nAz árubeérkezés nem lehet nulla!');
            return;
        }

        if (!existingItem) {
            console.warn(`\nA ${product.id} termék még nem szerepel a készlet istában!`);
            return;
        }
            
        existingItem.qty += qty;
        const detail = product.getProductDetails();
        console.log(`\nAz árubeérkezés megtörtént. [${product.id}: ${existingItem.qty} ${detail.uom}]`);
    }

    public substItemQty(product: Product, qty: number): void {
        const existingItem = this.findItemById(product.id);

        if (qty === 0) {
            console.warn('\nAz árubeérkezés nem lehet nulla!');
            return;
        }

        if (!existingItem) {
            console.warn(`\nA ${product.id} termék még nem szerepel a készlet istában!`);
            return;
        }

        if (existingItem.qty - qty < 0) {
            const detail = product.getProductDetails();
            console.warn(`\nAz árukiadás csak a készlet erejéig történhet meg! [${product.id} = ${existingItem.qty} ${detail.uom}]`);
            return;
        }

        existingItem.qty -= qty;
        const detail = product.getProductDetails();
        console.log(`\nAz árukiadás megtörtént. [${product.id}: ${existingItem.qty} ${detail.uom}]`);
    }

    public removeItem(productId: string): void {
        const existingItem = this.findItemById(productId);

        if (!existingItem) {
            console.warn(`\nA ${productId} termék nem szerepel a készlet listában!`);
            return;
        }

        const detail = existingItem.product.getProductDetails();
        if (existingItem.qty > 0) {
            console.warn(`\nA ${productId} terméknek nem nulla a készlete! [${existingItem.qty} ${detail.uom}]`);
            return;
        }

        this.items = this.items.filter(item => item.product.id !== productId);
        console.log(`\nA ${productId} termék törlése megtörtént.`);
    }

    public searchStockItem(searchKey: string): void {
        const existingItem = this.findItemById(searchKey);
        
        if (existingItem) {
            this.printStockItem(existingItem);
            return;
        }

        const existingItems = this.items.filter(item => new RegExp(searchKey, 'i').test(item.product.name));

        if(existingItems.length === 0) {
            console.warn('\nNincs a keresési feltételnek megfelelő tétel!');
            return;
        }

        for (const item of existingItems) {
            this.printStockItem(item);
        }
    }

    private printStockItem(inventoryItem: IInventoryItem): void {
        const detail = inventoryItem.product.getProductDetails();
        console.log(`ID: ${detail.id} | Név: ${detail.name} | Egys.Ár: ${detail.price.toLocaleString('hu-HU')} ${detail.currency} | Készlet: ${inventoryItem.qty.toLocaleString('hu-HU')} ${detail.uom} | Össz.Ért.: ${(inventoryItem.qty * detail.price).toLocaleString('hu-HU')} ${detail.currency}`);
    
    }
    public printStock(): void {
        const title = `${this._id} ${this.name}`;
        const line = 60;
        const indent = (line - title.length - 2) / 2;

        console.log(`\n${'='.repeat(line)}`);
        console.log(`${'*'.repeat(indent)} ${title} ${'*'.repeat(indent)}`);
        console.log(`${'='.repeat(line)}`);

        if (this.items.length === 0) {
            console.log(`A raktár üres.`);
            return;
        }

        for (const item of this.items) {
            this.printStockItem(item);
        }

        console.log(`${'-'.repeat(line)}`);

        console.log('Total:');
        for (const curr of Object.values(Currency)) {
            if (this.items.find(item => item.product.currency === curr)) {
                const val = this.items.filter(item => item.product.currency === curr).map(item => item.qty * item.product.price).reduce((acc, val) => acc + val, 0);
                console.log(`(${curr}): ${val.toLocaleString('hu-HU')} ${curr}`);
            }
        }
        console.log(`${'='.repeat(line)}`);
   }
}