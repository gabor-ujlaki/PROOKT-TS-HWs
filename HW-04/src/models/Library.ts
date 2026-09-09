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
        //kidolgozni
    }

    @LogAction('Könyv hozzáadva a könyvtárhoz')
    public addBook(book: Book): void {
        //kidolgozni
    }

    @LogAction('Könyv eltávolítása a könyvtárból')
    public removeBook(bookId: string): void {
        //kidolgozni
    }

    public listBooks(): void {
        //kidolgozni
    }
    
}