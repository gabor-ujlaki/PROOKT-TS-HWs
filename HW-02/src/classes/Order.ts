import { Status, IOrder, IOrderItem } from '../interfaces/IBaseOrder';
import { Product } from '../classes/Product';
import { Inventory } from '../classes/Inventory';

export class Order implements IOrder {
    private _id: string;
    private _customer: string;
    private _status: Status;
    private items: IOrderItem[];
    private inventory: Inventory;

    constructor(customerId: string, inventory: Inventory) {
        const now = new Date();
        const date = now.toISOString().slice(0,10).replace(/-/g, '');
        const time = now.toTimeString().slice(0,8).replace(/:/g, '');

        this._id = `${customerId}-${date}-${time}`;
        this._customer = customerId;
        this._status = Status.new;
        this.items = [];
        this.inventory = inventory;
    }

    public get id(): string {
        return this._id;
    }

    public get customer(): string {
        return this._customer;
    }

    public get status(): Status {
        return this._status;
    }

    public set status(newStatus: Status) {
        this._status = newStatus;
    }

    private findItemById(id: string): IOrderItem | undefined {
        return this.items.find(item => item.product.id === id);
    }

    public addItem(product: Product, qty: number): void {
        if (this._status !== Status.new) {
            console.warn('\nA rendelés már nem módosítható!');
            return;
        }

        const stockItem = this.inventory['findItemById'](product.id);
        if (!stockItem || stockItem.qty < qty) {
            console.warn(`\nA készlet nem fedezi a kért mennyiséget! [${product.id}]`);
            return;
        }

        const existingItem = this.findItemById(product.id);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            this.items.push({ product, qty });
        }

        console.log(`\nA tétel hozzáadva a rendeléshez. [${product.id}: ${qty}]`);
    }

    public removeItem(productId: string): void {
        if (this._status !== Status.new) {
            console.warn('\nA rendelés már nem módosítható!');
            return;
        }

        const existingItem = this.findItemById(productId);
        if (!existingItem) {
            console.warn(`\nA ${productId} termék nem szerepel a rendelésen!`);
            return;
        }

        this.items = this.items.filter(item => item.product.id !== productId);
        console.log(`\nA ${productId} termék eltávolítva a rendelésből.`);
    }

    public printOrders(): void {
        const labelWidth = 20;
        console.log(`\n${'='.repeat(60)}`);
        console.log(`*** ${'Rendelés ID:'.padEnd(labelWidth)}${this._id}`);
        console.log(`*** ${'Vevő:'.padEnd(labelWidth)}${this._customer}`);
        console.log(`*** ${'Státusz:'.padEnd(labelWidth)}${this._status}`);
        console.log(`${'='.repeat(60)}`);

        if (this.items.length === 0) {
            console.log('A rendelés üres.');
            return;
        }

        for (const item of this.items) {
            const detail = item.product.getProductDetails();
            console.log(
                `ID: ${detail.id} | Név: ${detail.name} | Menny.: ${item.qty.toLocaleString('hu-HU')} ${detail.uom} | Egys.ár: ${detail.price.toLocaleString('hu-HU')} ${detail.currency} | Összeg: ${(item.qty * detail.price).toLocaleString('hu-HU')} ${detail.currency}`
            );
        }

        console.log(`\n${'='.repeat(60)}`);
    }
}