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
    
    public assignItem(inventoryItem: IInventoryItem): void {
        const existingItem = this.findItemById(inventoryItem.product.id);

        if (existingItem) {
            console.warn(`\nA ${inventoryItem.product.id} termék már szerepel a készlet listában!`);
            return;
        }

        this.items.push(inventoryItem);
        console.log(`\nA ${inventoryItem.product.id} termék hozzáadva a készlet listához.`)
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

    public printStock(): void {
        console.log(`\n${'-'.repeat(60)}`);
        console.log(`\n${'-'.repeat(20)} ${this._id} ${this.name} ${'-'.repeat(20)}`);
        console.log(`\n${'-'.repeat(60)}`);

        if (this.items.length === 0) {
            console.log(`A raktár üres.`);
            return;
        }

        for (const item of this.items) {
            const detail = item.product.getProductDetails();
            console.log(`ID: ${item.product.id}} | Név: ${detail.name}} | Egys.Ár: ${item.product.price} ${detail.currency} | Készlet: ${item.qty} ${detail.uom} | Össz.Ért.: ${item.qty * item.product.price} ${detail.currency}`);
        }
        console.log(`\n${'-'.repeat(60)}`);
   }
}