import { Library } from './models/Library';
import { Category } from './models/Category';
import { Book } from './models/Book';

/* TESZT */
const lib = Library.createLib('LIB-001', 'Belvárosi Könyvtár');

const fictionCat = Category.createFiction('Fantasy', 'Középkor');
const scienceCat = Category.createScience('Fizika');

const book1 = Book.createBook('B-001', 'A Gyűrűk Ura', 'J.R.R. Tolkien', fictionCat);
const book2 = Book.createBook('B-002', 'Idő rövid története', 'Stephen Hawking', scienceCat);

