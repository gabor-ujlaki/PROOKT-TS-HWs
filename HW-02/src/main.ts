import { Currency, UoM } from './interfaces/IBaseProduct'
import { Product } from './classes/Product';
import { Inventory } from './classes/Inventory';

/* TESZT */
const prod1= new Product('PROD001', 'TV', 150000, Currency.HUF, UoM.DB);
const prod2 = new Product('PROD002', 'Video', 50000, Currency.HUF, UoM.DB);
const prod3 = new Product('PROD003', 'Mikró', 135.49, Currency.EUR, UoM.DB);
console.log(`product id: ${prod1.id}`);
console.log(`produst price: ${prod1.price}`);
console.log('product details:', prod1.getProductDetails());
prod1.price = 200000;
prod1.description = 'színes televízió';
console.log('product details:', prod1.getProductDetails());
prod1.printProduct();

const wh1 = new Inventory('WH001', 'Raktár 01');
wh1.assignItem(prod1);
wh1.assignItem(prod1);
wh1.assignItem(prod2);
wh1.assignItem(prod3);
wh1.printStock();

wh1.addItemQty(prod1, 2);
wh1.addItemQty(prod2, 3);
wh1.addItemQty(prod3, 6);
wh1.printStock();

wh1.substItemQty(prod3, 2);
wh1.printStock();

wh1.substItemQty(prod3, 4);
wh1.substItemQty(prod3, 1);

wh1.searchStockItem('PROD001');
wh1.searchStockItem('i');

wh1.removeItem('PROD003');
wh1.printStock();