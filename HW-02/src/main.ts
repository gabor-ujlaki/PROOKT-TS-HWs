import { Product, Currency } from "./classes/Product";
import { Inventory } from "./classes/Inventory";
import { User } from "./classes/User";
import { Order } from "./classes/Order";

/* TESZT */
const wh = new Inventory();

const prod1 = new Product('PROD01', 'TV', 250000, Currency.HUF);
wh.registerProduct(prod1);
wh.increaseStock('PROD01', 1);
const prod2 = new Product('PROD02', 'Video', 50000, Currency.HUF);
wh.registerProduct(prod2);
wh.increaseStock('PROD02', 2);
const prod3 = new Product('PROD03', 'Mosógép', 329.99, Currency.EUR);
wh.registerProduct(prod3);
wh.increaseStock('PROD03', 3);
const prod4 = new Product('PROD04', 'Hűtőszekrény', 611.99, Currency.USD);
wh.registerProduct(prod4);
wh.increaseStock('PROD04', 4);

wh.listAllProducts();

wh.increaseStock('PROD01', 1);
console.log(wh.getAvailableQuantity('PROD01'));
wh.decreaseStock('PROD03', 1);
wh.getAvailableQuantity('PROD02');

wh.listAllProducts();
