import { Currency, UoM } from './interfaces/IBaseProduct'
import { Product } from './classes/Product';

/* TESZT */
const prod1= new Product('PROD001', 'TV', 150000, Currency.HUF, UoM.DB);
const prod2 = new Product('PROD002', 'Video', 50000, Currency.HUF, UoM.DB);
console.log(`product id: ${prod1.id}`);
console.log(`produst price: ${prod1.price}`);
console.log('product details:', prod1.getProductDetails());
prod1.price = 200000;
prod1.description = 'színes televízió';
console.log('product details:', prod1.getProductDetails());
prod1.printProduct();
