import { IUser } from '../interfaces/IBaseUser';
import { Status } from '../interfaces/IBaseOrder';
import { Order } from './Order';
import { Inventory } from './Inventory';

export class User implements IUser {
    private _id: string;
    private _name: string;
    private _email: string;
    private inventory: Inventory;
    private orders: Order[] = [];

    constructor(id: string, name: string, email: string, inventory: Inventory) {
        this._id = id;
        this._name = name;
        this._email = email;
        this.inventory = inventory;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public createOrder(): Order {
        const order = new Order(this._id, this.inventory);
        this.orders.push(order);
        return order;
    }

    public commitOrder(order: Order): void {
        if (order.status !== Status.new) {
            console.warn('\nA rendelés már véglegesítve van!');
            return;
        }

        order.status = Status.ongoing;
        console.log('\nA rendelés véglegesítve.');
    }

    public myOrders(): void {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`${this._id} (${this._name}) rendelései:`);

        if (this.orders.length === 0) {
            console.log('Nincs még rendelés.');
            return;
        }

        for (const order of this.orders) {
            const labelWidth = 20;
            console.log(`${'-'.repeat(60)}`);
            console.log(`*** ${'Rendelés ID:'.padEnd(labelWidth)}${order.id}`);
            console.log(`*** ${'Státusz:'.padEnd(labelWidth)}${order.status}`);
            console.log('Tételek:');
            console.log(`${'-'.repeat(60)}`);

            if ((order as any).items.length === 0) {
                console.log('  (üres rendelés)');
            } else {
                for (const item of (order as any).items) {
                    const detail = item.product.getProductDetails();
                    console.log(
                        `${detail.name} (${detail.id}) | ${item.qty.toLocaleString('hu-HU')} ${detail.uom} | ${detail.price.toLocaleString('hu-HU')} ${detail.currency} | Összeg: ${(item.qty * detail.price).toLocaleString('hu-HU')} ${detail.currency}`
                    );
                }
            }
        }

        console.log(`${'='.repeat(60)}`);
    }
}