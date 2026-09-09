import { Library } from './models/Library';
import { Category } from './models/Category';
import { Book } from './models/Book';
import { Borrower } from './models/Borrower';
import { LoanManager } from './services/LoanManager';
import { BookStatus } from './models/interfaces/IBaseLibrary';

/* TESZT */
const lib = Library.createLib('LIB-001', 'Belvárosi Könyvtár');

const fictionCat = Category.createFiction('Fantasy', 'Középkor');
const scienceCat = Category.createScience('Fizika');

const book1 = Book.createBook('B-001', 'A Gyűrűk Ura', 'J.R.R. Tolkien', fictionCat);
const book2 = Book.createBook('B-002', 'Idő rövid története', 'Stephen Hawking', scienceCat);

lib.addBook(book1);
lib.addBook(book2);

const user1 = Borrower.createUser('U-001', 'Teszt Elek', 'elek.teszt@example.com');
const user2 = Borrower.createUser('U-002', 'Gipsz Jakab', 'jakab.gipsz@example.com');

const loanManager = new LoanManager<Book>(lib);

lib.listBooks();

loanManager.borrowBook('B-001', 'U-001');
user1.listBorrowedBooks();
loanManager.listLoans();

loanManager.returnBook('B-001', 'U-001');
user1.listBorrowedBooks();
loanManager.listLoans();

lib.setBookStatus('B-002', BookStatus.DISCARDED);
lib.removeBook('B-002');

lib.listBooks();

Library.destroyLib(lib);