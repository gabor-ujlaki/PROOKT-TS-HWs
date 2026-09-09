/**
 * Könyvtári rendszer – Jest tesztek
 * A main.ts-ben végrehajtott műveletek unit test változata
 */

import { Library } from '../models/Library';
import { Book } from '../models/Book';
import { Borrower } from '../models/Borrower';
import { Category } from '../models/Category';
import { LoanManager } from '../services/LoanManager';
import { BookStatus } from '../models/interfaces/IBaseLibrary';

// A dekorátorok mockolása (ne írjanak konzolra)
jest.mock('../utils/decorators', () => ({
    LogAction: () => (target: any, key: string, descriptor: PropertyDescriptor) => descriptor
}));

describe('Library Management System – main.ts folyamat tesztelése', () => {

    let lib: Library;
    let fictionCat: Category;
    let scienceCat: Category;
    let book1: Book;
    let book2: Book;
    let user1: Borrower;
    let user2: Borrower;
    let loanManager: LoanManager<Book>;

    beforeAll(() => {
        // Könyvtár létrehozása
        lib = Library.createLib('LIB-001', 'Belvárosi Könyvtár');

        // Kategóriák
        fictionCat = Category.createFiction('Fantasy', 'Középkor');
        scienceCat = Category.createScience('Fizika');

        // Könyvek
        book1 = Book.createBook('B-001', 'A Gyűrűk Ura', 'J.R.R. Tolkien', fictionCat);
        book2 = Book.createBook('B-002', 'Idő rövid története', 'Stephen Hawking', scienceCat);

        // Könyvek felvétele a könyvtárba
        lib.addBook(book1);
        lib.addBook(book2);

        // Kölcsönzők
        user1 = Borrower.createUser('U-001', 'Teszt Elek', 'elek.teszt@example.com');
        user2 = Borrower.createUser('U-002', 'Gipsz Jakab', 'jakab.gipsz@example.com');

        lib.registerBorrower(user1);
        lib.registerBorrower(user2);

        // LoanManager
        loanManager = new LoanManager<Book>(lib);
    });

    // ---------------------------------------------------------
    // 1. Könyvtár és könyvek létrehozása
    // ---------------------------------------------------------
    test('A könyvtár helyesen jön létre', () => {
        expect(lib.id).toBe('LIB-001');
        expect(lib.name).toBe('Belvárosi Könyvtár');
        expect(lib.books.size).toBe(2);
    });

    test('A könyvek helyesen kerülnek felvételre', () => {
        expect(lib.books.has('B-001')).toBe(true);
        expect(lib.books.has('B-002')).toBe(true);

        expect(book1.status).toBe(BookStatus.AVAILABLE);
        expect(book2.status).toBe(BookStatus.AVAILABLE);
    });

    // ---------------------------------------------------------
    // 2. Könyv kikölcsönzése
    // ---------------------------------------------------------
    test('A könyv kikölcsönözhető', () => {
        loanManager.borrowBook('B-001', 'U-001');

        expect(book1.status).toBe(BookStatus.BORROWED);
        expect(user1['borrowedBooks'].has(book1)).toBe(true);

        const activeLoan = [...(loanManager as any).loans.values()].find(
            (l: any) => l.book.id === 'B-001' && l.borrower.id === 'U-001'
        );

        expect(activeLoan).toBeDefined();
        expect(activeLoan.status).toBe(BookStatus.BORROWED);
    });

    // ---------------------------------------------------------
    // 3. Könyv visszahozása
    // ---------------------------------------------------------
    test('A könyv visszahozható', () => {
        loanManager.returnBook('B-001', 'U-001');

        expect(book1.status).toBe(BookStatus.AVAILABLE);
        expect(user1['borrowedBooks'].size).toBe(0);

        const loan = [...(loanManager as any).loans.values()].find(
            (l: any) => l.book.id === 'B-001'
        );

        expect(loan.returnDate).toBeInstanceOf(Date);
        expect(loan.status).toBe(BookStatus.AVAILABLE);
    });

    // ---------------------------------------------------------
    // 4. Könyv státusz discarded → eltávolítás
    // ---------------------------------------------------------
    test('A könyv státusza discarded-re állítható', () => {
        lib.setBookStatus('B-002', BookStatus.DISCARDED);
        expect(book2.status).toBe(BookStatus.DISCARDED);
    });

    test('A discarded státuszú könyv eltávolítható', () => {
        lib.removeBook('B-002');
        expect(lib.books.has('B-002')).toBe(false);
    });

    // ---------------------------------------------------------
    // 5. Könyvtár törlése (ha nincs könyv)
    // ---------------------------------------------------------
    test('A könyvtár törölhető, ha nincs benne könyv', () => {
        // Először távolítsuk el a maradék könyvet is
        lib.setBookStatus('B-001', BookStatus.DISCARDED);
        lib.removeBook('B-001');

        expect(lib.books.size).toBe(0);

        // Könyvtár törlése
        Library.destroyLib(lib);

        // A registry-ből törlődik
        const registry = (Library as any).registry as Set<Library>;
        expect(registry.has(lib)).toBe(false);
    });
});
