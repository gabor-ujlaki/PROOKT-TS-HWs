import { Product } from "./Product";
import { Order } from "./Order";
import { Inventory } from "./Inventory";

export class User {
    public userId: string;
    public name: string;
    public email: string;

    constructor(userId: string, name: string, email: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public placeOrder(orderId: string, cart: { productId: string, qty: number }[], inventory: Inventory): Order | null {
        console.log(`\n[User] ${this.userId} ${this.name} felhasználó rendelése folamatban...`);
        
        for (const item of cart) {
            const product = inventory.findProduct(item.productId);
            
            if (product === null) {
                console.error(`\n[User] Ismeretlen termék ID: ${item.productId}`);
                return null;
            }

            if (!inventory.hasEnoughStock(item.productId, item.qty)) {
                const available = inventory.getAvailableQuantity(item.productId);
                console.warn(`\n[User] A rendelés nem teljesíthető!\n\tID: ${product.id} ${product.name} | Rendelt mennyiség: ${item.qty} DB | Készleten: ${available} DB.\n\tIndítson új rendelést legfeljebb a készlet erejéig!`);
                return null;
            }
        }

        const selectedProducts: Product[] = [];
        for (const item of cart) {
            const product = inventory.findProduct(item.productId)!;
            
            for (let i = 0; i < item.qty; i++) {
                selectedProducts.push(product);
            }
            
            inventory.decreaseStock(item.productId, item.qty);
        }

        const newOrder = new Order(orderId, selectedProducts);
        console.log(`\n[User] A rendelés (${orderId}) sikeresen létrehozva!`);
        return newOrder;
    }
}
