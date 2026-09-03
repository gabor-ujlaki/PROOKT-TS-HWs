import { Currency, UoM } from './interfaces/IBaseProduct'
import { Product } from './classes/Product';
import { Inventory } from './classes/Inventory';
import { User } from './classes/User';
import { Status } from './interfaces/IBaseOrder';

/* TESZT */
// TERMÉKEK
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

// RAKTÁR
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

// Felhasználók
const user1 = new User('USR001', 'Gipsz Jakab', 'jakab.gipsz@example.com', wh1);
const user2 = new User('USR002', 'Teszt Elek', 'elek.teszt@example.com', wh1);

// Rendelés
const order1_u1 = user1.createOrder();
order1_u1.addItem(prod1, 2);
order1_u1.addItem(prod2, 2);
order1_u1.printOrders(); //status = new
user1.commitOrder(order1_u1);
order1_u1.printOrders(); //status = ongoing
order1_u1.status = Status.delivered;
order1_u1.printOrders(); //status = delivered

const order1_u2 = user2.createOrder();
order1_u2.addItem(prod3, 1);
user2.commitOrder(order1_u2);

const order2_u2 = user2.createOrder();
order2_u2.addItem(prod2, 2);
user2.commitOrder(order2_u2);

order1_u2.printOrders();
order2_u2.printOrders();

user1.myOrders();
user2.myOrders();