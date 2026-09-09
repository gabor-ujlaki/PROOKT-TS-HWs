import { IBaseLibrary, BookStatus } from './interfaces/IBaseLibrary';
import { Book } from './Book';
import { Borrower } from './Borrower';
import { LogAction } from '../utils/decorators';

export class Library implements IBaseLibrary {
    private _id: string;
    private _name: string;
    public books: Map<string, Book> = new Map();
    public borrowers: Map<string, Borrower> = new Map();

    private static registry: Set<Library> = new Set();

    private constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        Library.registry.add(this);
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(newName: string) {
        this._name = newName;
    }

    @LogAction('Könyvtár létrehozva')
    public static createLib(id: string, name: string): Library {
        return new Library(id, name);
    }

    @LogAction('Könyvtár törlése')
    public static destroyLib(lib: Library): void {
        if (lib.books.size > 0) {
            console.warn('A könyvtár nem törölhető, amíg vannak hozzá tartozó könyvek!');
            return;
        }

        if (Library.registry.has(lib)) {
            Library.registry.delete(lib);
            console.log(`A ${lib.id} könyvtár törölve a regisztrációból.`);
        }
    }

    @LogAction('Könyv hozzáadva a könyvtárhoz')
    public addBook(book: Book): void {
        if (this.books.has(book.id)) {
            console.warn(`A ${book.id} könyv már szerepel a könyvtárban!`);
            return;
        }
        book.status = BookStatus.AVAILABLE;
        this.books.set(book.id, book);
        console.log(`A ${book.id} könyv felvéve a könyvtárba.`);
    }

    @LogAction('Könyv eltávolítása a könyvtárból')
    public removeBook(bookId: string): void {
        const book = this.books.get(bookId);

        if (!book) {
            console.warn(`A ${bookId} könyv nem található a könyvtárban!`);
            return;
        }

        if (book.status !== BookStatus.DISCARDED) {
            console.warn(`A könyv csak akkor távolítható el, ha a státusza = discarded! Jelenlegi státusz: ${book.status}`);
            return;
        }

        this.books.delete(bookId);
        console.log(`A ${bookId} könyv eltávolítva a könyvtárból.`);
    }

    public listBooks(): void {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`*** Könyvtár: ${this._id} (${this._name}) ***`);
        console.log(`${'='.repeat(60)}`);

        if (this.books.size === 0) {
            console.log('A könyvtár üres.');
            return;
        }

        for (const book of this.books.values()) {
            book.print();
        }
    }

    public findBookByTerm(term: string): Book[] {
        const regex = new RegExp(term.toLowerCase(), 'i');
        return [...this.books.values()].filter(
            book =>
                regex.test(book.id) ||
                regex.test(book.title) ||
                regex.test(book.author)
        );
    }

    public setBookStatus(bookId: string, status: BookStatus): void {
        const book = this.books.get(bookId);
        if (!book) {
            console.warn(`\nA ${bookId} könyv nem található!`);
            return;
        }
        book.status = status;
        console.log(`\nA ${bookId} könyv státusza beállítva: ${status}.`);
    }
    
    public registerBorrower(borrower: Borrower): void {
        if (this.borrowers.has(borrower.id)) {
            console.warn('\nA kölcsönző már regisztrálva van ebben a könyvtárban!');
            return;
        }
        this.borrowers.set(borrower.id, borrower);
    }
}