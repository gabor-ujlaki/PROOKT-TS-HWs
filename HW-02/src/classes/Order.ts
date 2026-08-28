import { Product, Currency } from "./Product";

export enum OrderStatus {
    new = "Új",
    beingProcessed = "Feldolgozás alatt",
    delivered = "Kiszállítva"
}

export class Order {
    public orderId: string;
    public products: Product[];
    private status: OrderStatus;

    constructor(orderId: string, products: Product[]) {
        this.orderId = orderId;
        this.products = products;
        this.status = OrderStatus.new;
    }

    public updateStatus(newStatus: OrderStatus): void {
        this.status = newStatus;
        console.log(`[Order - ${this.orderId}] Állapot aktualizálva: ${this.status}`);
    }

    public getStatus(): OrderStatus {
        return this.status;
    }

    public getTotalPriceByCurrency(targetCurrency: Currency): number {
        let total = 0;
        for (const product of this.products) {
            if (product.currency === targetCurrency) {
                total += product.price;
            }
        }
        return total;
    }

    public printSummary(): void {
        console.log(`\n${'='.repeat(20)} RENDELÉS (${this.orderId}) ÖSSZESÍTÉSE ${'='.repeat(20)}\n`);
        console.log(`Rendelés állapota: ${this.status}\nRendelt termék(ek):\n`);
        for (const product of this.products) {
            console.log(` - ${product.name}: ${product.price} ${product.currency}`);
        }
        
        console.log("\nÖsszesen (pénznemenként):\n");
        const hufTotal = this.getTotalPriceByCurrency(Currency.HUF);
        const eurTotal = this.getTotalPriceByCurrency(Currency.EUR);
        const usdTotal = this.getTotalPriceByCurrency(Currency.USD);

        if (hufTotal > 0) console.log(`\t${hufTotal} ${Currency.HUF}\n`);
        if (eurTotal > 0) console.log(`\t${eurTotal} ${Currency.EUR}\n`);
        if (usdTotal > 0) console.log(`\t${usdTotal} ${Currency.USD}\n`);
        console.log('='.repeat(75));
    }
}
